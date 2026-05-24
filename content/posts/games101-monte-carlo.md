---
title: "GAMES101 蒙特卡罗积分"
date: "2025-04-16"
excerpt: "![](/images/posts/day24/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day24/media/image1.png)

![](/images/posts/day24/media/image2.png)

![](/images/posts/day24/media/image3.png)

蒙特卡罗积分

![](/images/posts/day24/media/image4.png)

对于一个不好求的定积分

![](/images/posts/day24/media/image5.png)

采样无穷多次，每次得到一个f（x），计算面积，把所有面积相加后求平均

从而得到积分

![](/images/posts/day24/media/image6.png)

如果pdf函数是水平（x概率均匀），则有（b-a）表示长度，f（xi）表示值，得到面积后累加除以n，就是蒙特卡洛积分的特殊情况

![](/images/posts/day24/media/image7.png)

![](/images/posts/day24/media/image8.png)

一般的，采样越多，结果越准

x的积分，采样x

![](/images/posts/day24/media/image9.png)

![](/images/posts/day24/media/image10.png)

WS光线追踪有一些不符合物理的情况

![](/images/posts/day24/media/image11.png)

问题1

![](/images/posts/day24/media/image12.png)

光线打到Glossy材质上不会只沿着specular的方式反射

问题2

![](/images/posts/day24/media/image13.png)

光线打到漫反射物体后就停了，不能考虑物体与物体之间的反射光照

但渲染方程是对的

![](/images/posts/day24/media/image14.png)

![](/images/posts/day24/media/image15.png)

要考虑全局对该点的积分，要考虑其他点到来的方程，但其他点也要考虑该点到来的光线

导致递归

但结果是一个定积分，所以可以使用蒙特卡洛积分

![](/images/posts/day24/media/image16.png)

该点直接光照来自四面八方，需要BRDF来积分

![](/images/posts/day24/media/image17.png)

直接光照，只考虑光源发出的光

![](/images/posts/day24/media/image18.png)

使用蒙特卡洛积分

![](/images/posts/day24/media/image19.png)

半球面积是2Π

从而解得直接光照

![](/images/posts/day24/media/image20.png)

从而写出直接光照的shader

![](/images/posts/day24/media/image21.png)

![](/images/posts/day24/media/image22.png)

全局光照，考虑打到物体上的间接光照，视为全局光照，视为从p点看q点的直接光照

但是

![](/images/posts/day24/media/image23.png)

![](/images/posts/day24/media/image24.png)

N太多导致光线数量太多了（时间复杂度要爆炸）

所以只需要让N等于1

![](/images/posts/day24/media/image25.png)（太野了）

N=1叫路径追踪

![](/images/posts/day24/media/image26.png)

N！=1是分布式光线追踪

![](/images/posts/day24/media/image27.png)

所以一个点多打几次求平均（？

![](/images/posts/day24/media/image28.png)

问题

![](/images/posts/day24/media/image29.png)

递归不一定能停

![](/images/posts/day24/media/image30.png)

引入俄罗斯轮盘赌（？

![](/images/posts/day24/media/image31.png)

确实解决了问题，理论期望是L0

![](/images/posts/day24/media/image32.png)

实现代码，正确的路径追踪

![](/images/posts/day24/media/image33.png)

但采样率低效果不好

![](/images/posts/day24/media/image34.png)

所以可以使用另外的采样方式减少光线浪费

在光源上采样

![](/images/posts/day24/media/image35.png)

![](/images/posts/day24/media/image36.png)

![](/images/posts/day24/media/image37.png)

因为x的积分，采样x

所以要在光源上采样，需要重写成与光源有关的渲染方程

![](/images/posts/day24/media/image38.png)

根据这个关系，得到

![](/images/posts/day24/media/image39.png)

![](/images/posts/day24/media/image40.png)对光源采样，对光源积分

![](/images/posts/day24/media/image41.png)

从而将直接光照和间接光照分开

![](/images/posts/day24/media/image42.png)

但是还要考虑光源能不能照射到

![](/images/posts/day24/media/image43.png)

需要添加红字

![](/images/posts/day24/media/image44.png)

但点光源不好考虑，最好做成很小的面积光源

![](/images/posts/day24/media/image45.png)

路径追踪是现代化的（

![](/images/posts/day24/media/image46.png)

路径追踪几乎和照片一模一样

![](/images/posts/day24/media/image47.png)

但还有没接触到的

![](/images/posts/day24/media/image48.png)

怎么采样一个任意函数

![](/images/posts/day24/media/image49.png)

怎么对特定形状的函数更好的采样

![](/images/posts/day24/media/image50.png)

需要好的随机数

![](/images/posts/day24/media/image51.png)

半球和光源可以同时都采样

![](/images/posts/day24/media/image52.png)

一个像素里面不同的采样点，需不需要加权

![](/images/posts/day24/media/image53.png)

光的颜色不一定是像素最终的颜色，需要伽马矫正

![](/images/posts/day24/media/image54.png)

只是入门

难的应该结束了？