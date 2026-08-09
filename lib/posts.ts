import postsData from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
};

type PostMeta = Omit<Post, "content">;

export function getPosts(): PostMeta[] {
  return postsData.map(({ slug, title, date, excerpt, category }) => ({
    slug,
    title,
    date,
    excerpt,
    category,
  }));
}

export function getPost(slug: string): Post | null {
  return postsData.find((p) => p.slug === slug) ?? null;
}
