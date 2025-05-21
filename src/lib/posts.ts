import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


const postsDirectory = path.join(process.cwd(), '/changelog');


export function getPostSlugs() : string[] {
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): { slug: string; content: string; data: any } {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    return { slug: realSlug, content, data };
  }

export function getAllPosts(): {slug: string, content: string; data: any}[] {
    const slugs = getPostSlugs();
    return slugs.map((slug) => getPostBySlug(slug));
}