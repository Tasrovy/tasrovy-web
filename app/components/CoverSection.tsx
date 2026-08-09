import Link from "next/link";
import { getPosts } from "@/lib/posts";

const pipelineSteps = ["Scene", "RenderGraph", "FramePacket", "RHI Plan", "Vulkan"];

export default function CoverSection() {
  const postCount = getPosts().length;
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-white md:pb-24 md:pt-32" aria-labelledby="hero-title">
      <div className="project-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="hero-glow absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-cyan-300 md:text-sm">Graphics · Rendering · Engineering</p>
          <h1 id="hero-title" className="max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.04em] md:text-7xl xl:text-8xl">
            构建渲染器，<br /><span className="text-gradient">理解每一帧。</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
            我是 Tasrovy，专注实时渲染与图形学工程。这里记录 TasrovyRenderer 的架构演进，以及从图形学课程到现代渲染技术的实践过程。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects/tasrovy-renderer" className="rounded-full bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">
              探索 TasrovyRenderer
            </Link>
            <Link href="/blog" className="rounded-full border border-slate-600 bg-slate-900/60 px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-800">
              阅读图形学笔记
            </Link>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-5 border-t border-slate-800 pt-6">
            <div><dt className="font-mono text-xs text-slate-500">PROJECT</dt><dd className="mt-2 font-semibold">Open source</dd></div>
            <div><dt className="font-mono text-xs text-slate-500">STACK</dt><dd className="mt-2 font-semibold">C++ / Vulkan</dd></div>
            <div><dt className="font-mono text-xs text-slate-500">WRITING</dt><dd className="mt-2 font-semibold">{postCount} notes</dd></div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 shadow-2xl shadow-cyan-950/50">
            <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
              <div className="flex gap-2" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" /></div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">frame.compile()</span>
            </div>
            <div className="p-5 md:p-7">
              <div className="mb-7 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-400">
                <p><span className="text-violet-300">pipeline</span>.configure(settings);</p>
                <p><span className="text-cyan-300">frame</span> = graph.compile(scene);</p>
                <p><span className="text-emerald-300">executor</span>.submit(frame);</p>
              </div>
              <div className="space-y-2.5">
                {pipelineSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="w-6 font-mono text-xs text-cyan-400">0{index + 1}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-cyan-400/70 to-violet-400/20" />
                    <span className="w-28 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">
                <span>API-independent</span><span className="text-emerald-300">● Valid graph</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
