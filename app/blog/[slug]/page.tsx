import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdown(post.content);

  return (
    <div className="min-h-screen pt-16">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back to blog
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-400/20 dark:text-blue-200">
              {post.category}
            </span>
            <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl text-gray-900 dark:text-white">
            {post.title}
          </h1>
        </header>

        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
