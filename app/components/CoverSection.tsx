'use client';

import { useEffect, useState } from "react";

const NEXT_SECTION_ID = "main-content-section";
const FULL_TEXT = "Tasrovy";

export default function CoverSection() {
    const [imageLoaded, setImageLoaded] = useState(false);
    // 使用游标来控制打字进度，而不是拼接字符串
    const [typeIndex, setTypeIndex] = useState(0);
    // 控制是否开始淡出开屏
    const [fadeOutSplash, setFadeOutSplash] = useState(false);
    // 控制是否彻底移除开屏 DOM（动画结束后）
    const [removeSplash, setRemoveSplash] = useState(false);

    // 1. 加载背景
    useEffect(() => {
        const img = new Image();
        img.src = "/cover.jpg";
        img.onload = () => setImageLoaded(true);
    }, []);

    // 2. 打字机核心逻辑 (使用游标驱动)
    useEffect(() => {
        if (fadeOutSplash) return;

        let timer: NodeJS.Timeout;

        if (typeIndex < FULL_TEXT.length) {
            // 正在打字
            timer = setTimeout(() => {
                setTypeIndex((prev) => prev + 1);
            }, 150);
        } else {
            // 打字完成一轮
            if (imageLoaded) {
                // 如果图片已经加载完，等待半秒后触发淡出
                timer = setTimeout(() => {
                    setFadeOutSplash(true);
                }, 500);
            } else {
                // 如果图片没加载完，等待半秒后清空文字，重新打字 (循环)
                timer = setTimeout(() => {
                    setTypeIndex(0);
                }, 500);
            }
        }

        return () => clearTimeout(timer);
    }, [typeIndex, imageLoaded, fadeOutSplash]);

    // 3. 处理淡出动画结束后的 DOM 卸载
    useEffect(() => {
        if (fadeOutSplash) {
            const timer = setTimeout(() => {
                setRemoveSplash(true);
            }, 1000); // 对应 duration-1000
            return () => clearTimeout(timer);
        }
    }, [fadeOutSplash]);

    // 下滑箭头
    const handleScrollDown = () => {
        const nextSection = document.getElementById(NEXT_SECTION_ID);
        if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
        else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    };

    const backgroundStyle = imageLoaded
        ? { backgroundImage: "url('/cover.jpg')" }
        : { backgroundColor: "black" }; // 建议默认黑底，防止闪白

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 背景 */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                    fadeOutSplash ? "opacity-100" : "opacity-0"
                }`}
                style={backgroundStyle}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* 开屏文字 (修复动画失效问题) */}
            {!removeSplash && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000 ease-in-out ${
                        fadeOutSplash ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text animate-gradient glow tracking-tight">
                        {FULL_TEXT.substring(0, typeIndex)}
                        {/* 闪烁的光标可以增加细节体验 */}
                        <span className="animate-pulse text-transparent bg-clip-text animate-gradient glow">|</span>
                    </h1>
                </div>
            )}

            {/* 主界面内容 */}
            <div className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white transition-opacity duration-1000 delay-500 ${
                fadeOutSplash ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
                <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                    Welcome
                </h1>
            </div>

            {/* 下滑箭头 */}
            <div className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-1000 delay-700 ${
                fadeOutSplash ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
                <button
                    onClick={handleScrollDown}
                    aria-label="Scroll down"
                    className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-transform duration-200 hover:scale-110"
                >
                    <div className="animate-bounce">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </button>
            </div>
        </section>
    );
}