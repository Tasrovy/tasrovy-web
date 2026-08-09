---
title: "Day15"
date: "2025-04-07"
excerpt: "几何"
category: "GAMES101"
---

几何

![](/images/posts/games101-geometry/media/image1.png)

![](/images/posts/games101-geometry/media/image2.png)

分为隐式几何和显式几何

![](/images/posts/games101-geometry/media/image3.png)

隐式几何:不直接给出点的坐标![](/images/posts/games101-geometry/media/image4.png)

很难直接求出哪些点满足

![](/images/posts/games101-geometry/media/image5.png)

![](/images/posts/games101-geometry/media/image6.png)但容易判断某个点在不在平面上

显式几何

![](/images/posts/games101-geometry/media/image7.png)

可以很简单得到xyz

![](/images/posts/games101-geometry/media/image8.png)

![](/images/posts/games101-geometry/media/image9.png)

但难以判断某个点在不在表面上

![](/images/posts/games101-geometry/media/image10.png)

根据需要选择表示方法

![](/images/posts/games101-geometry/media/image11.png)

![](/images/posts/games101-geometry/media/image12.png)

![](/images/posts/games101-geometry/media/image13.png)

公式比较复杂，实际上也很简单（

![](/images/posts/games101-geometry/media/image14.png)

这种难用数学公式表达（可以用matlab硬画）

CSG

![](/images/posts/games101-geometry/media/image15.png)

![](/images/posts/games101-geometry/media/image16.png)

距离函数融合

SDF

空间中任意一个点到形体的最小距离

外部是正值，内部是负值

得到两个距离函数后融合（感觉是直接相加，正负相加为0）

![](/images/posts/games101-geometry/media/image17.png)

![](/images/posts/games101-geometry/media/image18.png)

![](/images/posts/games101-geometry/media/image19.png)

水平集，插值插到0

可用于医疗数据，物理模拟

![](/images/posts/games101-geometry/media/image20.png)

分形（递归）

![](/images/posts/games101-geometry/media/image21.png)

隐式易求光线的交，虽然显式也不难（