"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import siteConfig from "@/config/site.json";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav aria-label="主导航" className="fixed top-0 z-40 w-full border-b border-white/10 bg-slate-950/85 text-white backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
            >
              <span className="h-2.5 w-2.5 rounded-sm bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.75)]" aria-hidden="true" />
              {siteConfig.name}<span className="font-mono text-cyan-300">/</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {siteConfig.navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive(link.href) ? "bg-white/10 text-cyan-200" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span className="sr-only">{isMenuOpen ? "关闭主菜单" : "打开主菜单"}</span>
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

      {isMenuOpen && (
        <div id="mobile-navigation" className="md:hidden">
          <div className="space-y-1 border-t border-white/10 px-3 pb-4 pt-3">
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${isActive(link.href) ? "bg-white/10 text-cyan-200" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
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
