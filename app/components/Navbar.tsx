"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
      // 🔥 修改点：降低了透明度（20%~40%），增加底边框 border-b border-white/10
      <nav className="fixed top-0 z-40 w-full bg-white/20 dark:bg-black/40 backdrop-blur-md border-b border-gray-200/20 dark:border-white/10 transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                  href="/"
                  className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Tasrovy
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        // 🔥 修改点：悬浮颜色也改成了半透明 (hover:bg-white/30)
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white/40 dark:text-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      {link.name}
                    </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  // 🔥 修改点：按钮悬浮色也改为半透明
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-white/40 focus:outline-none dark:text-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 border-t border-gray-200/20 dark:border-white/10">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        // 🔥 修改点：手机端菜单也改成了半透明悬浮
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-white/40 dark:text-gray-200 dark:hover:bg-white/10 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                ))}
              </div>
            </div>
        )}
      </nav>
  );
}