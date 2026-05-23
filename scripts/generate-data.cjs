/**
 * Prebuild script: reads Markdown posts and config files,
 * outputs static JSON data for the Worker bundle.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "..", "content", "posts");
const dataDir = path.join(__dirname, "..", "data");

function generatePosts() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const fileNames = fs.readdirSync(contentDir);
  const posts = fileNames
    .filter((fn) => fn.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || "",
        category: data.category || "",
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
