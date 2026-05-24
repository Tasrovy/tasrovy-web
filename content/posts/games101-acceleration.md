---
title: "Day20"
date: "2025-04-12"
excerpt: "![](/images/posts/day20/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day20/media/image1.png)

![](/images/posts/day20/media/image2.png)

![](/images/posts/day20/media/image3.png)

先找到包围盒，然后生成网格，记录与表面相交的格子

然后![](/images/posts/day20/media/image4.png)

未记录的格子不用考虑相交

只考虑记录内会不会与物体相交

光线在3D的表达直接调API（

![](/images/posts/day20/media/image5.png)

格子数大约要是包围盒物体数\*27

![](/images/posts/day20/media/image6.png)

物体分布极不均匀就不适合画格子

![](/images/posts/day20/media/image7.png)

![](/images/posts/day20/media/image8.png)

左1:八叉树（3D空间中一个点能把空间分成八份）

中：类似与二叉树

右1：二分（不好计算）

![](/images/posts/day20/media/image9.png)

![](/images/posts/day20/media/image10.png)

kd树数据结构

判定根节点相不相交，相交则判断子节点，子节点是叶子节点，则判断光线是否与叶子节点内的物体相交，若不是叶子节点，则作为根节点继续判断是否相交

问题：一个物体会出现在很多叶子节点里面，还需要考虑三角形在不在AABB内

![](/images/posts/day20/media/image11.png)

根据物体划分

![](/images/posts/day20/media/image12.png)

将三角形分成两部分，重新计算包围盒

![](/images/posts/day20/media/image13.png)

![](/images/posts/day20/media/image14.png)

怎么划分？

1：划分较长的一条轴

2：取数量在中间的物体划分

使用快速选择算法

![](/images/posts/day20/media/image15.png)

BVH数据结构

![](/images/posts/day20/media/image16.png)实现代码

![](/images/posts/day20/media/image17.png)

![](/images/posts/day20/media/image18.png)

![](/images/posts/day20/media/image19.png)

![](/images/posts/day20/media/image20.png)

用于描述光照

![](/images/posts/day20/media/image21.png)

![](/images/posts/day20/media/image22.png)

在物理上定义光照

![](/images/posts/day20/media/image23.png)

![](/images/posts/day20/media/image24.png)

Radiant Energy：光源辐射出来的能量，单位是焦耳

![](/images/posts/day20/media/image25.png)

Radiant flux：单位时间内的能量，单位是瓦特，光学上也能叫流明

![](/images/posts/day20/media/image26.png)也可认为是单位时间内一个面接收到光子的数量

![](/images/posts/day20/media/image27.png)

![](/images/posts/day20/media/image28.png)

Radiant Intensity：每个单位立体角的功率，单位是坎德拉

![](/images/posts/day20/media/image29.png)

立体角：一个锥的打到球面上的面积除以半径的平方

![](/images/posts/day20/media/image30.png)

![](/images/posts/day20/media/image31.png)

![](/images/posts/day20/media/image32.png)

![](/images/posts/day20/media/image33.png)

一个光源在一个方向上的亮度

![](/images/posts/day20/media/image34.png)

60w实际是指相当于60w的白炽灯

![](/images/posts/day20/media/image35.png)