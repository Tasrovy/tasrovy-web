import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-white/82 px-4 py-20 backdrop-blur-xl dark:bg-slate-950/88 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-300">About this site</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">把学习沉淀成可以运行的系统</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
          <p>
            本站围绕计算机图形学与实时渲染展开：一部分是 GAMES101 与实时渲染课程笔记，另一部分是 TasrovyRenderer 的工程实践。
          </p>
          <p>
            项目重点不仅是叠加视觉效果，也包括 RenderGraph、RHI、GPU 资源生命周期、同步计划和调试工具等渲染基础设施。
          </p>
          <Link href="/about" className="inline-flex items-center font-semibold text-blue-700 transition hover:text-blue-900 dark:text-cyan-300 dark:hover:text-cyan-200">
            了解技术方向 <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
