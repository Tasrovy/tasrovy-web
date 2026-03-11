'use client';

import { useEffect, useState } from "react";

const NEXT_SECTION_ID = "main-content-section";
const FULL_TEXT = "Tasrovy";

export default function CoverSection() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [typeIndex, setTypeIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [fadeOutSplash, setFadeOutSplash] = useState(false);
    const [removeSplash, setRemoveSplash] = useState(false);

    // 🔥 新增：用于存储页面滑动的模糊度
    const [scrollBlur, setScrollBlur] = useState(0);

    // 1. 加载背景
    useEffect(() => {
        const img = new Image();
        img.src = "/cover.jpg";
        img.onload = () => setImageLoaded(true);
    }, []);

    // 🔥 2. 新增：监听窗口滑动，动态计算模糊度
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // 算法：每向下滑动 30px，模糊度增加 1px，最大模糊限制为 20px
            const blurValue = Math.min(scrollY / 30, 20);

            // 可选：为了让下滑时文字更清晰，我们也可以顺便算一个动态暗度
            // 这里就不加暗度了，纯模糊效果
            setScrollBlur(blurValue);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 3. 模拟真实打字机的核心逻辑
    useEffect(() => {
        if (fadeOutSplash) return;

        let timer: NodeJS.Timeout;

        if (typeIndex === 0 && !isTyping) {
            timer = setTimeout(() => setIsTyping(true), 800);
        } else if (isTyping && typeIndex < FULL_TEXT.length) {
            const randomTypeSpeed = Math.floor(Math.random() * 150) + 100;
            timer = setTimeout(() => {
                setTypeIndex((prev) => prev + 1);
            }, randomTypeSpeed);
        } else if (typeIndex >= FULL_TEXT.length) {
            if (isTyping) {
                setIsTyping(false);
                return;
            }

            if (imageLoaded) {
                timer = setTimeout(() => setFadeOutSplash(true), 800);
            } else {
                timer = setTimeout(() => setTypeIndex(0), 1000);
            }
        }

        return () => clearTimeout(timer);
    }, [typeIndex, isTyping, imageLoaded, fadeOutSplash]);

    // 4. 处理淡出动画结束后的 DOM 卸载
    useEffect(() => {
        if (fadeOutSplash) {
            const timer = setTimeout(() => setRemoveSplash(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [fadeOutSplash]);

    const handleScrollDown = () => {
        const nextSection = document.getElementById(NEXT_SECTION_ID);
        if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
        else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    };

    const backgroundStyle = imageLoaded
        ? { backgroundImage: "url('/cover.jpg')" }
        : { backgroundColor: "black" };

    return (
        // 注意：去掉了 overflow-hidden，否则会影响页面其他部分的滚动视觉
        <section className="relative h-screen w-full">

            {/* 🔥 背景 (修改点：absolute -> fixed，增加 z-[-1]) */}
            <div
                className={`fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                    fadeOutSplash ? "opacity-100" : "opacity-0"
                }`}
                style={backgroundStyle}
            >
                {/* 固定的基础暗色遮罩（保证字能看清） */}
                <div className="absolute inset-0" />

                {/* 🔥 动态模糊遮罩层 (使用 backdrop-filter 性能更好) */}
                <div
                    className="absolute inset-0"
                    style={{
                        backdropFilter: `blur(${scrollBlur}px)`,
                        WebkitBackdropFilter: `blur(${scrollBlur}px)`, // 兼容苹果 Safari
                    }}
                />
            </div>

            {/* 开屏文字 */}
            {!removeSplash && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000 ease-in-out ${
                        fadeOutSplash ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text animate-gradient glow tracking-tight flex items-center py-4 md:py-6">
                        {FULL_TEXT.substring(0, typeIndex)}

                        <span
                            className={`ml-1 text-[0.8em] text-black dark:text-white font-light ${
                                isTyping ? "opacity-100" : "animate-blink"
                            }`}
                        >
                        |
                        </span>
                    </h1>
                </div>
            )}

            {/* 主界面首屏内容 */}
            <div
                className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white transition-opacity duration-1000 delay-500 ${
                    fadeOutSplash ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}>
                <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
                    Welcome
                </h1>
            </div>

            {/* 下滑箭头 */}
            <div
                className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-1000 delay-700 ${
                    fadeOutSplash ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}>
                <button
                    onClick={handleScrollDown}
                    aria-label="Scroll down"
                    className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-transform duration-200 hover:scale-110"
                >
                    <div className="animate-bounce">
                        <svg className="h-8 w-8 text-gray-300 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    );
}