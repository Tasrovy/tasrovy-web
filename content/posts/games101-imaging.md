---
title: "GAMES101 成像与捕捉"
date: "2025-04-21"
excerpt: "![](/images/posts/games101-imaging/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-imaging/media/image1.png)

成像=合成加捕捉

![](/images/posts/games101-imaging/media/image2.png)

![](/images/posts/games101-imaging/media/image3.png)针孔相机

![](/images/posts/games101-imaging/media/image4.png)![](/images/posts/games101-imaging/media/image5.png)

快门，捕捉多少时间内进入的光

传感器，记录每个像素受到的irradiance

![](/images/posts/games101-imaging/media/image6.png)

![](/images/posts/games101-imaging/media/image7.png)针孔相机

![](/images/posts/games101-imaging/media/image8.png)![](/images/posts/games101-imaging/media/image9.png)不会产生虚化

FOV（视场）

![](/images/posts/games101-imaging/media/image10.png)

是一个角度，其他条件相同的情况下，焦距越近视场越大，传感器越大视场越大

![](/images/posts/games101-imaging/media/image11.png)

对应的焦距是相对到35mm大小的胶片的大小

![](/images/posts/games101-imaging/media/image12.png)

![](/images/posts/games101-imaging/media/image13.png)所以相机越大越好（

![](/images/posts/games101-imaging/media/image14.png)曝光

![](/images/posts/games101-imaging/media/image15.png)

记录总共的能量而不是单位时间的irradiance

![](/images/posts/games101-imaging/media/image16.png)

可以由F数，快门速度，感光度来控制曝光

![](/images/posts/games101-imaging/media/image17.png)

F数越小光圈越大

快门数字就是表示多少秒内开放

ISO就是一个相乘的数字，太大之后变糊是因为把噪声也放大了

![](/images/posts/games101-imaging/media/image18.png)

![](/images/posts/games101-imaging/media/image19.png)

F数（直径分之一），调控单位时间内进入的光的能量

![](/images/posts/games101-imaging/media/image20.png)

快门，控制开放时间

![](/images/posts/games101-imaging/media/image21.png)导致运动模糊效应

一定时间内，运动越快模糊越大

![](/images/posts/games101-imaging/media/image22.png)

运动模糊让人感觉更快

![](/images/posts/games101-imaging/media/image23.png)

因为物理开门打开需要时间，必然导致高速运转的物体接受光时间不一样导致扭曲

![](/images/posts/games101-imaging/media/image24.png)

每一列达到的实际效果差不多

![](/images/posts/games101-imaging/media/image25.png)

景深和运动模糊不好兼得

![](/images/posts/games101-imaging/media/image26.png)、

高速摄影

![](/images/posts/games101-imaging/media/image27.png)![](/images/posts/games101-imaging/media/image28.png)

![](/images/posts/games101-imaging/media/image29.png)延时摄影

![](/images/posts/games101-imaging/media/image30.png)

透镜近似

![](/images/posts/games101-imaging/media/image31.png)

实际透镜不一定会把光聚到一点

![](/images/posts/games101-imaging/media/image32.png)

理想上光线都会聚集到焦点

![](/images/posts/games101-imaging/media/image33.png)

假设透镜焦距可以自由改变（实际透镜由透镜组组成，可以调节）

![](/images/posts/games101-imaging/media/image34.png)透镜的等式

![](/images/posts/games101-imaging/media/image35.png)

由相似计算得到

![](/images/posts/games101-imaging/media/image36.png)

![](/images/posts/games101-imaging/media/image37.png)

![](/images/posts/games101-imaging/media/image38.png)

点因为距离问题在接收面上变成了一个圆形范围，所以说CircleofConfusion

C可以根据公式计算得到

![](/images/posts/games101-imaging/media/image39.png)

![](/images/posts/games101-imaging/media/image40.png)

![](/images/posts/games101-imaging/media/image41.png)

知道焦距和光圈直径，就能得到F数N

![](/images/posts/games101-imaging/media/image42.png)

从而计算CoC

![](/images/posts/games101-imaging/media/image43.png)

从而能够模拟透镜

![](/images/posts/games101-imaging/media/image44.png)

定义透镜焦距，光圈大小，传感器大小

选择最终显示的平面，计算像距

![](/images/posts/games101-imaging/media/image45.png)

选择一个点，算出透镜之后的距离，从而模拟

![](/images/posts/games101-imaging/media/image46.png)

![](/images/posts/games101-imaging/media/image47.png)

景深就是指场景中有一段区域，在成像平面附近形成的CoC都是很小的

![](/images/posts/games101-imaging/media/image48.png)![](/images/posts/games101-imaging/media/image49.png)

然后解得

![](/images/posts/games101-imaging/media/image50.png)

![](/images/posts/games101-imaging/media/image51.png)

光场（在下次）