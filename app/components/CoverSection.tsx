'use client';

import { useEffect, useState } from "react";

const NEXT_SECTION_ID = "main-content-section";

export default function CoverSection() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [fadeOutSplash, setFadeOutSplash] = useState(false);
    const [hasTypedOnce, setHasTypedOnce] = useState(false);

    const fullText = "Tasrovy";

    // 加载背景
    useEffect(() => {
        const img = new Image();
        img.src = "/cover.jpg";
        img.onload = () => setImageLoaded(true);
    }, []);

    // 打字机动画
    useEffect(() => {
        if (fadeOutSplash) return;

        let index = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) => {
                const nextChar = fullText[index];
                if (nextChar !== undefined) {
                    index++;
                    return prev + nextChar;
                }
                return prev;
            });

            if (index >= fullText.length) {
                clearInterval(interval);
                setHasTypedOnce(true);
                setTimeout(() => {
                    if (!imageLoaded) {
                        // 循环显示
                        setDisplayText("");
                        setHasTypedOnce(false);
                    }
                }, 500);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [fadeOutSplash, imageLoaded]);

    // 图片加载完成后，确保文字完整显示再淡出
    useEffect(() => {
        if (!imageLoaded) return;

        if (!hasTypedOnce) {
            // 文字还没完整打过一次 → 先显示完整文字
            setDisplayText(fullText);
            const timer = setTimeout(() => setFadeOutSplash(true), 1000);
            return () => clearTimeout(timer);
        } else {
            // 已打完一次 → 直接淡出
            const timer = setTimeout(() => setFadeOutSplash(true), 500);
            return () => clearTimeout(timer);
        }
    }, [imageLoaded, hasTypedOnce]);

    // 下滑箭头
    const handleScrollDown = () => {
        const nextSection = document.getElementById(NEXT_SECTION_ID);
        if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
        else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    };

    const backgroundStyle = imageLoaded
        ? { backgroundImage: "url('/cover.jpg')" }
        : { backgroundColor: "white" };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 背景 */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                    fadeOutSplash ? "opacity-100" : "opacity-0 animate-pulse-slow"
                }`}
                style={backgroundStyle}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* 开屏文字 */}
            {!fadeOutSplash && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text animate-gradient glow tracking-tight">
                        {displayText}
                    </h1>
                </div>
            )}

            {/* 主界面内容 */}
            {fadeOutSplash && (
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                        Welcome
                    </h1>
                </div>
            )}

            {/* 下滑箭头 */}
            {fadeOutSplash && (
                <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                    <button
                        onClick={handleScrollDown}
                        aria-label="Scroll down"
                        className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-transform duration-200 hover:scale-110"
                    >
                        <div className="animate-bounce">
                            <svg
                                className="h-8 w-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            )}
        </section>
    );
}