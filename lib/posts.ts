import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
};

export type PostMeta = Omit<Post, "content"> & { readingMinutes: number };

function estimateReadingMinutes(content: string): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[\s#*`>|_[\]()!-]+/g, "");
  return Math.max(1, Math.ceil(plainText.length / 500));
}

export function getPosts(): PostMeta[] {
  return postsData.map(({ slug, title, date, excerpt, category, content }) => ({
    slug,
    title,
    date,
    excerpt,
    category,
    readingMinutes: estimateReadingMinutes(content),
  }));
}

export function getPost(slug: string): Post | null {
  return postsData.find((p) => p.slug === slug) ?? null;
}
