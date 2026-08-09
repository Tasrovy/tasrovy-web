import type { Metadata } from "next";
import BlogExplorer from "@/app/components/BlogExplorer";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "图形学课程、实时渲染技术与工程实践笔记",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-slate-200 px-4 py-20 dark:border-slate-800 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-blue-700 dark:text-cyan-300">Rendering notes</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h1 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl">把公式、论文和实现<br />连成一条线。</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">课程推导、实时渲染技术与工程实践记录。内容保留学习路径，也持续校正实现中的理解。</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <BlogExplorer posts={posts} />
      </main>
    </div>
  );
}
