---
title: "Day13"
date: "2025-04-01"
excerpt: "![](/images/posts/day13/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day13/media/image1.png)

![](/images/posts/day13/media/image2.png)

1.  重心坐标

    ![](/images/posts/day13/media/image3.png)进行插值

    ![](/images/posts/day13/media/image4.png)

    ![](/images/posts/day13/media/image5.png)奔驰定理（？，高中记忆开始攻击我

    三角形重心的重心坐标

    ![](/images/posts/day13/media/image6.png)

    重心坐标公式

    ![](/images/posts/day13/media/image7.png)

    ![](/images/posts/day13/media/image8.png)

    但投影不能保证重心坐标不变

    三维空间的属性在三维空间中插值，然后投影

    纹理

    ![](/images/posts/day13/media/image9.png)

    纹理放大

    ![](/images/posts/day13/media/image10.png)

    ![](/images/posts/day13/media/image11.png)

    ![](/images/posts/day13/media/image12.png)

    线性插值![](/images/posts/day13/media/image13.png)

    ![](/images/posts/day13/media/image14.png)

    双线性插值

    ![](/images/posts/day13/media/image15.png)和Bilinear相比就是从4个变成使用16个像素插值

    ![](/images/posts/day13/media/image16.png)

    ![](/images/posts/day13/media/image17.png)

    ![](/images/posts/day13/media/image18.png)开销太大了

    ![](/images/posts/day13/media/image19.png)

    ![](/images/posts/day13/media/image20.png)

    （只能做近似正方形的范围查询）

    ![](/images/posts/day13/media/image21.png)![](/images/posts/day13/media/image22.png)存储量只增加了三分之一

    ![](/images/posts/day13/media/image23.png)![](/images/posts/day13/media/image24.png)

    （也可以投影一个像素的四个顶点的投影）

    D表示在第几层找

    D为小数时，在两层之间进行双线性插值

    ![](/images/posts/day13/media/image25.png)

    （三线性插值）

    ![](/images/posts/day13/media/image26.png)

    Overblur

    各向异性过滤（开销增加三倍）

    ![](/images/posts/day13/media/image27.png)

    ![](/images/posts/day13/media/image28.png)

    因为映射会导致形状改变

    ![](/images/posts/day13/media/image29.png)

    以及EWA过滤