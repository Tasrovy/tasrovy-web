export default function BlogPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights on web development
          </p>
        </header>

        <div className="space-y-8">
          <article className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Web Development
              </span>
              <time className="text-sm text-gray-500">March 15, 2024</time>
            </div>
            <h2 className="mb-3 text-2xl font-semibold">
              Getting Started with Next.js 14
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Learn the fundamentals of building modern web applications with Next.js 14, including App Router, server components, and new features.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Read article →
            </a>
          </article>

          <article className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                TypeScript
              </span>
              <time className="text-sm text-gray-500">March 10, 2024</time>
            </div>
            <h2 className="mb-3 text-2xl font-semibold">
              TypeScript Best Practices
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Improve your TypeScript code with essential patterns, type safety techniques, and configuration tips.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Read article →
            </a>
          </article>

          <article className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                UI/UX
              </span>
              <time className="text-sm text-gray-500">March 5, 2024</time>
            </div>
            <h2 className="mb-3 text-2xl font-semibold">
              Building Responsive UIs
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Create beautiful and functional user interfaces that work seamlessly across all devices and screen sizes.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Read article →
            </a>
          </article>
        </div>
      </div>
    </div>
  );
}