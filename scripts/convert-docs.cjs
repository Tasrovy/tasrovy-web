/**
 * Batch convert .doc and .docx files to markdown for blog posts,
 * extracting embedded images alongside.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const WordExtractor = require("C:/Users/manin/AppData/Roaming/npm/node_modules/word-extractor");
const extractor = new WordExtractor();

const postsDir = path.join(__dirname, "..", "content", "posts");
const mediaDir = path.join(__dirname, "..", "public", "images", "posts");

const PANDOC = '"C:/Program Files/Pandoc/pandoc.exe"';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getFileDate(filePath) {
  const d = fs.statSync(filePath).mtime;
  return d.toISOString().split("T")[0];
}

function makeSlug(name) {
  let slug = name.replace(/\.(doc|docx)$/i, "");
  slug = slug.replace(/[^a-zA-Z0-9一-鿿_-]/g, "-");
  slug = slug.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return slug.toLowerCase();
}

function makeFrontmatter(title, date, excerpt, category) {
  const excerptStr = excerpt
    ? excerpt.replace(/"/g, '\\"').slice(0, 120)
    : "";
  return `---
title: "${title}"
date: "${date}"
excerpt: "${excerptStr}"
category: "${category}"
---
`;
}

async function convertDocx(filePath, category) {
  const baseName = path.basename(filePath);
  const slug = makeSlug(baseName);
  const title = baseName.replace(/\.docx$/i, "");
  const date = getFileDate(filePath);

  // Use pandoc with media extraction for .docx
  const postMediaDir = path.join(mediaDir, slug);
  ensureDir(postMediaDir);

  // Pass a simple relative path for extract-media to get clean references
  const cmd = `${PANDOC} "${filePath}" -t gfm --wrap=none --extract-media="${postMediaDir}" 2>&1`;
  let content = execSync(cmd, { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 });

  // Fix image paths: pandoc produces either markdown ![]() or HTML <img> tags
  // with full absolute paths. Normalize them to site-relative URLs.
  // 1. Fix markdown-style: ![alt](<full-path>)
  content = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      const imgFile = path.basename(src);
      return `![${alt}](/images/posts/${slug}/media/${imgFile})`;
    }
  );
  // 2. Fix HTML <img> tags
  content = content.replace(
    /<img[^>]+src="([^"]+)"[^>]*\/?>/gi,
    (match, src) => {
      const imgFile = path.basename(src);
      return `![](/images/posts/${slug}/media/${imgFile})`;
    }
  );

  content = content.replace(/\n{4,}/g, "\n\n\n").trim();

  const firstLine = content.split("\n").find((l) => l.trim().length > 0) || "";
  const excerpt = firstLine.trim().replace(/^#+\s*/, "").slice(0, 100);
  const md = makeFrontmatter(title, date, excerpt, category) + "\n" + content;

  const outPath = path.join(postsDir, slug + ".md");
  if (fs.existsSync(outPath)) {
    // handle duplicate: use parent folder name as suffix
    const dirName = path.basename(path.dirname(filePath)).toLowerCase();
    const altPath = path.join(postsDir, slug + "-" + dirName + ".md");
    fs.writeFileSync(altPath, md, "utf-8");
    console.log(`  -> ${slug}-${dirName}.md (${content.length} chars)`);
  } else {
    fs.writeFileSync(outPath, md, "utf-8");
    console.log(`  -> ${slug}.md (${content.length} chars)`);
  }
}

async function convertDoc(filePath, category) {
  const baseName = path.basename(filePath);
  const slug = makeSlug(baseName);
  const title = baseName.replace(/\.doc$/i, "");
  const date = getFileDate(filePath);

  // word-extractor for old .doc (text only, no image extraction)
  const doc = await extractor.extract(filePath);
  let content = doc.getBody();
  content = content.replace(/\n{4,}/g, "\n\n\n").trim();

  const firstLine = content.split("\n").find((l) => l.trim().length > 0) || "";
  const excerpt = firstLine.trim().replace(/^#+\s*/, "").slice(0, 100);
  const md = makeFrontmatter(title, date, excerpt, category) + "\n" + content;

  const outPath = path.join(postsDir, slug + ".md");
  fs.writeFileSync(outPath, md, "utf-8");
  console.log(`  -> ${slug}.md (${content.length} chars)`);
}

async function main() {
  ensureDir(postsDir);
  ensureDir(mediaDir);

  // 1. Convert documents/ .doc files
  const docDir = path.join(__dirname, "..", "documents");
  if (fs.existsSync(docDir)) {
    const docFiles = fs.readdirSync(docDir).filter((f) => /\.doc$/i.test(f));
    console.log(`\n=== Converting ${docFiles.length} .doc files from documents/ ===`);
    for (const f of docFiles) {
      await convertDoc(path.join(docDir, f), "实时渲染");
    }
  }

  // 2. Convert GAMES101 .docx files
  const gamesDir = "C:/MyWay/GAMES101";
  if (fs.existsSync(gamesDir)) {
    const dayDirs = fs.readdirSync(gamesDir)
      .filter((d) => /^Day\d+$/i.test(d))
      .sort((a, b) => {
        return parseInt(a.replace(/Day/i, ""), 10) - parseInt(b.replace(/Day/i, ""), 10);
      });
    console.log(`\n=== Converting ${dayDirs.length} .docx files from GAMES101 ===`);
    for (const day of dayDirs) {
      const dayPath = path.join(gamesDir, day);
      const docxFiles = fs.readdirSync(dayPath).filter((f) => /\.docx?$/i.test(f));
      for (const f of docxFiles) {
        await convertDocx(path.join(dayPath, f), "GAMES101");
      }
    }
  }

  console.log("\n=== Done ===");
}

main().catch(console.error);
