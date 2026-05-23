import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights from my journey
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl bg-white/40 p-6 shadow-lg backdrop-blur-md border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-black/40 dark:border-white/10"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-400/20 dark:text-blue-200">
                    {post.category}
                  </span>
                  <time className="text-sm text-gray-500 dark:text-gray-400">{post.date}</time>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
