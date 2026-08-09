import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });
const socialImageUrl = "https://raw.githubusercontent.com/Tasrovy/tasrovy-web/main/public/og.png";

export const metadata: Metadata = {
  title: {
    default: "Tasrovy — GAMES101 / GAMES202 课程笔记",
    template: "%s — Tasrovy",
  },
  description: "GAMES101 与 GAMES202 课程笔记、公式整理、作业思路与实现记录",
  openGraph: {
    type: "website",
    title: "Tasrovy — GAMES101 / GAMES202 课程笔记",
    description: "GAMES101 与 GAMES202 课程笔记、公式整理、作业思路与实现记录",
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: "Tasrovy 的 GAMES101 与 GAMES202 课程笔记和作业解法" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasrovy — GAMES101 / GAMES202 课程笔记",
    description: "GAMES101 与 GAMES202 课程笔记、公式整理、作业思路与实现记录",
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
