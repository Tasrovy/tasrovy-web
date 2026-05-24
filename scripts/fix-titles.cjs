/**
 * Fix frontmatter titles in already-renamed posts.
 */
const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");

const titleMap = {
  "games101-linear-algebra": "GAMES101 线性代数基础",
  "games101-env-setup": "GAMES101 开发环境配置",
  "games101-3d-transformation": "GAMES101 3D变换",
  "games101-rasterization": "GAMES101 三角形的光栅化",
  "games101-assignment1-setup": "GAMES101 作业1折腾记",
  "games101-matrix-derivation": "GAMES101 矩阵运算推导",
  "games101-projection-debug": "GAMES101 投影矩阵调试",
  "games101-assignment2-zbuffer": "GAMES101 作业2-ZBuffer",
  "games101-sampling-aa": "GAMES101 采样与抗锯齿",
  "games101-painter-depth": "GAMES101 画家算法与深度测试",
  "games101-blinn-phong": "GAMES101 高光与Blinn-Phong",
  "games101-barycentric": "GAMES101 重心坐标",
  "games101-env-mapping": "GAMES101 环境贴图",
  "games101-geometry": "GAMES101 几何表示",
  "games101-assignment3": "GAMES101 作业3记录",
  "games101-point-clouds": "GAMES101 点云与曲面",
  "games101-loop-subdivision": "GAMES101 Loop细分",
  "games101-ray-tracing": "GAMES101 光线追踪",
  "games101-acceleration": "GAMES101 加速结构",
  "games101-assignment4-bezier": "GAMES101 作业4-Bezier曲线",
  "games101-assignment5": "GAMES101 作业5-光线与三角形求交",
  "games101-assignment6-bvh": "GAMES101 作业6-BVH加速",
  "games101-monte-carlo": "GAMES101 蒙特卡罗积分",
  "games101-path-tracing": "GAMES101 路径追踪调试",
  "games101-material": "GAMES101 材质与外观",
  "games101-section18": "GAMES101 第十八节笔记",
  "games101-imaging": "GAMES101 成像与捕捉",
  "games101-light-field": "GAMES101 光场",
  "games101-color": "GAMES101 光谱与颜色",
  "games101-animation": "GAMES101 动画基础",
  "games101-velocity-field": "GAMES101 速度场与模拟",
  "games101-recap": "GAMES101 复习总结",
  "realtime-intro": "实时渲染简介",
  "realtime-sdf-envlight": "SDF与环境光渲染",
  "realtime-envshadow": "环境光阴影",
  "realtime-sh-gi": "球谐函数与全局光照",
  "realtime-lpv": "LPV全局光照",
  "realtime-ssdo-rsm": "SSDO与RSM间接光照",
  "realtime-pbr-microfacet": "PBR微表面BRDF",
  "realtime-ltc-brdf": "LTC多边形光源BRDF",
  "realtime-shadow-mapping": "Shadow Mapping复习",
  "realtime-pcf-shadow": "PCF软阴影",
};

let updated = 0;
for (const [slug, title] of Object.entries(titleMap)) {
  const fp = path.join(postsDir, slug + ".md");
  if (!fs.existsSync(fp)) {
    console.log(`SKIP ${slug}.md — not found`);
    continue;
  }
  let content = fs.readFileSync(fp, "utf-8");
  const newContent = content.replace(/^title: ".*"/m, `title: "${title}"`);
  if (newContent !== content) {
    fs.writeFileSync(fp, newContent, "utf-8");
    console.log(`${slug}.md → title: "${title}"`);
    updated++;
  } else {
    console.log(`${slug}.md — pattern not matched!`);
  }
}
console.log(`\nUpdated ${updated} files`);
