import type { Metadata } from "next";
import BlogExplorer from "@/app/components/BlogExplorer";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "GAMES101 与 GAMES202 课程笔记、公式推导和作业解法",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-slate-200 px-4 py-20 dark:border-slate-800 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-blue-700 dark:text-cyan-300">GAMES101 · GAMES202</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h1 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl">课程笔记，<br />以及作业怎么解。</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">记录 GAMES101 与 GAMES202 的课程知识、公式推导、作业思路和实现过程。内容保留真实的学习与调试路径。</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <BlogExplorer posts={posts} />
      </main>
    </div>
  );
}
