"use client";

import { useEffect, useState } from "react";

const NEXT_SECTION_ID = "main-content-section";
const FULL_TEXT = "Tasrovy";
const STORAGE_KEY = "tasrovy_splash_seen";
const IMAGE_LOAD_TIMEOUT_MS = 4_000;

export default function CoverSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSettled, setImageSettled] = useState(false);
  const [typeIndex, setTypeIndex] = useState(0);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashRemoved, setSplashRemoved] = useState(false);
  const [scrollBlur, setScrollBlur] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let shouldSkip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      try {
        shouldSkip ||= Boolean(window.localStorage.getItem(STORAGE_KEY));
      } catch {
        // Storage can be unavailable in private or restricted browsing modes.
      }

      if (shouldSkip) {
        setSplashVisible(false);
        setSplashRemoved(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const image = new Image();
    let settled = false;

    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      setImageLoaded(loaded);
      setImageSettled(true);
    };

    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = "/cover.jpg";

    const timeout = window.setTimeout(() => finish(false), IMAGE_LOAD_TIMEOUT_MS);
    return () => {
      settled = true;
      image.onload = null;
      image.onerror = null;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollBlur(Math.min(window.scrollY / 30, 20));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!splashVisible || typeIndex >= FULL_TEXT.length) return;

    const delay = typeIndex === 0 ? 800 : Math.floor(Math.random() * 150) + 100;
    const timer = window.setTimeout(() => setTypeIndex((index) => index + 1), delay);
    return () => window.clearTimeout(timer);
  }, [splashVisible, typeIndex]);

  useEffect(() => {
    if (!splashVisible || !imageSettled || typeIndex < FULL_TEXT.length) return;

    const timer = window.setTimeout(() => setSplashVisible(false), 800);
    return () => window.clearTimeout(timer);
  }, [imageSettled, splashVisible, typeIndex]);

  useEffect(() => {
    if (splashVisible || splashRemoved) return;

    const timer = window.setTimeout(() => {
      setSplashRemoved(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // The animation still completes when storage is unavailable.
      }
    }, 1_000);

    return () => window.clearTimeout(timer);
  }, [splashRemoved, splashVisible]);

  const handleScrollDown = () => {
    document.getElementById(NEXT_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
  };

  const isTyping = splashVisible && typeIndex < FULL_TEXT.length;

  return (
    <section className="relative h-screen w-full" aria-label="Introduction">
      <div
        className={`fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          splashVisible ? "opacity-0" : "opacity-100"
        }`}
        style={imageLoaded ? { backgroundImage: "url('/cover.jpg')" } : { backgroundColor: "black" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${scrollBlur}px)`,
            WebkitBackdropFilter: `blur(${scrollBlur}px)`,
          }}
        />
      </div>

      {!splashRemoved && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out dark:bg-black ${
            splashVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!splashVisible}
        >
          <h1 className="animate-gradient glow flex items-center bg-clip-text py-4 text-6xl font-extrabold tracking-tight text-transparent md:py-6 md:text-8xl">
            {FULL_TEXT.substring(0, typeIndex)}
            <span
              className={`ml-1 text-[0.8em] font-light text-black dark:text-white ${
                isTyping ? "opacity-100" : "animate-blink"
              }`}
              aria-hidden="true"
            >
              |
            </span>
          </h1>
        </div>
      )}

      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white transition-opacity delay-500 duration-1000 ${
          splashVisible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="mb-6 text-4xl font-bold drop-shadow-md md:text-6xl lg:text-7xl">Welcome</h1>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity delay-700 duration-1000 ${
          splashVisible ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll to the latest posts"
          className="rounded-full p-2 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="animate-bounce block" aria-hidden="true">
            <svg className="h-8 w-8 text-gray-200 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
