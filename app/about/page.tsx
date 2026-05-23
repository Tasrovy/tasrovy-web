import { getSiteConfig } from "@/lib/config";

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Me</h1>
          <div className="mx-auto h-1 w-24 bg-gray-300 dark:bg-gray-700" />
        </header>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold">Hello, I&apos;m {config.name}</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                I&apos;m a passionate developer focused on building modern web applications that are both functional and delightful to use. My journey in software development is driven by curiosity and a desire to create solutions that make a difference.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                I believe in continuous learning and staying up-to-date with the latest technologies and best practices. Whether it&apos;s frontend, backend, or full-stack development, I enjoy the challenge of turning ideas into reality.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-xl font-semibold">Experience &amp; Skills</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium">Frontend</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>&bull; React &amp; Next.js</li>
                    <li>&bull; TypeScript</li>
                    <li>&bull; Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-medium">Backend</h4>
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    <li>&bull; Node.js &amp; Express</li>
                    <li>&bull; Python</li>
                    <li>&bull; Databases</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-semibold">Philosophy</h3>
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-300">
                &ldquo;Great software is built through collaboration, clean code, and a commitment to quality. I believe in creating solutions that are not only functional but also maintainable and scalable.&rdquo;
              </blockquote>
            </section>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>Email: {config.email}</li>
                <li>Location: {config.location}</li>
              </ul>
              <div className="mt-6 flex space-x-4">
                {Object.entries(config.social).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    className="text-gray-700 capitalize hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {key}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-semibold">Interests</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>&bull; Web Development</li>
                <li>&bull; Open Source</li>
                <li>&bull; Photography</li>
                <li>&bull; Hiking</li>
                <li>&bull; Reading</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
