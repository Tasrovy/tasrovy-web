import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Tasrovy 的图形学学习、实时渲染实践与本站内容",
};

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div className="min-h-screen bg-white pt-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-300">About</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">从理解公式，到构建真正运行的渲染系统。</h1>

        <div className="mt-16 grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-2xl font-semibold">你好，我是 {config.name}</h2>
          <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            <p>这个网站记录我在计算机图形学与实时渲染方向的学习和实践。文章内容目前主要来自 GAMES101、实时渲染课程，以及具体渲染技术的推导与实现记录。</p>
            <p>TasrovyRenderer 是这些学习内容的工程落点：使用 C++20、HLSL 与 Vulkan，从 RenderGraph、RHI 和资源同步开始，逐步实现延迟 PBR、阴影、屏幕空间效果与时域后处理。</p>
            <p>对于仍处在验证阶段的功能，我会在项目页面明确写出边界。本站的目标是保留真实的技术演进，而不是把实验包装成已经完成的产品。</p>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800">
          <p className="text-sm text-slate-500">源码与最新进展</p>
          <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-xl font-semibold text-blue-700 hover:text-blue-900 dark:text-cyan-300 dark:hover:text-cyan-200">github.com/Tasrovy <span className="ml-2" aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}
