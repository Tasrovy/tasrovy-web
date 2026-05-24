import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function BlogSection() {
  const posts = getPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="relative z-10 py-16 px-4 md:py-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl drop-shadow-md text-gray-900 dark:text-white">
            Latest Blog Posts
          </h2>
          <div className="mx-auto h-1 w-24 bg-gray-400/30 dark:bg-gray-500/30 rounded-full" />
          <p className="mt-4 text-gray-700 dark:text-gray-200 drop-shadow-sm font-medium">
            Thoughts, tutorials, and insights from my journey
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl bg-white/40 p-6 shadow-lg backdrop-blur-md border border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white/50 dark:bg-black/40 dark:border-white/10 dark:hover:bg-black/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-400/20 dark:text-blue-200">
                  {post.category}
                </span>
                <time className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {post.date}
                </time>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white drop-shadow-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="mb-4 text-gray-700 dark:text-gray-200 font-medium leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center font-bold text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read more
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border-2 border-gray-900/50 bg-white/20 backdrop-blur-sm px-8 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:border-white/30 dark:bg-black/20 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white shadow-md hover:shadow-lg"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
