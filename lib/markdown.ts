function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(url: string): string {
  const trimmed = url.trim();
  if (!/^(https?:\/\/|mailto:|\/|#)/i.test(trimmed)) return "#";
  return escapeHtml(trimmed);
}

function inlineMarkdown(text: string): string {
  let result = escapeHtml(text);

  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => (
    `<img src="${safeUrl(url)}" alt="${alt}" loading="lazy" decoding="async" />`
  ));
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => (
    `<a href="${safeUrl(url)}">${label}</a>`
  ));
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  return result;
}

function isBlockStart(line: string): boolean {
  return /^(#{1,6}\s+|```|>\s?|[-*+]\s+|\d+\.\s+|\|.*\|\s*$|(?:---|\*\*\*|___)\s*$)/.test(line);
}

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const cells = tableCells(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export type MarkdownHeading = { id: string; level: number; text: string };

function plainHeadingText(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

export function extractHeadings(markdown: string): MarkdownHeading[] {
  let inCodeBlock = false;
  let headingIndex = 0;
  const headings: MarkdownHeading[] = [];

  for (const line of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    headings.push({ id: `section-${headingIndex}`, level: match[1].length, text: plainHeadingText(match[2]) });
    headingIndex += 1;
  }

  return headings;
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const html: string[] = [];
  let index = 0;
  let headingIndex = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```\s*([\w-]+)?\s*$/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      const languageClass = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : "";
      html.push(`<pre><code${languageClass}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const id = level === 2 || level === 3 ? ` id="section-${headingIndex++}"` : "";
      html.push(`<h${level}${id}>${inlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      html.push("<hr />");
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote><p>${inlineMarkdown(quote.join(" "))}</p></blockquote>`);
      continue;
    }

    const listMatch = line.match(/^([-*+]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const tag = ordered ? "ol" : "ul";
      const items: string[] = [];
      const itemPattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*+]\s+(.+)$/;

      while (index < lines.length) {
        const item = lines[index].match(itemPattern);
        if (!item) break;
        items.push(`<li>${inlineMarkdown(item[1])}</li>`);
        index += 1;
        while (index < lines.length && !lines[index].trim()) index += 1;
      }

      html.push(`<${tag}>${items.join("")}</${tag}>`);
      continue;
    }

    if (
      /^\|.*\|\s*$/.test(line) &&
      index + 1 < lines.length &&
      /^\|.*\|\s*$/.test(lines[index + 1]) &&
      isTableSeparator(lines[index + 1])
    ) {
      const headers = tableCells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && /^\|.*\|\s*$/.test(lines[index])) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }

      html.push(
        `<div class="table-scroll"><table><thead><tr>${headers
          .map((cell) => `<th>${inlineMarkdown(cell)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${inlineMarkdown(row[cellIndex] ?? "")}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`,
      );
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}
