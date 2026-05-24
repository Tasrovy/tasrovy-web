---
title: "GAMES101 光场"
date: "2025-04-22"
excerpt: "![](/images/posts/games101-light-field/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-light-field/media/image1.png)

二者是光场两个不同的概念

![](/images/posts/games101-light-field/media/image2.png)

全光函数:描述我们能看到的所有东西

![](/images/posts/games101-light-field/media/image3.png)

通过极坐标表示某一个点

![](/images/posts/games101-light-field/media/image4.png)

增加波长参数描述波长

![](/images/posts/games101-light-field/media/image5.png)

增加时间概念就变成了电影

![](/images/posts/games101-light-field/media/image6.png)

定义观察点变成全息

![](/images/posts/games101-light-field/media/image7.png)

视为描述在任意时间任何位置任何方向看到的东西（全光函数）

![](/images/posts/games101-light-field/media/image8.png)

光场实际上是全光函数的一部分

光线的定义，起点和方向

![](/images/posts/games101-light-field/media/image9.png)、

![](/images/posts/games101-light-field/media/image10.png)也可以用两个点定义

![](/images/posts/games101-light-field/media/image11.png)

描述物体被看到的情况，可以通过该物体任何一个点与包围盒上任意一个点连线得到，从而在摄像头与包围盒上一个点的连线上能查询到物体颜色（类似于贴图？）

就是光场，只有一个在二维平面上的位置和用两个角度描述的方向

![](/images/posts/games101-light-field/media/image12.png)

从而在任何一点看都能得到记录的值

![](/images/posts/games101-light-field/media/image13.png)

所以不需要光场表示什么东西，只需要知道光场

![](/images/posts/games101-light-field/media/image14.png)

随机两个点相连，得到无数条光线

![](/images/posts/games101-light-field/media/image15.png)

![](/images/posts/games101-light-field/media/image16.png)

B

b图类似于记录radiance

![](/images/posts/games101-light-field/media/image17.png)

把接受到的光分颜色储存（微透镜）

![](/images/posts/games101-light-field/media/image18.png)

光场照相机，支持后期重新聚焦

![](/images/posts/games101-light-field/media/image19.png)

从原本记录一个像素变成记录一块像素

![](/images/posts/games101-light-field/media/image20.png)

还原成照片，只需要选择所有方向相同的光线得到对应颜色

![](/images/posts/games101-light-field/media/image21.png)

类似于虚拟地移动摄像机

![](/images/posts/games101-light-field/media/image22.png)

重新聚焦，需要计算出应该从光场中取出的光线，重新成像达到重聚焦效果

但是会产生分辨率不足的问题

![](/images/posts/games101-light-field/media/image23.png)

因为存储量变大了

成本还变高了

有得必有失