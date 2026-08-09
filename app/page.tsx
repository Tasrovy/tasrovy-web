import CoverSection from "./components/CoverSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import ProjectSection from "./components/ProjectSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CoverSection />
      <div id="main-content-section" className="relative z-10 scroll-mt-16">
        <ProjectSection />
        <BlogSection />
        <AboutSection />
      </div>
    </div>
  );
}
