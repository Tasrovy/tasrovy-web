---
title: "课程介绍"
date: "2026-02-23"
excerpt: "![](/images/posts/l0/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/l0/media/image1.png)

第一节主要讲学习实时渲染的动机，实时渲染的发展历程，实时渲染的一些里程碑意义的事件

![](/images/posts/l0/media/image2.png)

目前的图形学已经能渲染出照片级别的真实感的图片，可以实现现实中的非常多效果，但是并不能同时保证速度与质量

![](/images/posts/l0/media/image3.png)一帧疯狂动物城需要一个cpu核心渲染10000h

实时渲染需要在合理的近似下找到效果最接近的结果

![](/images/posts/l0/media/image4.png)

实时渲染的历史很长，30年前就出现了3D游戏的渲染![](/images/posts/l0/media/image5.png)

如最终幻想7，CS

20多年前出现可编程渲染管线，使画质大大提升

![](/images/posts/l0/media/image6.png)

如刺客信条2

![](/images/posts/l0/media/image7.png)（其实已经是八九年前）开始追求“stunninggraphics”（不知道是什么）

![](/images/posts/l0/media/image8.png)

也开始拓展到VR和AR，也可以通过实时渲染来制作以前只有离线渲染才能做的影片

视频没提到但现在还有了3DGS ，全称是 3D Gaussian Splatting（三维高斯溅射），通过几百个函数来生成图片，效果好，速度快

实时渲染的里程碑

![](/images/posts/l0/media/image9.png)

二十几年前，可编程的渲染管线出现

![](/images/posts/l0/media/image10.png)

十几年前预计算出现，空间换时间

![](/images/posts/l0/media/image11.png)![](/images/posts/l0/media/image12.png)

十多年前出现实时光线追踪的雏形

![](/images/posts/l0/media/image13.png)用较少的光线去降噪采样得到一个比较好的结果

Homework0照着要求给的流程走就可以正常跑通，不需要额外修改

使用idea调试有概率会出现![](/images/posts/l0/media/image14.png)

也有概率是正常结果![](/images/posts/l0/media/image15.png)

本人不熟悉WebGL，目前不知道原因