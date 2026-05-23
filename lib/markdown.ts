function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeUrl(url: string): string {
  const allowed = /^(https?:\/\/|mailto:|\/|#)/;
  const trimmed = url.trim();
  if (!allowed.test(trimmed)) return "#";
  return trimmed;
}

export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
        codeBuffer = [];
      }
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      html.push("</p><p>");
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = inlineMarkdown(headingMatch[2]);
      html.push(`</p><h${level}>${text}</h${level}><p>`);
      continue;
    }

    // Blockquote
    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      html.push(`</p><blockquote>${inlineMarkdown(quoteMatch[1])}</blockquote><p>`);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      html.push(`</p><li>${inlineMarkdown(ulMatch[1])}</li><p>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      html.push(`</p><li>${inlineMarkdown(olMatch[1])}</li><p>`);
      continue;
    }

    // Table
    const tableMatch = line.match(/^\|(.+)\|$/);
    if (tableMatch) {
      const cells = tableMatch[1].split("|").map((c) => c.trim());
      if (line.includes("---")) continue; // skip separator row
      html.push(`<td>${cells.map((c) => inlineMarkdown(c)).join("</td><td>")}</td>`);
      continue;
    }

    html.push(inlineMarkdown(line) + " ");
  }

  if (codeBuffer.length > 0) {
    html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
  }

  let result = html.join("\n");

  // Wrap in paragraphs and clean up
  result = result.replace(/<\/p><p><\/p><p>/g, "</p><p>");
  result = result.replace(/^<p><\/p>/, "");
  result = result.replace(/<\/p><p>$/, "");

  if (!result.startsWith("<")) {
    result = `<p>${result}`;
  }
  if (!result.endsWith(">")) {
    result += "</p>";
  }

  return `<div class="prose dark:prose-invert max-w-none">${result}</div>`;
}

function inlineMarkdown(text: string): string {
  let result = escapeHtml(text);

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Italic
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  result = result.replace(/`(.+?)`/g, "<code>$1</code>");

  // Links
  result = result.replace(
    /\[(.+?)\]\((.+?)\)/g,
    (_, label, url) => `<a href="${escapeUrl(url)}" class="text-blue-600 dark:text-blue-400 underline">${label}</a>`
  );

  return result;
}
