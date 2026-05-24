---
title: "GAMES101 Loop细分"
date: "2025-04-10"
excerpt: "![](/images/posts/games101-loop-subdivision/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/games101-loop-subdivision/media/image1.png)

![](/images/posts/games101-loop-subdivision/media/image2.png)

和循环没有关系，只是因为发明人姓Loop

![](/images/posts/games101-loop-subdivision/media/image3.png)先细分顶点

![](/images/posts/games101-loop-subdivision/media/image4.png)

一条边上中间新产生顶点

![](/images/posts/games101-loop-subdivision/media/image5.png)

老顶点变更

n:顶点的度（一个顶点周围三角形数量）

Catmull-clark细分（Catmull是图灵奖得主）

![](/images/posts/games101-loop-subdivision/media/image6.png)

定义四边形面和非四边形面

奇异点：度不为四的点

![](/images/posts/games101-loop-subdivision/media/image7.png)

取网格各边中点，将其与该网格的中点连起来，实现将非四边形面变成奇异点

![](/images/posts/games101-loop-subdivision/media/image8.png)![](/images/posts/games101-loop-subdivision/media/image9.png)继续细分不增加奇异点数量

![](/images/posts/games101-loop-subdivision/media/image10.png)

各个点的更新方式

![](/images/posts/games101-loop-subdivision/media/image11.png)

曲面简化

![](/images/posts/games101-loop-subdivision/media/image12.png)

![](/images/posts/games101-loop-subdivision/media/image13.png)

边坍缩

![](/images/posts/games101-loop-subdivision/media/image14.png)

坍缩后点到各个平面距离误差值之和最小

![](/images/posts/games101-loop-subdivision/media/image15.png)

需要建堆（优先队列），贪心算法

![](/images/posts/games101-loop-subdivision/media/image16.png)

光栅化的局限（不好做全局）

光栅中画阴影

![](/images/posts/games101-loop-subdivision/media/image17.png)

![](/images/posts/games101-loop-subdivision/media/image18.png)

核心

若点不在阴影里面，则点一定能被光源和相机看到

![](/images/posts/games101-loop-subdivision/media/image19.png)

1.  从光源到场景，记录每个点的深度

    ![](/images/posts/games101-loop-subdivision/media/image20.png)

2.  计算摄像机能看到的点，将点回溯到摄像机上，深度若大于步骤一摄像机看到的点上的深度，则在阴影中

    ![](/images/posts/games101-loop-subdivision/media/image21.png)

    ![](/images/posts/games101-loop-subdivision/media/image22.png)

    ![](/images/posts/games101-loop-subdivision/media/image23.png)实际上是深度图

    ![](/images/posts/games101-loop-subdivision/media/image24.png)

    ![](/images/posts/games101-loop-subdivision/media/image25.png)

    ![](/images/posts/games101-loop-subdivision/media/image26.png)

    只适合做硬阴影

    ![](/images/posts/games101-loop-subdivision/media/image27.png)软阴影也叫半影（penumbra）

    ![](/images/posts/games101-loop-subdivision/media/image28.png)

    光线追踪要来了