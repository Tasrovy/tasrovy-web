import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { extractHeadings, renderMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const currentIndex = posts.findIndex((item) => item.slug === slug);
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const currentMeta = posts[currentIndex];
  const headings = extractHeadings(post.content);
  const htmlContent = renderMarkdown(post.content);

  return (
    <div className="min-h-screen bg-white pt-16 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-slate-200 px-4 py-16 dark:border-slate-800 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/blog" className="font-mono text-xs uppercase tracking-[0.2em] text-blue-700 transition hover:text-blue-900 dark:text-cyan-300 dark:hover:text-cyan-200">← 返回文章列表</Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 dark:bg-cyan-300/10 dark:text-cyan-300">{post.category || "未分类"}</span>
            <time dateTime={post.date} className="text-slate-500">{post.date}</time>
            {currentMeta && <span className="text-slate-500">· {currentMeta.readingMinutes} 分钟阅读</span>}
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.035em] md:text-6xl">{post.title}</h1>
          {post.excerpt && <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">{post.excerpt}</p>}
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:py-20">
        <article className="min-w-0">
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <nav aria-label="上一篇和下一篇" className="mt-20 grid gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-2">
            {olderPost ? (
              <Link href={`/blog/${olderPost.slug}`} className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-400 dark:border-slate-800 dark:hover:border-cyan-400">
                <span className="font-mono text-xs text-slate-500">上一篇</span><span className="mt-2 block font-semibold">← {olderPost.title}</span>
              </Link>
            ) : <span />}
            {newerPost && (
              <Link href={`/blog/${newerPost.slug}`} className="rounded-2xl border border-slate-200 p-5 text-right transition hover:border-blue-400 dark:border-slate-800 dark:hover:border-cyan-400">
                <span className="font-mono text-xs text-slate-500">下一篇</span><span className="mt-2 block font-semibold">{newerPost.title} →</span>
              </Link>
            )}
          </nav>
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <nav aria-label="文章目录" className="sticky top-24 border-l border-slate-200 pl-5 dark:border-slate-800">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">On this page</p>
              <ol className="space-y-3 text-sm leading-5 text-slate-500">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
                    <a href={`#${heading.id}`} className="transition hover:text-blue-700 dark:hover:text-cyan-300">{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </main>
    </div>
  );
}
