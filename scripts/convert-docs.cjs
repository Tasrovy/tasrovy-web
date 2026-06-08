/**
 * Batch convert .doc and .docx files to markdown for blog posts,
 * extracting embedded images alongside.
 * - .doc files: convert to .docx via LibreOffice first, then pandoc
 * - .docx files: convert directly via pandoc
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const WordExtractor = require("C:/Users/manin/AppData/Roaming/npm/node_modules/word-extractor");
const extractor = new WordExtractor();

const postsDir = path.join(__dirname, "..", "content", "posts");
const mediaDir = path.join(__dirname, "..", "public", "images", "posts");
const tmpDir = path.join(__dirname, "..", ".tmp-conv");

const PANDOC = '"C:/Program Files/Pandoc/pandoc.exe"';
const SOFFICE = '"C:/Program Files/LibreOffice/program/soffice.com"';

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

function convertDocxToMd(filePath, slug, category, dateOverride) {
  const baseName = path.basename(filePath);
  const title = baseName.replace(/\.docx?$/i, "");
  const date = dateOverride || getFileDate(filePath);

  // Use pandoc with media extraction
  const postMediaDir = path.join(mediaDir, slug);
  ensureDir(postMediaDir);

  const cmd = `${PANDOC} "${filePath}" -t gfm --wrap=none --extract-media="${postMediaDir}" 2>&1`;
  let content = execSync(cmd, { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 });

  // Fix markdown image paths
  content = content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      const imgFile = path.basename(src);
      return `![${alt}](/images/posts/${slug}/media/${imgFile})`;
    }
  );
  // Fix HTML <img> tags
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
    const dirName = path.basename(path.dirname(filePath)).toLowerCase();
    const altPath = path.join(postsDir, slug + "-" + dirName + ".md");
    fs.writeFileSync(altPath, md, "utf-8");
    console.log(`  -> ${slug}-${dirName}.md (${content.length} chars)`);
  } else {
    fs.writeFileSync(outPath, md, "utf-8");
    console.log(`  -> ${slug}.md (${content.length} chars)`);
  }
}

async function main() {
  ensureDir(postsDir);
  ensureDir(mediaDir);
  ensureDir(tmpDir);

  // Clean existing converted posts (keep any manually written ones)
  // We'll regenerate all doc-based posts

  // Step 1: Convert documents/ .doc files → .docx → md
  const docDir = path.join(__dirname, "..", "documents");
  if (fs.existsSync(docDir)) {
    const docFiles = fs.readdirSync(docDir).filter((f) => /\.doc$/i.test(f));
    console.log(`\n=== Converting ${docFiles.length} .doc files from documents/ ===`);

    for (const f of docFiles) {
      const srcPath = path.join(docDir, f);
      const slug = makeSlug(f);

      // Clean old slug outputs
      const oldMd = path.join(postsDir, slug + ".md");
      if (fs.existsSync(oldMd)) fs.unlinkSync(oldMd);

      // Convert .doc → .docx via LibreOffice
      console.log(`  Converting ${f} to docx...`);
      execSync(
        `${SOFFICE} --headless --convert-to docx --outdir "${tmpDir}" "${srcPath}"`,
        { encoding: "utf-8", timeout: 60000 }
      );

      // Find the generated .docx
      const docxName = f.replace(/\.doc$/i, ".docx");
      const docxPath = path.join(tmpDir, docxName);
      if (!fs.existsSync(docxPath)) {
        console.log(`  ERROR: ${docxName} not generated!`);
        continue;
      }

      // Convert .docx → md with pandoc + media extract
      const originalDate = getFileDate(srcPath);
      convertDocxToMd(docxPath, slug, "实时渲染", originalDate);

      // Clean up temp .docx
      fs.unlinkSync(docxPath);
    }
  }

  // Step 2: Convert GAMES101 .docx files → md
  const gamesDir = "C:/MyWay/GAMES101";
  if (fs.existsSync(gamesDir)) {
    // Clean old GAMES101 slug outputs (only day-prefixed files)
    const existingFiles = fs.readdirSync(postsDir);
    for (const f of existingFiles) {
      if (f.startsWith("day")) {
        fs.unlinkSync(path.join(postsDir, f));
      }
    }

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
        const fp = path.join(dayPath, f);
        const slug = makeSlug(f);
        convertDocxToMd(fp, slug, "GAMES101");
      }
    }
  }

  // Cleanup
  if (fs.existsSync(tmpDir)) {
    const remaining = fs.readdirSync(tmpDir);
    if (remaining.length === 0) fs.rmdirSync(tmpDir);
  }

  console.log("\n=== Done ===");
}

main().catch(console.error);
