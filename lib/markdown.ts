import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { page_routes } from "./routes-config";

export type DocsFrontmatter = {
  title: string;
  description: string;
};

export type CompiledDocs = {
  frontmatter: DocsFrontmatter;
  content: string;
};

export type TocItem = {
  href: string;
  level: number;
  text: string;
};

export async function getCompiledDocsForSlug(slug: string): Promise<CompiledDocs | null> {
  try {
    const filePath = join(process.cwd(), "contents", "docs", slug, "index.mdx");
    const fileContent = readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    
    return {
      frontmatter: frontmatter as DocsFrontmatter,
      content: content,
    };
  } catch (error) {
    return null;
  }
}

export async function getDocFrontmatter(slug: string): Promise<DocsFrontmatter | null> {
  try {
    const filePath = join(process.cwd(), "contents", "docs", slug, "index.mdx");
    const fileContent = readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContent);
    
    return frontmatter as DocsFrontmatter;
  } catch (error) {
    return null;
  }
}

export async function getDocsTocs(slug: string): Promise<TocItem[]> {
  try {
    const filePath = join(process.cwd(), "contents", "docs", slug, "index.mdx");
    const fileContent = readFileSync(filePath, "utf8");
    const { content } = matter(fileContent);
    
    // Extract headings from markdown content
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const tocs: TocItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length; // Number of # characters
      const text = match[2].trim();
      const href = `#${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      
      tocs.push({
        href,
        level,
        text,
      });
    }
    
    return tocs;
  } catch (error) {
    return [];
  }
}

export function getPreviousNext(slug: string) {
  const currentIndex = page_routes.findIndex((route) => route.href === `/${slug}`);
  
  const prev = currentIndex > 0 ? page_routes[currentIndex - 1] : null;
  const next = currentIndex < page_routes.length - 1 ? page_routes[currentIndex + 1] : null;
  
  return { prev, next };
}