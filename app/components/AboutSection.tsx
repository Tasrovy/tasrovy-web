import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-white/82 px-4 py-20 backdrop-blur-xl dark:bg-slate-950/88 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-300">About this site</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">先把课程学明白，再把代码跑起来</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
          <p>
            本站内容以 GAMES101 和 GAMES202 为主，包括课堂知识整理、公式推导、作业解法，以及实现过程中遇到的问题。
          </p>
          <p>
            TasrovyRenderer 是课程学习之外的长期实践，用来验证 RenderGraph、RHI、GPU 资源生命周期和实时渲染管线等工程问题。
          </p>
          <Link href="/about" className="inline-flex items-center font-semibold text-blue-700 transition hover:text-blue-900 dark:text-cyan-300 dark:hover:text-cyan-200">
            了解技术方向 <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
