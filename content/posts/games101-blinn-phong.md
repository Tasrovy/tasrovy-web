---
title: "GAMES101 高光与Blinn-Phong"
date: "2025-03-31"
excerpt: "![](/images/posts/games101-blinn-phong/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-blinn-phong/media/image1.png)

高光相

![](/images/posts/games101-blinn-phong/media/image2.png)

![](/images/posts/games101-blinn-phong/media/image3.png)

考虑半程向量与法线的夹角

因为更好计算

P次方是为了避免高光区域过大，控制高光大小

![](/images/posts/games101-blinn-phong/media/image4.png)

通常是100到200

环境光照

![](/images/posts/games101-blinn-phong/media/image5.png)

假设环境光是定值

![](/images/posts/games101-blinn-phong/media/image6.png)

各项相加

![](/images/posts/games101-blinn-phong/media/image7.png)

![](/images/posts/games101-blinn-phong/media/image8.png)

![](/images/posts/games101-blinn-phong/media/image9.png)

三种着色频率

![](/images/posts/games101-blinn-phong/media/image10.png)

求逐顶点的法线

![](/images/posts/games101-blinn-phong/media/image11.png)

逐像素法线需要重心坐标

实时渲染管线

![](/images/posts/games101-blinn-phong/media/image12.png)

![](/images/posts/games101-blinn-phong/media/image13.png)

vertexShader和fragmentShader是可编程的

![](/images/posts/games101-blinn-phong/media/image14.png)

OpenGL的fragmentShader例子

![](/images/posts/games101-blinn-phong/media/image15.png)

纹理

![](/images/posts/games101-blinn-phong/media/image16.png)

![](/images/posts/games101-blinn-phong/media/image17.png)

实际上是一张图

![](/images/posts/games101-blinn-phong/media/image18.png)

![](/images/posts/games101-blinn-phong/media/image19.png)

u和v都在0到1之间

![](/images/posts/games101-blinn-phong/media/image20.png)

瓦片