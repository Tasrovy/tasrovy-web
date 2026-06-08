---
title: "Day4"
date: "2025-03-24"
excerpt: "三角形的光栅化"
category: "GAMES101"
---

三角形的光栅化

![](/images/posts/day4/media/image1.png)

FoV和Aspect ratio

![](/images/posts/day4/media/image2.png)

定义FoV和宽高比能得到定义正交投影

将物体画在屏幕上：光栅化

![](/images/posts/day4/media/image3.png)

![](/images/posts/day4/media/image4.png)

投到屏幕上（视口变换）

光栅

![](/images/posts/day4/media/image5.png)

基础：三角形

![](/images/posts/day4/media/image6.png)

最简单的多边形，可以组成其他多边形

一定是一个平面，易确定内外，易插值实现渐变

采样

![](/images/posts/day4/media/image7.png)

判断

![](/images/posts/day4/media/image8.png)

边界点自行规定即可

优化：包围盒

![](/images/posts/day4/media/image9.png)

![](/images/posts/day4/media/image10.png)

绿色更多，因为人眼对绿色更敏感

![](/images/posts/day4/media/image11.png)

锯齿

![](/images/posts/day4/media/image12.png)