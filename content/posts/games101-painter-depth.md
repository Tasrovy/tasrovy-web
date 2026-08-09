---
title: "Day11"
date: "2025-03-31"
excerpt: "![](/images/posts/games101-painter-depth/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-painter-depth/media/image1.png)

画家算法（油画），先画远处再画近处

![](/images/posts/games101-painter-depth/media/image2.png)

互相遮挡时不能使用画家算法

![](/images/posts/games101-painter-depth/media/image3.png)

需要进行深度缓冲

![](/images/posts/games101-painter-depth/media/image4.png)

渲染/深度缓存

![](/images/posts/games101-painter-depth/media/image5.png)

深度缓存算法

![](/images/posts/games101-painter-depth/media/image6.png)

时间复杂度O（n）

![](/images/posts/games101-painter-depth/media/image7.png)

并没有实现排序，只是记录最小值，和顺序无关（两个浮点数几乎不可能相等）

着色

![](/images/posts/games101-painter-depth/media/image8.png)

Blinn phong反射模型

![](/images/posts/games101-painter-depth/media/image9.png)

高光，漫反射，环境光照

![](/images/posts/games101-painter-depth/media/image10.png)

Local（局部）着色不会考虑阴影

![](/images/posts/games101-painter-depth/media/image11.png)

![](/images/posts/games101-painter-depth/media/image12.png)

![](/images/posts/games101-painter-depth/media/image13.png)

光能量的多少与距离的平方成反比（球体的表面积）

耳机没电了，剩下的明天补

![](/images/posts/games101-painter-depth/media/image14.png)

散射光计算公式，向四周发散，与观测位置无关