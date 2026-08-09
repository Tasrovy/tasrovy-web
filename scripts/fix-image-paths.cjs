/**
 * Fix image paths in markdown files after slug rename.
 * Map: old slug → new slug
 */
const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");
const slugMap = {
  day1: "games101-linear-algebra",
  day2: "games101-env-setup",
  day3: "games101-3d-transformation",
  day4: "games101-rasterization",
  day5: "games101-assignment1-setup",
  day6: "games101-matrix-derivation",
  day7: "games101-projection-debug",
  day8: "games101-assignment2-zbuffer",
  "day8-day9": "games101-sampling-aa",
  day11: "games101-painter-depth",
  day12: "games101-blinn-phong",
  day13: "games101-barycentric",
  day14: "games101-env-mapping",
  day15: "games101-geometry",
  day16: "games101-assignment3",
  day17: "games101-point-clouds",
  day18: "games101-loop-subdivision",
  day19: "games101-ray-tracing",
  day20: "games101-acceleration",
  day21: "games101-assignment4-bezier",
  day22: "games101-assignment5",
  day23: "games101-assignment6-bvh",
  day24: "games101-monte-carlo",
  day25: "games101-path-tracing",
  day26: "games101-material",
  day27: "games101-section18",
  day28: "games101-imaging",
  day29: "games101-light-field",
  day30: "games101-color",
  day31: "games101-animation",
  day32: "games101-velocity-field",
  l0: "realtime-intro",
  recap: "games101-recap",
  realtimeenvironmentmapping: "realtime-sdf-envlight",
  realtimeenvironmentmapping2: "realtime-envshadow",
  realtimeglobalillumination1: "realtime-sh-gi",
  realtimeglobalillumination2: "realtime-lpv",
  realtimeglobalillumination3: "realtime-ssdo-rsm",
  realtimephysicallybasedmaterial1: "realtime-pbr-microfacet",
  realtimephysicallybasedmaterial2: "realtime-ltc-brdf",
  realtimeshadow1: "realtime-shadow-mapping",
  realtimeshadow2: "realtime-pcf-shadow",
};

let fixed = 0;
for (const [oldSlug, newSlug] of Object.entries(slugMap)) {
  const fp = path.join(postsDir, newSlug + ".md");
  if (!fs.existsSync(fp)) {
    console.log(`SKIP ${newSlug}.md — not found`);
    continue;
  }
  let content = fs.readFileSync(fp, "utf-8");
  const oldPattern = new RegExp(`/images/posts/${oldSlug}/`, "g");
  const newContent = content.replace(oldPattern, `/images/posts/${newSlug}/`);
  if (newContent !== content) {
    fs.writeFileSync(fp, newContent, "utf-8");
    console.log(`${newSlug}.md: /${oldSlug}/ → /${newSlug}/`);
    fixed++;
  }
}
console.log(`\nFixed ${fixed} files`);
