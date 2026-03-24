#!/usr/bin/env node
/**
 * generate-images.mjs
 * Genera imágenes para todos los artículos de hogar-diy-es usando Gemini Imagen 3.
 *
 * USO: node scripts/generate-images.mjs
 * Requiere: GEMINI_API_KEY en el entorno
 *
 * Genera 3 tipos de imágenes por artículo:
 *   - cover.jpg       → portada del artículo (16:9)
 *   - paso-N.jpg      → imagen por cada ## Paso (16:9)
 *   - herramienta-N.jpg → imagen por cada AffiliateCard (1:1)
 *
 * Después actualiza los MDX:
 *   - Frontmatter image → ruta local
 *   - Inserta img tras cada ## Paso
 *   - Añade prop image a cada <AffiliateCard>
 */

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const CONTENT_DIR = join(PROJECT_ROOT, "content");
const PUBLIC_IMAGES = join(PROJECT_ROOT, "public", "images");
const DELAY_MS = 8000; // entre llamadas a la API (rate limit conservador)

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY no está definida en el entorno");
  process.exit(1);
}

// ─── Parsers ───────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const val = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    fm[key] = val;
  }
  return fm;
}

function extractSteps(content) {
  // Extrae headings ## Paso N: ...
  const steps = [];
  for (const match of content.matchAll(/^## (Paso \d+[^\n]*)/gm)) {
    steps.push(match[1].trim());
  }
  return steps;
}

function extractAffiliateCards(content) {
  // Extrae {index, name, fullMatch} de cada <AffiliateCard>
  const cards = [];
  let idx = 0;
  for (const match of content.matchAll(/<AffiliateCard[\s\S]*?\/>/gm)) {
    const nameMatch = match[0].match(/name="([^"]+)"/);
    if (nameMatch) {
      cards.push({
        idx: ++idx,
        name: nameMatch[1],
        fullMatch: match[0],
        offset: match.index,
      });
    }
  }
  return cards;
}

// ─── Prompts ───────────────────────────────────────────────────────────────

const PHOTO_STYLE =
  "professional DIY home improvement photography, realistic, natural lighting, clean composition, Spanish home, no text, no watermarks, no people faces";

const CATEGORY_CONTEXT = {
  reparaciones: "home repair DIY photography",
  herramientas: "DIY tools workshop photography",
  reformas: "home renovation DIY photography",
  jardin: "outdoor garden DIY photography",
  "ahorro-energetico": "home energy efficiency improvement photography",
};

function coverPrompt(title, category) {
  const ctx = CATEGORY_CONTEXT[category] ?? "home DIY photography";
  // Limpiamos el título para el prompt
  const subject = title
    .replace(/^(Cómo|Guía para|Tutorial:|Los mejores|Las mejores)\s+/i, "")
    .replace(/\s+en\s+\d{4}$/i, "")
    .toLowerCase();
  return `${ctx}: ${subject}, ${PHOTO_STYLE}, 16:9 wide shot`;
}

function stepPrompt(stepHeading, articleTitle) {
  const action = stepHeading.replace(/^Paso \d+[:\s-]*/i, "").toLowerCase();
  return `Close-up DIY instructional photography: person performing "${action}" while ${articleTitle.toLowerCase()}, hands and tools clearly visible, bright workshop or home setting, ${PHOTO_STYLE}`;
}

function toolPrompt(toolName) {
  return `Professional product photography: ${toolName}, isolated on clean white background, sharp focus, studio lighting, e-commerce style, high detail, ${PHOTO_STYLE}, 1:1 square format`;
}

// ─── Gemini Imagen 3 API ───────────────────────────────────────────────────

async function generateImage(prompt, aspectRatio = "16:9", retries = 3) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${API_KEY}`;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.error?.message ?? JSON.stringify(data);
        throw new Error(`API ${res.status}: ${msg.slice(0, 120)}`);
      }
      const b64 = data.predictions?.[0]?.bytesBase64Encoded;
      if (!b64) throw new Error("No image data in response");
      return b64;
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`    ⚠️  Intento ${attempt} fallido, reintentando en 10s...`);
      await sleep(10000);
    }
  }
}

function saveImage(b64, filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, Buffer.from(b64, "base64"));
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── MDX Updaters ──────────────────────────────────────────────────────────

function updateCoverInFrontmatter(content, localPath) {
  // Reemplaza la URL de imagen en frontmatter (Unsplash u otra) con ruta local
  return content.replace(
    /^(image:\s*)["']?https?:\/\/[^\n"']+["']?/m,
    `$1"${localPath}"`,
  );
}

function insertStepImages(content, steps, category, slug) {
  let updated = content;
  // Procesar en reversa para que los offsets no se desplacen
  for (let i = steps.length - 1; i >= 0; i--) {
    const stepNum = i + 1;
    const imgPath = `/images/${category}/${slug}/paso-${stepNum}.jpg`;
    const imgMdx = `\n\n![${steps[i]}](${imgPath})\n`;
    const escapedHeading = steps[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Inserta la imagen justo después del heading, antes del siguiente párrafo
    updated = updated.replace(
      new RegExp(`(^## ${escapedHeading}\\n)`, "m"),
      `$1${imgMdx}`,
    );
  }
  return updated;
}

function insertToolImages(content, cards, category, slug) {
  let updated = content;
  // Procesar en reversa por seguridad de offsets
  for (let i = cards.length - 1; i >= 0; i--) {
    const card = cards[i];
    const imgPath = `/images/${category}/${slug}/herramienta-${card.idx}.jpg`;
    // Añade image="..." al AffiliateCard si no lo tiene ya
    if (!card.fullMatch.includes("image=")) {
      const updatedCard = card.fullMatch.replace(
        /(<AffiliateCard\s+name="[^"]+")/,
        `$1\n  image="${imgPath}"`,
      );
      updated = updated.replace(card.fullMatch, updatedCard);
    }
  }
  return updated;
}

// ─── Main ──────────────────────────────────────────────────────────────────

const COVERS_ONLY = process.env.COVERS_ONLY === "true";

async function processArticle(category, slug, filePath) {
  const content = readFileSync(filePath, "utf-8");
  const fm = parseFrontmatter(content);
  const steps = COVERS_ONLY ? [] : extractSteps(content);
  const cards = COVERS_ONLY ? [] : extractAffiliateCards(content);

  const imageDir = join(PUBLIC_IMAGES, category, slug);
  mkdirSync(imageDir, { recursive: true });

  const title = fm.title ?? slug;
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  // ── 1. Portada ──────────────────────────────────────────────────────────
  const coverPath = join(imageDir, "cover.jpg");
  if (!existsSync(coverPath)) {
    try {
      process.stdout.write(`  📸 Portada...`);
      const b64 = await generateImage(coverPrompt(title, category), "16:9");
      saveImage(b64, coverPath);
      process.stdout.write(` ✅\n`);
      generated++;
      await sleep(DELAY_MS);
    } catch (e) {
      process.stdout.write(` ❌ ${e.message.slice(0, 80)}\n`);
      errors++;
    }
  } else {
    console.log(`  ⏭️  Portada ya existe`);
    skipped++;
  }

  // ── 2. Pasos ───────────────────────────────────────────────────────────
  for (let i = 0; i < steps.length; i++) {
    const stepPath = join(imageDir, `paso-${i + 1}.jpg`);
    if (!existsSync(stepPath)) {
      try {
        process.stdout.write(`  📸 Paso ${i + 1}: ${steps[i].slice(0, 40)}...`);
        const b64 = await generateImage(stepPrompt(steps[i], title), "16:9");
        saveImage(b64, stepPath);
        process.stdout.write(` ✅\n`);
        generated++;
        await sleep(DELAY_MS);
      } catch (e) {
        process.stdout.write(` ❌ ${e.message.slice(0, 80)}\n`);
        errors++;
      }
    } else {
      console.log(`  ⏭️  Paso ${i + 1} ya existe`);
      skipped++;
    }
  }

  // ── 3. Herramientas (máx 5 por artículo) ───────────────────────────────
  const cardsToProcess = cards.slice(0, 5);
  for (const card of cardsToProcess) {
    const toolPath = join(imageDir, `herramienta-${card.idx}.jpg`);
    if (!existsSync(toolPath)) {
      try {
        process.stdout.write(
          `  🔧 Herramienta ${card.idx}: ${card.name.slice(0, 40)}...`,
        );
        const b64 = await generateImage(toolPrompt(card.name), "1:1");
        saveImage(b64, toolPath);
        process.stdout.write(` ✅\n`);
        generated++;
        await sleep(DELAY_MS);
      } catch (e) {
        process.stdout.write(` ❌ ${e.message.slice(0, 80)}\n`);
        errors++;
      }
    } else {
      console.log(`  ⏭️  Herramienta ${card.idx} ya existe`);
      skipped++;
    }
  }

  // ── 4. Actualizar MDX ──────────────────────────────────────────────────
  let updated = content;
  const coverLocal = `/images/${category}/${slug}/cover.jpg`;

  // Solo actualizar si el cover se generó correctamente
  if (existsSync(coverPath)) {
    updated = updateCoverInFrontmatter(updated, coverLocal);
  }

  // Insertar imágenes de pasos (solo los que se generaron)
  const existingSteps = steps.filter((_, i) =>
    existsSync(join(imageDir, `paso-${i + 1}.jpg`)),
  );
  if (existingSteps.length > 0) {
    updated = insertStepImages(updated, steps, category, slug);
  }

  // Insertar imágenes de herramientas
  const existingCards = cardsToProcess.filter((c) =>
    existsSync(join(imageDir, `herramienta-${c.idx}.jpg`)),
  );
  if (existingCards.length > 0) {
    updated = insertToolImages(updated, cardsToProcess, category, slug);
  }

  if (updated !== content) {
    writeFileSync(filePath, updated, "utf-8");
    console.log(`  💾 MDX actualizado`);
  }

  return { generated, skipped, errors };
}

async function main() {
  const categoryFilter = process.env.CATEGORY ?? null;
  console.log("🏠 HogarDIY.es — Generador de Imágenes con Gemini Imagen 3\n");
  if (categoryFilter)
    console.log(`   Filtrando por categoría: ${categoryFilter}`);
  if (COVERS_ONLY) console.log(`   Modo: solo portadas\n`);

  const allCategories = readdirSync(CONTENT_DIR).filter(
    (c) => !c.startsWith("."),
  );
  const categories = categoryFilter
    ? allCategories.filter((c) => c === categoryFilter)
    : allCategories;

  let totalGenerated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const category of categories) {
    const catDir = join(CONTENT_DIR, category);
    const files = readdirSync(catDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(".mdx", "");
      console.log(`\n📄 ${category}/${slug}`);
      const result = await processArticle(category, slug, join(catDir, file));
      totalGenerated += result.generated;
      totalSkipped += result.skipped;
      totalErrors += result.errors;
    }
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Generadas:  ${totalGenerated} imágenes`);
  console.log(`⏭️  Omitidas:   ${totalSkipped} (ya existían)`);
  console.log(`❌ Errores:    ${totalErrors}`);
  console.log(`📁 Guardadas en: public/images/`);
  console.log("─".repeat(50));
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
