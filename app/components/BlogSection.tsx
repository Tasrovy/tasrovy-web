import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function BlogSection() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-slate-50 px-4 py-20 text-slate-950 dark:bg-slate-950 dark:text-white md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-blue-700 dark:text-cyan-300">Course notes & solutions</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] md:text-6xl">课程笔记与作业解法</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">围绕 GAMES101 与 GAMES202，整理课程知识、公式推导、实现思路和作业调试过程。</p>
          </div>
          <Link href="/blog" className="hidden rounded-full border border-slate-300 px-5 py-3 font-semibold transition hover:border-slate-600 dark:border-slate-700 dark:hover:border-slate-400 md:inline-flex">查看全部文章 →</Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 md:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post.slug} className="group flex min-h-80 flex-col bg-white p-7 transition hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 md:p-8">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-blue-700 dark:text-cyan-300">{post.category || "未分类"}</span>
                <span className="text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold leading-tight tracking-tight">
                <Link href={`/blog/${post.slug}`} className="transition group-hover:text-blue-700 dark:group-hover:text-cyan-300">{post.title}</Link>
              </h3>
              <p className="mt-4 line-clamp-3 leading-7 text-slate-600 dark:text-slate-400">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800">
                <time dateTime={post.date}>{post.date}</time><span>{post.readingMinutes} 分钟</span>
              </div>
            </article>
          ))}
        </div>

        <Link href="/blog" className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-3 font-semibold dark:border-slate-700 md:hidden">查看全部文章 →</Link>
      </div>
    </section>
  );
}
