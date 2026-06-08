/**
 * Fix post dates by reading source file timestamps directly.
 */
const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");
const docDir = "C:/MyWay/GAMES202";
const gamesDir = "C:/MyWay/GAMES101";

function getDate(filePath) {
  return fs.statSync(filePath).mtime.toISOString().split("T")[0];
}

function setPostDate(slug, date) {
  const postPath = path.join(postsDir, slug + ".md");
  if (!fs.existsSync(postPath)) {
    console.log(`  NOT FOUND: ${slug}.md`);
    return;
  }
  let content = fs.readFileSync(postPath, "utf-8");
  const oldDate = content.match(/^date: "([^"]*)"/m)?.[1] || "none";
  content = content.replace(/^date: ".*"/m, `date: "${date}"`);
  fs.writeFileSync(postPath, content, "utf-8");
  console.log(`  ${slug}: ${oldDate} → ${date}`);
}

// documents/ .doc files → post slugs
const docMap = {
  "L0.doc":                              "realtime-intro",
  "Recap.doc":                           "games101-recap",
  "RealtimeEnvironmentMapping.doc":      "realtime-sdf-envlight",
  "RealtimeEnvironmentMapping2.doc":     "realtime-envshadow",
  "RealtimeGlobalIllumination1.doc":     "realtime-sh-gi",
  "RealtimeGlobalIllumination2.doc":     "realtime-lpv",
  "RealtimeGlobalIllumination3.doc":     "realtime-ssdo-rsm",
  "RealTimePhysicallyBasedMaterial1.doc":"realtime-pbr-microfacet",
  "RealTimePhysicallyBasedMaterial2.doc":"realtime-ltc-brdf",
  "RealtimeShadow1.doc":                 "realtime-shadow-mapping",
  "RealtimeShadow2.doc":                 "realtime-pcf-shadow",
  "RTRT1.doc":                            "realtime-rtrt1",
};

// GAMES101 Day dirs → post slugs
const gamesMap = {
  "Day1":  "games101-linear-algebra",
  "Day2":  "games101-env-setup",
  "Day3":  "games101-rasterization",
  "Day4":  "games101-3d-transformation",
  "Day5":  "games101-assignment1-setup",
  "Day6":  "games101-matrix-derivation",
  "Day7":  "games101-projection-debug",
  "Day8":  "games101-assignment2-zbuffer",
  "Day11": "games101-painter-depth",
  "Day12": "games101-blinn-phong",
  "Day13": "games101-barycentric",
  "Day14": "games101-env-mapping",
  "Day15": "games101-geometry",
  "Day16": "games101-assignment3",
  "Day17": "games101-point-clouds",
  "Day18": "games101-loop-subdivision",
  "Day19": "games101-ray-tracing",
  "Day20": "games101-acceleration",
  "Day21": "games101-assignment4-bezier",
  "Day22": "games101-assignment5",
  "Day23": "games101-assignment6-bvh",
  "Day24": "games101-monte-carlo",
  "Day25": "games101-path-tracing",
  "Day26": "games101-material",
  "Day27": "games101-section18",
  "Day28": "games101-imaging",
  "Day29": "games101-light-field",
  "Day30": "games101-color",
  "Day31": "games101-animation",
  "Day32": "games101-velocity-field",
};

// Special: Day9 has Day8.docx (combined with Day8), slugged as day8-day9 → games101-sampling-aa
const specialGamesMap = {
  "Day9": { docx: "Day8.docx", slug: "games101-sampling-aa" },
};

console.log("=== documents/ (.doc files) ===");
for (const [docFile, slug] of Object.entries(docMap)) {
  const srcPath = path.join(docDir, docFile);
  if (fs.existsSync(srcPath)) {
    setPostDate(slug, getDate(srcPath));
  } else {
    console.log(`  SOURCE MISSING: ${srcPath}`);
  }
}

console.log("\n=== GAMES101 (.docx files) ===");
for (const [dayDir, slug] of Object.entries(gamesMap)) {
  const dayPath = path.join(gamesDir, dayDir);
  if (!fs.existsSync(dayPath)) { console.log(`  DIR MISSING: ${dayPath}`); continue; }
  const docxFiles = fs.readdirSync(dayPath).filter(f => /\.docx$/i.test(f));
  if (docxFiles.length === 0) { console.log(`  NO DOCX in ${dayDir}`); continue; }
  const srcPath = path.join(dayPath, docxFiles[0]);
  setPostDate(slug, getDate(srcPath));
}

console.log("\n=== Special GAMES101 ===");
for (const [dayDir, { docx, slug }] of Object.entries(specialGamesMap)) {
  const srcPath = path.join(gamesDir, dayDir, docx);
  if (fs.existsSync(srcPath)) {
    setPostDate(slug, getDate(srcPath));
  } else {
    console.log(`  SOURCE MISSING: ${srcPath}`);
  }
}

console.log("\nDone.");
