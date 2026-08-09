import Link from "next/link";
import { getProjects } from "@/lib/config";

export default function ProjectSection() {
  const project = getProjects()[0];
  if (!project) return null;

  return (
    <section className="border-y border-white/10 bg-slate-950/88 px-4 py-20 text-white backdrop-blur-xl md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">
            Featured project · {project.status}
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
              <span key={technology} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-slate-300">
                {technology}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={project.link} className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
              查看项目详情
            </Link>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-300 hover:bg-white/5">
              GitHub 源码
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-5 shadow-2xl shadow-cyan-950/40 md:p-8">
          <div className="mb-8 flex items-center justify-between border-b border-slate-700 pb-4">
            <span className="font-mono text-sm text-slate-400">FRAME PIPELINE</span>
            <span className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-300" /> ACTIVE DEVELOPMENT
            </span>
          </div>
          <div className="space-y-3 font-mono text-sm">
            {["Scene + Pipeline", "RenderGraph", "FramePacket", "RHI Execution Plan", "Vulkan Executor"].map((step, index, steps) => (
              <div key={step}>
                <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200">
                  <span className="mr-3 text-cyan-400">0{index + 1}</span>{step}
                </div>
                {index < steps.length - 1 && <div className="ml-8 h-3 border-l border-cyan-500/60" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
