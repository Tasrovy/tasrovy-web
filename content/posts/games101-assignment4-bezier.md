---
title: "Day21"
date: "2025-04-13"
excerpt: "今天先看看作业四，代码在bezier.cpp"
category: "GAMES101"
---

今天先看看作业四，代码在bezier.cpp

首先实现得到贝塞尔曲线中指定t值的点

![](/images/posts/games101-assignment4-bezier/media/image1.png)

也可以考虑递归或者直接公式计算

然后绘制

![](/images/posts/games101-assignment4-bezier/media/image2.png)

但这样抗锯齿效果不好

![](/images/posts/games101-assignment4-bezier/media/image3.png)

可以考虑的抗锯齿

![](/images/posts/games101-assignment4-bezier/media/image4.png)

首先得到点最近的x和y值

然后得到在屏幕内部的下x，y周围带自己九个点，计算其与原来点的距离，计算平滑度（选用一个在0处取1，距离越远的值越小，不能太大也不能太小），更新周围颜色

![](/images/posts/games101-assignment4-bezier/media/image5.png)

平滑度选择不好可能会

![](/images/posts/games101-assignment4-bezier/media/image6.png)

![](/images/posts/games101-assignment4-bezier/media/image7.png)

像粉笔（？