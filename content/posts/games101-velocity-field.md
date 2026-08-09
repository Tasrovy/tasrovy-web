---
title: "Day32"
date: "2025-04-26"
excerpt: "![](/images/posts/games101-velocity-field/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-velocity-field/media/image1.png)

![](/images/posts/games101-velocity-field/media/image2.png)

速度场，通过位置和时间就能查询到速度

![](/images/posts/games101-velocity-field/media/image3.png)

常微分方程，单变量的微分方程

求解x位置

可以用欧拉方法

![](/images/posts/games101-velocity-field/media/image4.png)

通过当前速度和加速度和x计算出下一个时刻的x（向前欧拉）

但稳定性上会出问题

![](/images/posts/games101-velocity-field/media/image5.png)

Δt越小越准

![](/images/posts/games101-velocity-field/media/image6.png)

一定会飞出去离开螺旋形的轨道

还可能出现正反馈，误差越来越大

![](/images/posts/games101-velocity-field/media/image7.png)

不仅有误差，而且不稳定（最大的问题）

![](/images/posts/games101-velocity-field/media/image8.png)

解决方法

![](/images/posts/games101-velocity-field/media/image9.png)

中点法

自适应步长法

隐式方法

![](/images/posts/games101-velocity-field/media/image10.png)

得到中点位置

使用中点的速度

![](/images/posts/games101-velocity-field/media/image11.png)

求解（好像泰勒）

![](/images/posts/games101-velocity-field/media/image12.png)

比较一个t和两个半个t时间计算出来的最终位置，如果相差很大，就使用半个t重复该过程，如果效果差不多，则不再需要细分

![](/images/posts/games101-velocity-field/media/image13.png)

隐式欧拉方法（后向）

使用下个时刻的加速度和速度

![](/images/posts/games101-velocity-field/media/image14.png)

不一定好解

怎么定义稳定性

![](/images/posts/games101-velocity-field/media/image15.png)

评估一个方法的局部误差和整体的误差

需要考虑阶数，阶数越大，减小t，总体的误差减小的更多

![](/images/posts/games101-velocity-field/media/image16.png)

龙格库塔方法

![](/images/posts/games101-velocity-field/media/image17.png)

akaRK4，是一个四阶方法

![](/images/posts/games101-velocity-field/media/image18.png)

不基于物理的方法，直接调整位置

![](/images/posts/games101-velocity-field/media/image19.png)

能量不守恒

![](/images/posts/games101-velocity-field/media/image20.png)

刚体模拟

所以可以通过方法求出下一时刻位置

![](/images/posts/games101-velocity-field/media/image21.png)

流体模拟

![](/images/posts/games101-velocity-field/media/image22.png)

将水假设成一系列小球

小球是不可被压缩的

如果密度改变，则密度需要改变

![](/images/posts/games101-velocity-field/media/image23.png)

任何一个位置的密度都是一个关于位置上的所有小球的函数（梯度下降）

![](/images/posts/games101-velocity-field/media/image24.png)

质点法和网格法

盯着物体看和盯着格子看

混合型

![](/images/posts/games101-velocity-field/media/image25.png)

先计算格子，再把信息写回粒子

![](/images/posts/games101-velocity-field/media/image26.png)

甚至不是开始结束，只是开始的开始