---
title: "GAMES101 点云与曲面"
date: "2025-04-09"
excerpt: "![](/images/posts/day17/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day17/media/image1.png)

![](/images/posts/day17/media/image2.png)显示表示

1.  点云

    ![](/images/posts/day17/media/image3.png)

    由一堆点表示，但之后还是要转换成三角形面，画出好的图形需要足够密的点

2.  多边形

    ![](/images/posts/day17/media/image4.png)

    ![](/images/posts/day17/media/image5.png)

    前八行 定义八个点

    Vn是六个法线

    Vt是纹理坐标

    f定义三角形连接关系

    ![](/images/posts/day17/media/image6.png)

    第五个顶点，第一个顶点，第四个顶点，构成三角形

    分别使用第一个纹理坐标，第二个纹理坐标，第三个纹理坐标

    分别使用第一个法线，第一个法线，第一个法线

    曲线

    模拟摄像机运行曲线

    动画曲线

    ![](/images/posts/day17/media/image7.png)贝塞尔曲线

    ![](/images/posts/day17/media/image8.png)曲线要经过值点（0和3），不需要经过控制点（1和2）

    ![](/images/posts/day17/media/image9.png)

    什么什么算法

    ![](/images/posts/day17/media/image10.png)

    二次贝塞尔曲线

    ![](/images/posts/day17/media/image11.png)从而枚举出每个点（根据不同的t值）

    ![](/images/posts/day17/media/image12.png)多个点则递归

    ![](/images/posts/day17/media/image13.png)

    代数推导

    ![](/images/posts/day17/media/image14.png)

    ![](/images/posts/day17/media/image15.png)

    ![](/images/posts/day17/media/image16.png)类似二项分布

    ![](/images/posts/day17/media/image17.png)

    ![](/images/posts/day17/media/image18.png)

    贝塞尔曲线仿射变换不改变形状

    曲线一定在包含所有点的凸多边形内

    ![](/images/posts/day17/media/image19.png)

    逐段贝塞尔曲线

    ![](/images/posts/day17/media/image20.png)点多了难以控制

    ![](/images/posts/day17/media/image21.png)逐段定义更易控制

    一段通常是四个点

    ![](/images/posts/day17/media/image22.png)

    两端贝塞尔的连续性

    C0连续：点重合

    C1连续：点左右两侧切线大小相同，方向相同或相反

    样条曲线

    ![](/images/posts/day17/media/image23.png)

    ![](/images/posts/day17/media/image24.png)

    比贝塞尔曲线在某些情况下更强

    ![](/images/posts/day17/media/image25.png)

    更复杂。可以去看胡事民老师的课

    贝塞尔曲面

    ![](/images/posts/day17/media/image26.png)

    ![](/images/posts/day17/media/image27.png)

    ![](/images/posts/day17/media/image28.png)

    ![](/images/posts/day17/media/image29.png)水平得到四个点，再垂直得到一条线（类似织布）

    ![](/images/posts/day17/media/image30.png)

    参数映射

    网格操作

    ![](/images/posts/day17/media/image31.png)

    网格细分

    网格简化

    网格正规化