export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      // 🔥 修改点：去掉了纯色，改用 bg-gray-900/40 和 dark:bg-black/40，加入 backdrop-blur-md
      <footer className="bg-gray-900/40 text-white dark:bg-black/40 backdrop-blur-md border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm">
                © {currentYear} Tasrovy. All rights reserved.
              </p>
              <p className="mt-1 text-xs opacity-75">
                Built with Next.js & Tailwind CSS
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                  href="https://github.com/Tasrovy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}