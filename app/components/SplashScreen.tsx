'use client';

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [displayText, setDisplayText] = useState(""); // 打字机显示文字
  const [fadeOut, setFadeOut] = useState(false);      // 是否开始淡出
  const fullText = "Tasrovy";

  useEffect(() => {
    let index = 0;

    // 每个字符出现间隔
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        // 字母显示完后 0.5 秒开始淡出
        setTimeout(() => setFadeOut(true), 500);
      }
    }, 150); // 每个字符 150ms，可调节显示速度

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
        <h1
            className={`text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text animate-gradient glow tracking-tight transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          {displayText}
        </h1>
      </div>
  );
}