'use client';

import { useEffect, useState } from "react";

// 定义下一个内容区域的ID，你需要确保你的下一个Section有这个ID
const NEXT_SECTION_ID = "main-content-section";

export default function CoverSection() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [fadeOutSplash, setFadeOutSplash] = useState(false);
    const fullText = "Tasrovy"; // 这是一个常量

    // 加载背景
    useEffect(() => {
        const img = new Image();
        img.src = "/cover.jpg";
        img.onload = () => setImageLoaded(true);
        img.onerror = () => {
            console.error("Failed to load cover image.");
            setImageLoaded(true);
        };
    }, []);

    // 打字机效果 + 淡出控制
    useEffect(() => {
        // ****** 调试代码开始 ****** (保留此代码，它对于诊断环境问题非常重要)
        console.log(`[DEBUG] Verifying fullText string: "${fullText}"`);
        console.log(`[DEBUG] fullText length reported by JS: ${fullText.length}`);

        let charDetails = [];
        for (let i = 0; i < fullText.length + 2; i++) {
            const char = fullText[i];
            const codePoint = char ? char.codePointAt(0) : "N/A";
            const hexCode = codePoint !== "N/A" ? '0x' + codePoint.toString(16).toUpperCase() : "N/A";
            charDetails.push(`Index ${i}: Char "${char}", CodePoint ${hexCode}`);
        }
        console.log("[DEBUG] fullText character details:");
        charDetails.forEach(detail => console.log(detail));
        // ****** 调试代码结束 ******


        if (!fullText || fullText.length === 0) {
            console.log("Full text is empty, skipping typewriter effect.");
            setFadeOutSplash(true);
            return;
        }

        setDisplayText(""); // 确保从空字符串开始

        console.log(`[EFFECT START] Initializing typewriter for "${fullText}". fullText.length: ${fullText.length}`);

        // 注意：这里我将 index 设为 0。如果你的环境仍然有问题，请考虑暂时使用你之前设为 -1 的版本，
        // 或者在生产环境调试时检查环境问题。但在标准 JS 中，0 是正确的。
        let index = 0;
        let intervalId = setInterval(() => {
            console.log(`[INTERVAL TICK] Current index: ${index}, fullText.length: ${fullText.length}, Condition: ${index < fullText.length}`);

            if (index < fullText.length) {
                setDisplayText((prev) => {
                    const nextChar = fullText[index];

                    if (nextChar !== undefined) { // 增加对 undefined 的检查
                        console.log(`  -> Adding: "${nextChar}", New displayText: "${prev + nextChar}"`);
                        return prev + nextChar;
                    } else {
                        console.warn(`  -> Skipping 'undefined' char at index ${index}. Current displayText: "${prev}"`);
                        return prev;
                    }
                });
                index++;
            } else {
                console.log(`[INTERVAL END] Index ${index} >= fullText.length ${fullText.length}. Clearing interval ${intervalId}.`);
                clearInterval(intervalId);
                setTimeout(() => {
                    console.log("[FADE OUT] Setting fadeOutSplash to true.");
                    setFadeOutSplash(true);
                }, 500);
            }
        }, 150);

        return () => {
            console.log(`[CLEANUP] Clearing interval ${intervalId} during cleanup.`);
            clearInterval(intervalId);
        };
    }, []);

    // 处理点击下滑箭头的函数
    const handleScrollDown = () => {
        // 获取目标元素
        const nextSection = document.getElementById(NEXT_SECTION_ID);
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth' // 平滑滚动
            });
        } else {
            // 如果没有找到下一个 Section，可以滚动整个视口高度
            window.scrollBy({
                top: window.innerHeight, // 滚动一个视口的高度
                behavior: 'smooth'
            });
            console.warn(`Target section with ID "${NEXT_SECTION_ID}" not found. Scrolling by window height.`);
        }
    };


    // 背景样式 + 脉动动画
    const backgroundStyle = imageLoaded
        ? { backgroundImage: "url('/cover.jpg')" }
        : { backgroundColor: "white" };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* 背景 */}
            <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={backgroundStyle}
            >
                {!fadeOutSplash && imageLoaded && (
                    <div className="absolute inset-0 bg-black/50 animate-pulse-slow" />
                )}
                {fadeOutSplash && (
                    <div className="absolute inset-0 bg-black/50" />
                )}
            </div>

            {/* 开屏文字 */}
            {!fadeOutSplash && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-1000">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text animate-gradient glow tracking-tight">
                        {displayText}
                    </h1>
                </div>
            )}

            {/* 主界面内容 (这个会显示在淡出后) */}
            {fadeOutSplash && (
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
                        Welcome
                    </h1>
                    {/* 你可以在这里添加更多主页内容 */}
                </div>
            )}

            {/* 下滑箭头按钮 */}
            {fadeOutSplash && (
                <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                    <button
                        onClick={handleScrollDown}
                        aria-label="Scroll down" // 辅助功能标签
                        className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition-transform duration-200 hover:scale-110" // 添加一些样式和焦点状态
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