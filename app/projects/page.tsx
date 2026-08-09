import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/config";

export const metadata: Metadata = {
  title: "项目",
  description: "Tasrovy 的实时渲染与图形学工程项目",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-slate-950 pt-16 text-white">
      <header className="border-b border-slate-800 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">Selected work</p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">项目不是清单，<br />而是持续演进的系统。</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            这里展示已经落地并持续维护的图形学工程。功能描述以公开源码和当前运行路径为准。
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        {projects.map((project) => (
          <article key={project.slug} className="grid gap-10 rounded-3xl border border-slate-700 bg-slate-900 p-6 md:p-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300">{project.status}</span>
                <span className="font-mono text-xs text-slate-500">OPEN SOURCE</span>
              </div>
              <h2 className="mt-5 text-4xl font-bold md:text-5xl">{project.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{project.description}</p>
              <ul className="mt-8 space-y-4 text-slate-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href={project.link} className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">查看案例</Link>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-600 px-6 py-3 font-semibold transition hover:border-slate-300">查看源码</a>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-slate-950 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Technical surface</p>
              <div className="my-10 grid grid-cols-2 gap-3">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-lg border border-slate-800 px-3 py-3 text-center font-mono text-sm text-slate-300">{technology}</span>
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-500">项目处于持续开发阶段，页面会明确标注尚未完成或默认停用的功能。</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
