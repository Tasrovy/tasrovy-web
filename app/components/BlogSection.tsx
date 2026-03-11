import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    excerpt: "Learn the fundamentals of building modern web applications with Next.js 14.",
    date: "2024-03-15",
    category: "Web Development",
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    excerpt: "Improve your TypeScript code with these essential patterns and techniques.",
    date: "2024-03-10",
    category: "TypeScript",
  },
  {
    id: 3,
    title: "Building Responsive UIs",
    excerpt: "Create beautiful and functional user interfaces that work on all devices.",
    date: "2024-03-05",
    category: "UI/UX",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-gray-50 py-16 px-4 dark:bg-gray-900 md:py-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest Blog Posts</h2>
          <div className="mx-auto h-1 w-24 bg-gray-300 dark:bg-gray-700" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights from my journey
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {post.category}
                </span>
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </time>
              </div>
              <h3 className="mb-3 text-xl font-semibold">{post.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read more
                <svg
                  className="ml-1 h-4 w-4"
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
            className="inline-block rounded-lg border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}