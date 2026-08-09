/**
 * Prebuild script: reads Markdown posts and config files,
 * outputs static JSON data for the Worker bundle.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "..", "content", "posts");
const dataDir = path.join(__dirname, "..", "data");
const publicDir = path.join(__dirname, "..", "public");
const webImageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

const legacyDuplicateSlugs = new Set([
  "day1", "day2", "day3", "day4", "day5", "day6", "day7", "day8",
  "day8-day9", "day11", "day12", "day13", "day14", "day15", "day16",
  "day17", "day18", "day19", "day20", "day21", "day22", "day23", "day24",
  "day25", "day26", "day27", "day28", "day29", "day30", "day31", "day32",
]);

const titleOverrides = {
  "games101-linear-algebra": "GAMES101 01｜线性代数基础",
  "games101-env-setup": "GAMES101 02｜环境配置与二维变换",
  "games101-3d-transformation": "GAMES101 03｜三维变换与投影",
  "games101-rasterization": "GAMES101 04｜三角形光栅化",
  "games101-assignment1-setup": "GAMES101 作业 1｜旋转与投影变换",
  "games101-matrix-derivation": "GAMES101 06｜投影矩阵推导",
  "games101-projection-debug": "GAMES101 作业 1｜投影变换调试",
  "games101-assignment2-zbuffer": "GAMES101 作业 2｜光栅化与 Z-Buffer",
  "games101-sampling-aa": "GAMES101 08｜采样与反走样",
  "games101-painter-depth": "GAMES101 11｜画家算法与深度测试",
  "games101-blinn-phong": "GAMES101 12｜Blinn-Phong 着色模型",
  "games101-barycentric": "GAMES101 13｜重心坐标与插值",
  "games101-env-mapping": "GAMES101 14｜纹理与环境映射",
  "games101-geometry": "GAMES101 15｜几何表示基础",
  "games101-assignment3": "GAMES101 作业 3｜管线与着色器实现",
  "games101-point-clouds": "GAMES101 17｜点云与曲面表示",
  "games101-loop-subdivision": "GAMES101 18｜Loop 细分与阴影映射",
  "games101-ray-tracing": "GAMES101 19｜光线追踪基础",
  "games101-acceleration": "GAMES101 20｜光线追踪加速结构",
  "games101-assignment4-bezier": "GAMES101 作业 4｜Bezier 曲线",
  "games101-assignment5": "GAMES101 作业 5｜光线与三角形相交",
  "games101-assignment6-bvh": "GAMES101 作业 6｜BVH 加速结构",
  "games101-monte-carlo": "GAMES101 24｜蒙特卡洛积分",
  "games101-path-tracing": "GAMES101 25｜路径追踪",
  "games101-material": "GAMES101 26｜材质与 BRDF",
  "games101-section18": "GAMES101 27｜课程专题笔记",
  "games101-imaging": "GAMES101 28｜成像与相机模型",
  "games101-light-field": "GAMES101 29｜光场与计算摄影",
  "games101-color": "GAMES101 30｜颜色与色彩空间",
  "games101-animation": "GAMES101 31｜动画基础",
  "games101-velocity-field": "GAMES101 32｜速度场与流体模拟",
  "games101-recap": "GAMES202 00｜GAMES101 知识回顾",
  "realtime-intro": "GAMES202 01｜实时高质量渲染概述",
  "realtime-shadow-mapping": "GAMES202｜Shadow Mapping",
  "realtime-pcf-shadow": "GAMES202｜PCF 与 PCSS 软阴影",
  "realtime-envshadow": "GAMES202｜环境光与阴影",
  "realtime-sh-gi": "GAMES202｜球谐函数与实时全局光照",
  "realtime-lpv": "GAMES202｜LPV 与 SSAO",
  "realtime-sdf-envlight": "GAMES202｜SDF 与环境光照",
  "realtime-ssdo-rsm": "GAMES202｜SSDO、RSM 与屏幕空间反射",
  "realtime-pbr-microfacet": "GAMES202｜微表面 BRDF 与 PBR 材质",
  "realtime-ltc-brdf": "GAMES202｜LTC、Disney BRDF 与 NPR",
  "realtime-rtrt1": "GAMES202｜实时光线追踪与降噪",
};

function validatePostImages(slug, content) {
  const imagePattern = /!\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of content.matchAll(imagePattern)) {
    const imageUrl = match[1].trim();
    if (!imageUrl.startsWith("/")) continue;

    const extension = path.extname(imageUrl).toLowerCase();
    if (!webImageExtensions.has(extension)) {
      throw new Error(`${slug}: unsupported web image format: ${imageUrl}`);
    }

    const relativePath = imageUrl.replace(/^\/+/, "").replace(/\//g, path.sep);
    const imagePath = path.join(publicDir, relativePath);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`${slug}: missing image asset: ${imageUrl}`);
    }
  }
}

function generatePosts() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const fileNames = fs.readdirSync(contentDir);
  const posts = fileNames
    .filter((fn) => fn.endsWith(".md"))
    .filter((fn) => !legacyDuplicateSlugs.has(fn.replace(/\.md$/, "")))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      validatePostImages(slug, content);

      // Clean excerpt: strip images, inline code, links — plain text only
      let excerpt = (data.excerpt || "").replace(/!\[([^\]]*)\]\([^)]+\)/g, "").trim();
      if (!excerpt) {
        excerpt = content
          .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")   // strip images
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")    // links → label only
          .replace(/[#*`>|]/g, "")                     // strip markdown symbols
          .split("\n")
          .find((l) => l.trim().length > 0) || "";
        excerpt = excerpt.trim().slice(0, 120);
      }

      return {
        slug,
        title: titleOverrides[slug] || data.title || "",
        date: data.date || "",
        excerpt,
        category: data.category === "实时渲染" ? "GAMES202" : data.category || "",
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(
    path.join(dataDir, "posts.json"),
    JSON.stringify(posts, null, 2),
    "utf8"
  );

  console.log(`Generated data/posts.json (${posts.length} posts)`);
}

generatePosts();
