"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

type Props = { posts: PostMeta[] };

export default function BlogExplorer({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const categories = useMemo(() => ["全部", ...Array.from(new Set(posts.map((post) => post.category))).filter(Boolean)], [posts]);
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "全部" || post.category === category;
      const matchesQuery = !normalizedQuery || `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, posts, query]);

  return (
    <div>
      <div className="grid gap-4 border-y border-slate-200 py-6 dark:border-slate-800 md:grid-cols-[1fr_auto] md:items-center">
        <label className="relative block">
          <span className="sr-only">搜索文章</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、摘要或分类"
            className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-300"
          />
        </label>
        <p className="font-mono text-xs text-slate-500">{filteredPosts.length} / {posts.length} 篇</p>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="文章分类">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? "bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950" : "border border-slate-300 bg-white text-slate-600 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <article key={post.slug} className="group flex min-h-72 flex-col bg-white p-7 transition hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 md:p-9">
              <div className="flex items-center justify-between gap-4 font-mono text-xs">
                <span className="text-blue-700 dark:text-cyan-300">{post.category || "未分类"}</span>
                <span className="text-slate-400">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                <Link href={`/blog/${post.slug}`} className="transition group-hover:text-blue-700 dark:group-hover:text-cyan-300">{post.title}</Link>
              </h2>
              <p className="mt-4 line-clamp-3 leading-7 text-slate-600 dark:text-slate-400">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingMinutes} 分钟阅读 <span aria-hidden="true">→</span></span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 py-20 text-center text-slate-500 dark:border-slate-700">没有找到匹配的文章。</div>
      )}
    </div>
  );
}
