---
title: "实时阴影1：Shadow Mapping"
date: "2026-03-02"
excerpt: "![](/images/posts/realtime-shadow-mapping/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtime-shadow-mapping/media/image1.png)

先复习shadow mapping

![](/images/posts/realtime-shadow-mapping/media/image2.png)

Shadowmapping

是一个需要两个pass的算法，第一个pass以光源为摄像头渲染出一张深度图，第二个pass利用这张深度图来判断是否被光源招到

而且shadowmap是在图像空间的一种算法，不需要场景的几何信息，但是会导致自遮挡（深度的精度有限）和锯齿（两次采样的点分布不一样）

早期的离线渲染也会使用shadowmapping

![](/images/posts/realtime-shadow-mapping/media/image3.png)

第一个点和光源的连线上没有别的点，第二个点有，也就是第一个被直射，第二个没有

![](/images/posts/realtime-shadow-mapping/media/image4.png)![](/images/posts/realtime-shadow-mapping/media/image5.png)

越黑的深度越大，离光源越近

![](/images/posts/realtime-shadow-mapping/media/image6.png)

比较一下摄像头渲染的时候的像素对于光源的深度，就知道有没有被遮挡

![](/images/posts/realtime-shadow-mapping/media/image7.png)

比较一定要在统一标准下比较，比如到光源的线性距离或者经过同一光源的摄像头的mvp变化后得到的z值

![](/images/posts/realtime-shadow-mapping/media/image8.png)

自遮挡是因为shadowmap把场景的深度离散化成了若干个点，形成了类似与光源方向平行的阶梯状的分布，导致一个区域内深度都是一致的，但是深度是线性变化的，第二个pass并不能保证刚好采样到第一个pass选到的点，导致出现一个区域内的点深度比记录的深度远，使其被判断为被遮挡，而且**光源越与表面平行**，产生的每个阶梯的区域就越大，就有更多的部分被判断为被遮挡

![](/images/posts/realtime-shadow-mapping/media/image9.png)

第一种解决办法是给采样的深度加一点bias，能够容忍偏差（容忍范围是可以根据情况确定），但是会导致阴影偏移

![](/images/posts/realtime-shadow-mapping/media/image10.png)

生成两张shadowmap，第一张找最小的深度，第二张剔除最小深度后再找第二小深度，将二者取均值作为shadowmap，就不需要bias了

但是这样要求模型一定要是密闭的，像地板这种就不行

这种方法复杂度和普通的shadowmap一样是O（n）

![](/images/posts/realtime-shadow-mapping/media/image11.png)

但实时渲染不相信复杂度，两次就是比一次慢一倍，因此工业界基本不用

![](/images/posts/realtime-shadow-mapping/media/image12.png)

锯齿的问题是分辨率不够导致的，工业界的解决方案有很多，如CSM把摄像机视锥体按距离切成多段，每一段使用一张独立的高分辨率 Shadow Map。

Shadowmap数学方面的一些不等式

![](/images/posts/realtime-shadow-mapping/media/image13.png)

![](/images/posts/realtime-shadow-mapping/media/image14.png)

但实时渲染中主要是把不等式尽可能当约等于使用

![](/images/posts/realtime-shadow-mapping/media/image15.png)

两个函数乘积的积分约等于两个积分的乘积再除以归一化的常数

一个函数积分域越小越准，另一个函数的变化越小越准

![](/images/posts/realtime-shadow-mapping/media/image16.png)

渲染方程被拆分成可见性的积分和shading的结果的积分

![](/images/posts/realtime-shadow-mapping/media/image17.png)

点光和面光的范围比较小，漫反射的brdf或者面光源的照射也能保证变化不大，比较适合，不适合也能强行用

![](/images/posts/realtime-shadow-mapping/media/image18.png)

但shadowmap只能给你硬阴影，得不到软阴影，没有过渡

![](/images/posts/realtime-shadow-mapping/media/image19.png)

PCF一开始是来做抗锯齿的，做软阴影的叫PCSS

PCF是filtering了比较的结果，不是模糊了shadowmap，平均深度值再比较，仍然是分明的结果

![](/images/posts/realtime-shadow-mapping/media/image20.png)

对于一个点，选择其在shadowmap对应点周围一圈的比较的01结果，平均（平均方法可直接平均，也可以考虑加权）后得到一个在0到1之间的结果，作为可见性

![](/images/posts/realtime-shadow-mapping/media/image21.png)

但这样会导致采样很多次纹理

![](/images/posts/realtime-shadow-mapping/media/image22.png)

比较范围越大阴影越软

![](/images/posts/realtime-shadow-mapping/media/image23.png)

注意到笔尖阴影比较硬，笔身阴影比较软，阴影软硬和阴影到遮挡物的距离有关

![](/images/posts/realtime-shadow-mapping/media/image24.png)

Wp越大越软，根据相似三角形可知

![](/images/posts/realtime-shadow-mapping/media/image25.png)

首先计算渲染点的对应sm上的点周围的平均深度，如果被遮挡就根据这个平均深度计算出一个软阴影filtering的范围做一个PCF

![](/images/posts/realtime-shadow-mapping/media/image26.png)

选取点的范围可以是一个常量，但更好的结果是把shadow当作放在视锥内，根据光源面积和深度去找一个范围

这样的开销非常非常恐怖