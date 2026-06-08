/**
 * Rename markdown posts with meaningful Chinese titles based on content,
 * and update corresponding image directories.
 */
const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");
const imagesDir = path.join(__dirname, "..", "public", "images", "posts");

// Map old slug → { title, slug: new slug }
// GAMES101 — meaningful lecture topic titles
const GAMES101 = {
  day1:  { title: "GAMES101 线性代数基础",               slug: "games101-linear-algebra" },
  day2:  { title: "GAMES101 开发环境配置",               slug: "games101-env-setup" },
  day3:  { title: "GAMES101 3D变换",                    slug: "games101-3d-transformation" },
  day4:  { title: "GAMES101 三角形的光栅化",             slug: "games101-rasterization" },
  day5:  { title: "GAMES101 作业1折腾记",                slug: "games101-assignment1-setup" },
  day6:  { title: "GAMES101 矩阵运算推导",               slug: "games101-matrix-derivation" },
  day7:  { title: "GAMES101 投影矩阵调试",               slug: "games101-projection-debug" },
  day8:  { title: "GAMES101 作业2-ZBuffer",              slug: "games101-assignment2-zbuffer" },
  "day8-day9": { title: "GAMES101 采样与抗锯齿",         slug: "games101-sampling-aa" },
  day11: { title: "GAMES101 画家算法与深度测试",          slug: "games101-painter-depth" },
  day12: { title: "GAMES101 高光与Blinn-Phong",          slug: "games101-blinn-phong" },
  day13: { title: "GAMES101 重心坐标",                   slug: "games101-barycentric" },
  day14: { title: "GAMES101 环境贴图",                   slug: "games101-env-mapping" },
  day15: { title: "GAMES101 几何表示",                   slug: "games101-geometry" },
  day16: { title: "GAMES101 作业3记录",                  slug: "games101-assignment3" },
  day17: { title: "GAMES101 点云与曲面",                 slug: "games101-point-clouds" },
  day18: { title: "GAMES101 Loop细分",                  slug: "games101-loop-subdivision" },
  day19: { title: "GAMES101 光线追踪",                   slug: "games101-ray-tracing" },
  day20: { title: "GAMES101 加速结构",                   slug: "games101-acceleration" },
  day21: { title: "GAMES101 作业4-Bezier曲线",           slug: "games101-assignment4-bezier" },
  day22: { title: "GAMES101 作业5-光线与三角形求交",     slug: "games101-assignment5" },
  day23: { title: "GAMES101 作业6-BVH加速",             slug: "games101-assignment6-bvh" },
  day24: { title: "GAMES101 蒙特卡罗积分",               slug: "games101-monte-carlo" },
  day25: { title: "GAMES101 路径追踪调试",               slug: "games101-path-tracing" },
  day26: { title: "GAMES101 材质与外观",                 slug: "games101-material" },
  day27: { title: "GAMES101 第十八节笔记",               slug: "games101-section18" },
  day28: { title: "GAMES101 成像与捕捉",                 slug: "games101-imaging" },
  day29: { title: "GAMES101 光场",                      slug: "games101-light-field" },
  day30: { title: "GAMES101 光谱与颜色",                 slug: "games101-color" },
  day31: { title: "GAMES101 动画基础",                   slug: "games101-animation" },
  day32: { title: "GAMES101 速度场与模拟",               slug: "games101-velocity-field" },
};

const REALTIME = {
  l0:                         { title: "实时渲染简介",                          slug: "realtime-intro" },
  recap:                      { title: "GAMES101 复习总结",                     slug: "games101-recap" },
  realtimeenvironmentmapping:  { title: "SDF与环境光渲染",                      slug: "realtime-sdf-envlight" },
  realtimeenvironmentmapping2: { title: "环境光阴影",                           slug: "realtime-envshadow" },
  realtimeglobalillumination1: { title: "球谐函数与全局光照",                    slug: "realtime-sh-gi" },
  realtimeglobalillumination2: { title: "LPV全局光照",                         slug: "realtime-lpv" },
  realtimeglobalillumination3: { title: "SSDO与RSM间接光照",                    slug: "realtime-ssdo-rsm" },
  realtimephysicallybasedmaterial1: { title: "PBR微表面BRDF",                   slug: "realtime-pbr-microfacet" },
  realtimephysicallybasedmaterial2: { title: "LTC多边形光源BRDF",               slug: "realtime-ltc-brdf" },
  realtimeshadow1:             { title: "Shadow Mapping复习",                    slug: "realtime-shadow-mapping" },
  realtimeshadow2:             { title: "PCF软阴影",                            slug: "realtime-pcf-shadow" },
  rtrt1:                       { title: "实时光线追踪入门",                      slug: "realtime-rtrt1" },
};

const renameMap = { ...GAMES101, ...REALTIME };

for (const [oldSlug, { title, slug: newSlug }] of Object.entries(renameMap)) {
  const oldPath = path.join(postsDir, oldSlug + ".md");
  if (!fs.existsSync(oldPath)) {
    console.log(`SKIP ${oldSlug}.md — not found`);
    continue;
  }

  // Read and update frontmatter title
  let content = fs.readFileSync(oldPath, "utf-8");
  content = content.replace(
    /^title: ".*"/,
    `title: "${title}"`
  );

  // Write to new path
  const newPath = path.join(postsDir, newSlug + ".md");
  fs.writeFileSync(newPath, content, "utf-8");

  // Remove old file
  fs.unlinkSync(oldPath);

  // Rename image directory if exists
  const oldImgDir = path.join(imagesDir, oldSlug);
  const newImgDir = path.join(imagesDir, newSlug);
  if (fs.existsSync(oldImgDir) && oldImgDir !== newImgDir) {
    if (fs.existsSync(newImgDir)) {
      // Merge: copy new images from old dir, then remove old dir
      for (const f of fs.readdirSync(oldImgDir)) {
        const src = path.join(oldImgDir, f);
        const dst = path.join(newImgDir, f);
        if (fs.statSync(src).isDirectory()) {
          fs.cpSync(src, dst, { recursive: true });
        } else if (!fs.existsSync(dst)) {
          fs.copyFileSync(src, dst);
        }
      }
      fs.rmSync(oldImgDir, { recursive: true });
    } else {
      fs.renameSync(oldImgDir, newImgDir);
    }
  }

  console.log(`${oldSlug}.md → ${newSlug}.md  (${title})`);
}

console.log("\nDone. Don't forget to re-run generate-data.cjs!");
