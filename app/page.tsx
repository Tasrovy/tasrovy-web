import CoverSection from "./components/CoverSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CoverSection />
      <main className="relative z-10">
        <AboutSection />
        <BlogSection />
      </main>
    </div>
  );
}