export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h2>
          <div className="mx-auto h-1 w-24 bg-gray-300 dark:bg-gray-700" />
        </header>

        <article className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Background</h3>
            <p className="text-gray-600 dark:text-gray-300">
              I am a passionate developer with a focus on creating intuitive and efficient web applications.
              My journey in software development started with curiosity and has evolved into a dedicated pursuit
              of building solutions that make a difference.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Skills</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                Frontend: React, Next.js, TypeScript
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                Backend: Node.js, Express, Python
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
                Tools: Git, Docker, CI/CD
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                Design: Tailwind CSS, Framer Motion
              </li>
            </ul>
          </div>
        </article>

        <div className="mt-12 text-center">
          <a
            href="/about"
            className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}