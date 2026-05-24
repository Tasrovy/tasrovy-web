---
title: "GAMES101 三角形的光栅化"
date: "2025-03-23"
excerpt: "三角形的光栅化"
category: "GAMES101"
---

三角形的光栅化

![](/images/posts/games101-rasterization/media/image1.png)

FoV和Aspect ratio

![](/images/posts/games101-rasterization/media/image2.png)

定义FoV和宽高比能得到定义正交投影

将物体画在屏幕上：光栅化

![](/images/posts/games101-rasterization/media/image3.png)

![](/images/posts/games101-rasterization/media/image4.png)

投到屏幕上（视口变换）

光栅

![](/images/posts/games101-rasterization/media/image5.png)

基础：三角形

![](/images/posts/games101-rasterization/media/image6.png)

最简单的多边形，可以组成其他多边形

一定是一个平面，易确定内外，易插值实现渐变

采样

![](/images/posts/games101-rasterization/media/image7.png)

判断

![](/images/posts/games101-rasterization/media/image8.png)

边界点自行规定即可

优化：包围盒

![](/images/posts/games101-rasterization/media/image9.png)

![](/images/posts/games101-rasterization/media/image10.png)

绿色更多，因为人眼对绿色更敏感

![](/images/posts/games101-rasterization/media/image11.png)

锯齿

![](/images/posts/games101-rasterization/media/image12.png)