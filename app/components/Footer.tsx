import { getSiteConfig } from "@/lib/config";

export default function Footer() {
  const config = getSiteConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/40 text-white dark:bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {currentYear} {config.name}
            </p>
            <p className="mt-1 text-xs opacity-75">
              记录实时渲染、图形学工程与持续学习
            </p>
          </div>
          <div className="flex space-x-4">
            {config.social.github && (
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-colors"
              >
                GitHub 源码
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
