---
title: "GAMES101 采样与抗锯齿"
date: "2025-03-28"
excerpt: "![](/images/posts/day8/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day8/media/image1.png)

采样，变成离散的像素

必然会导致Artifacts（瑕疵）

锯齿

![](/images/posts/day8/media/image2.png)

摩尔纹

![](/images/posts/day8/media/image3.png)

车轮效应（人眼跟不上）

![](/images/posts/day8/media/image4.png)

本质是因为信号变化太快，采样跟不上

![](/images/posts/day8/media/image5.png)先模糊在采样，减少锯齿

![](/images/posts/day8/media/image6.png)

左：先采样再模糊（不可以）

右：先模糊再采样（可以）

![](/images/posts/day8/media/image7.png)

波的频率和采样频率的差距导致

![](/images/posts/day8/media/image8.png)

两个完全不同的信号得到相同的结果（走样）

![](/images/posts/day8/media/image9.png)

滤波

原图

![](/images/posts/day8/media/image10.png)

高通滤波（去掉低频区域）

![](/images/posts/day8/media/image11.png)只能看到轮廓

低通滤波（失去细节）

![](/images/posts/day8/media/image12.png)边界被去掉

中通滤波（？能这么叫吗

![](/images/posts/day8/media/image13.png)

![](/images/posts/day8/media/image14.png)

![](/images/posts/day8/media/image15.png)

滤波等于平均等于卷积

卷积：

![](/images/posts/day8/media/image16.png)

点乘filter和signal

卷积定理

![](/images/posts/day8/media/image17.png)

空间域上对两个信号卷积，实际上是两个信号分别在频域上的乘积

![](/images/posts/day8/media/image18.png)

卷积和（变模糊了）

下图可以叫做低通滤波器

![](/images/posts/day8/media/image19.png)

![](/images/posts/day8/media/image20.png)

采样，重复频率上的内容

![](/images/posts/day8/media/image21.png)

C:冲激函数（只在特定点上有值）

![](/images/posts/day8/media/image22.png)

采样可以视为不断重复频谱（易导致走样）

反走样

1.  提高采样率

2.  低通滤波卷积后采样

    ![](/images/posts/day8/media/image23.png)

3.  对每个像素卷积

    ![](/images/posts/day8/media/image24.png)

    ![](/images/posts/day8/media/image25.png)

    ![](/images/posts/day8/media/image26.png)在一个像素中多加采样点

    ![](/images/posts/day8/media/image27.png)

    ![](/images/posts/day8/media/image28.png)

    代价：增加计算量

    ![](/images/posts/day8/media/image29.png)

    其他的抗锯齿

    FXAA：直接找到边界然后替换

    TAA：类似于时间上卷积

    ![](/images/posts/day8/media/image30.png)

    超分