---
title: "GAMES101 光线追踪"
date: "2025-04-11"
excerpt: "![](/images/posts/day19/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day19/media/image1.png)

![](/images/posts/day19/media/image2.png)

光栅化不好表示全局的效果

![](/images/posts/day19/media/image3.png)

但光线追踪很慢

![](/images/posts/day19/media/image4.png)

光线：1.沿直线传播

2 .光线和光线之间不会发生碰撞

3.  光线从光源出发到达眼睛

    Reciprocity：光路可逆性（当你凝视深渊的时候，深渊也在凝视你）

    ![](/images/posts/day19/media/image5.png)

    光线投射

    ![](/images/posts/day19/media/image6.png)

    ![](/images/posts/day19/media/image7.png)

    眼睛处发出射线，经过平面某个像素后打到某个点，再将该点与光源相连得到光线，根据这两条线计算颜色写回像素（只进行了一次反射）

    ![](/images/posts/day19/media/image8.png)

    ![](/images/posts/day19/media/image9.png)

    计算各个点着色，最终将各个颜色相加写入像素

    ![](/images/posts/day19/media/image10.png)

    ![](/images/posts/day19/media/image11.png)光线是一条射线

    ![](/images/posts/day19/media/image12.png)

    ![](/images/posts/day19/media/image13.png)光线怎么对球求交点

    ![](/images/posts/day19/media/image14.png)t要大于0，要是实数

    ![](/images/posts/day19/media/image15.png)

    推广：解得t要满足大于0的实数

    ![](/images/posts/day19/media/image16.png)

    显示表示需要判断光线经不经过三角形内部

    ![](/images/posts/day19/media/image17.png)

    判断光线经过平面的点在不在三角形内部

    表示平面：平面的法线和平面上一个点就可以表示一个平面

    ![](/images/posts/day19/media/image18.png)

    求得t

    ![](/images/posts/day19/media/image19.png)

    MT算法

    ![](/images/posts/day19/media/image20.png)

    解出b1和b2，t大于0且b1，b2和1-b1-b2都大于0则在三角形内

    （每个像素都要遍历所有三角形）

    加快三角形求交

    ![](/images/posts/day19/media/image21.png)

    1.包围盒

    ![](/images/posts/day19/media/image22.png)

    ![](/images/posts/day19/media/image23.png)

    先用简单的东西包围一个较复杂的物体

    若光线和包围盒不相交，则必不与里面的物体相交

    常用包围盒是长方体

    长方体由三个对面交集得到

    ![](/images/posts/day19/media/image24.png)

    AABB（通常是轴对齐的）

    ![](/images/posts/day19/media/image25.png)求出两个线段交集得到光线进入和出去的时间

    3D物体中，光线进入的tenter要是tmin中最大的（因为要进入所有面），离开texit要是tmax中最小的（离开一个面就已经离开）

    ![](/images/posts/day19/media/image26.png)

    若tenter\<texit,则一定进入了包围盒

    ![](/images/posts/day19/media/image27.png)

    Texit\<0则包围盒在背后，无交点

    Texit\>=0且tenter\<0则视点就在包围盒内

    ![](/images/posts/day19/media/image28.png)

    Texit\>=0且tenter\<texit，则会与包围盒相交

    ![](/images/posts/day19/media/image29.png)

    轴对齐易于求tmin和tmax