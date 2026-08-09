import type { Metadata } from "next";

const repositoryUrl = "https://github.com/Tasrovy/TasrovyRenderer";

export const metadata: Metadata = {
  title: "TasrovyRenderer",
  description: "使用 C++20、HLSL 与 Vulkan 构建的数据驱动实时渲染器",
};

const architecture = [
  ["01", "Render", "声明场景、资源、Pipeline 与 Pass，不直接依赖 Vulkan。"],
  ["02", "RenderGraph", "分析 RAW、WAR、WAW 与显式依赖，生成稳定拓扑顺序。"],
  ["03", "FramePacket", "把一帧固化为 API 无关的数据描述与命令集合。"],
  ["04", "RHI Plan", "生成资源生命周期、Descriptor 与自动 Barrier 计划。"],
  ["05", "Vulkan Executor", "创建 Vulkan 对象并录制、提交实际 GPU 命令。"],
];

const features = [
  { title: "延迟渲染与 PBR", body: "GBuffer、Metallic/Roughness 工作流、Cook-Torrance BRDF，以及透明物体的前向合成。" },
  { title: "阴影系统", body: "支持单张 Shadow Map、四级 CSM、PCF/Adaptive PCSS，以及用于验证页映射链路的简化 VSM。" },
  { title: "屏幕空间效果", body: "包含 HBAO、分层 Hi-Z 与基于 Hi-Z 的 SSR，并提供对应的调试输出。" },
  { title: "时域与后处理", body: "实现 TAA/TAAU、运动向量、Motion Blur、DOF、多级 Bloom、描边、曝光与 Tone Mapping。" },
  { title: "线程与资源", body: "渲染线程负责帧协调；RHI 管理多帧资源、瞬态纹理复用、Fence 和延迟删除。" },
  { title: "运行时调试", body: "ImGui 可编辑渲染参数并预览 GBuffer、深度、Hi-Z、阴影；同时提供 GPU Timestamp 与资源监控。" },
];

export default function TasrovyRendererPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-16 text-white">
      <header className="relative overflow-hidden border-b border-slate-800 px-4 py-20 md:py-32">
        <div className="project-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
            <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-emerald-300">持续开发</span>
            <span className="text-slate-500">C++20 · Vulkan · HLSL</span>
          </div>
          <h1 className="mt-7 text-5xl font-bold tracking-tight md:text-8xl">TasrovyRenderer</h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300 md:text-2xl md:leading-10">
            从场景与 Pass 声明，到 RenderGraph 编译，再到 Vulkan 命令提交：一个围绕数据边界、资源生命周期与可扩展执行链构建的实时渲染器。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">查看 GitHub 源码</a>
            <a href="#architecture" className="rounded-full border border-slate-600 px-6 py-3 font-semibold transition hover:border-slate-300">了解渲染架构</a>
          </div>
        </div>
      </header>

      <main>
        <section id="architecture" className="scroll-mt-24 border-b border-slate-800 px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">Architecture</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">一帧如何变成 GPU 工作</h2>
              <p className="text-lg leading-8 text-slate-400">管线的核心不是固定的调用顺序，而是先声明资源与 Pass，再由编译阶段校验依赖、固化数据并生成执行计划。</p>
            </div>
            <div className="mt-14 grid gap-3">
              {architecture.map(([number, title, body], index) => (
                <div key={title} className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:grid-cols-[4rem_12rem_1fr] md:items-center md:p-6">
                  <span className="font-mono text-cyan-300">{number}</span>
                  <h3 className="font-mono text-lg font-semibold">{title}</h3>
                  <p className="leading-7 text-slate-400">{body}</p>
                  {index < architecture.length - 1 && <span className="hidden" aria-hidden="true">↓</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-800 bg-slate-900/35 px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">Implemented now</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">当前源码中已经落地的能力</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-800 bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="bg-slate-950 p-7 md:p-8">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-amber-400/25 bg-amber-400/5 p-7 md:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-300">Honest status</p>
              <h2 className="mt-4 text-3xl font-bold">项目边界</h2>
              <ul className="mt-6 space-y-4 leading-7 text-slate-300">
                <li>Virtual Shadow Map 是固定驻留页面映射到物理 Atlas 的简化验证版本，并非完整 VSM 系统。</li>
                <li>IBL 预计算目前默认停用；天空盒仍可加载和切换，旧的预计算实现保留在 Vulkan Backend。</li>
                <li>项目仍在持续开发，当前目标是验证现代渲染架构与技术链路，而不是交付通用商业引擎。</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-7 md:p-9">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">Development stack</p>
              <h2 className="mt-4 text-3xl font-bold">工具与依赖</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                {["C++20", "Vulkan", "HLSL / DXC", "CMake", "vcpkg", "Volk", "GLFW", "GLM", "Assimp", "ImGui", "RenderDoc"].map((item) => (
                  <span key={item} className="rounded-full border border-slate-700 px-3 py-2 font-mono text-sm text-slate-300">{item}</span>
                ))}
              </div>
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex font-semibold text-cyan-300 hover:text-cyan-200">阅读源码与构建说明 <span className="ml-2" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
