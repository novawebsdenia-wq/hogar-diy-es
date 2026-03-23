import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleMeta {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  readingTime: number;
  slug: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

function parseArticle(
  filePath: string,
  slug: string,
  category: string,
): Article {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { minutes } = readingTime(content);

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    updated: data.updated as string | undefined,
    category,
    tags: (data.tags as string[]) ?? [],
    image: data.image as string | undefined,
    author: (data.author as string) ?? "HogarDIY.es",
    readingTime: Math.ceil(minutes),
    slug,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return articles;

  const categories = fs.readdirSync(CONTENT_DIR).filter((f) => {
    return fs.statSync(path.join(CONTENT_DIR, f)).isDirectory();
  });

  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(categoryDir, file);
      const article = parseArticle(filePath, slug, category);
      const { content: _, ...meta } = article;
      articles.push(meta);
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticle(category: string, slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseArticle(filePath, slug, category);
}

export function getRelatedArticles(
  current: ArticleMeta,
  limit = 4,
): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, limit);
}
