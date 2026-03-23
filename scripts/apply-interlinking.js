const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(process.cwd(), "content");

// 1. Obtener todos los artículos
function getAllArticles() {
  const categories = fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
  const articles = [];

  categories.forEach((category) => {
    const files = fs
      .readdirSync(path.join(contentDir, category))
      .filter((f) => f.endsWith(".mdx"));
    files.forEach((file) => {
      const filePath = path.join(contentDir, category, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      articles.push({
        slug: file.replace(".mdx", ""),
        category,
        title: data.title,
        filePath,
        content,
        frontmatter: fileContent.split("---")[1], // Guardar frontmatter crudo para no dañar fechas
      });
    });
  });

  return articles;
}

const articles = getAllArticles();
console.log(`Encontrados ${articles.length} artículos para interlinking.`);

let linksAdded = 0;

// 2. Aplicar interlinking
articles.forEach((article, index) => {
  // Evitar procesar si ya tiene la marca de lectura recomendada
  if (article.content.includes("📌 **Lectura recomendada:**")) {
    return;
  }

  // Elegir 2 artículos aleatorios para enlazar (que no sean el mismo)
  const otherArticles = articles.filter((a) => a.slug !== article.slug);
  const shuffled = otherArticles.sort(() => 0.5 - Math.random());
  const link1 = shuffled[0];
  const link2 = shuffled[1];

  // Encontrar un buen punto para inyectar (mitad del contenido)
  const paragraphs = article.content.split("\n\n");
  const midPoint = Math.floor(paragraphs.length / 2);
  const quarterPoint = Math.floor(paragraphs.length / 4);

  // Inyectar enlace 1 en el primer cuarto
  if (paragraphs.length > 4 && link1) {
    paragraphs.splice(
      quarterPoint,
      0,
      `> 📌 **Lectura recomendada:** [${link1.title}](/${link1.category}/${link1.slug})`,
    );
    linksAdded++;
  }

  // Inyectar enlace 2 en la mitad/final
  if (paragraphs.length > 8 && link2) {
    paragraphs.splice(
      midPoint + 1,
      0,
      `> 📌 **Lectura relacionada:** [${link2.title}](/${link2.category}/${link2.slug})`,
    );
    linksAdded++;
  } else if (paragraphs.length <= 8 && link1 && link2) {
    // Si es corto, meter el segundo casi al final
    paragraphs.splice(
      paragraphs.length - 1,
      0,
      `> 📌 **Guía paso a paso:** [${link2.title}](/${link2.category}/${link2.slug})`,
    );
    linksAdded++;
  }

  const newContent = paragraphs.join("\n\n");

  // Reconstruir el archivo MDX preservando el frontmatter original exactamente igual
  const rawFrontmatter = article.frontmatter;
  const newFileContent = `---${rawFrontmatter}---

${newContent.trim()}
`;

  fs.writeFileSync(article.filePath, newFileContent);
});

console.log(
  `Proceso completado. Se han inyectado ${linksAdded} enlaces internos en forma de telaraña semántica.`,
);
