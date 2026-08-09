import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });
const socialImageUrl = "https://raw.githubusercontent.com/Tasrovy/tasrovy-web/main/public/og.png";

export const metadata: Metadata = {
  title: {
    default: "Tasrovy — 实时渲染与图形学",
    template: "%s — Tasrovy",
  },
  description: "实时渲染、图形学工程与 TasrovyRenderer 开发记录",
  openGraph: {
    type: "website",
    title: "Tasrovy — 实时渲染与图形学",
    description: "实时渲染、图形学工程与 TasrovyRenderer 开发记录",
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: "TasrovyRenderer real-time rendering pipeline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasrovy — 实时渲染与图形学",
    description: "实时渲染、图形学工程与 TasrovyRenderer 开发记录",
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
