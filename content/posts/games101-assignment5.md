---
title: "Day22"
date: "2025-04-14"
excerpt: "作业5"
category: "GAMES101"
---

作业5

![](/images/posts/day22/media/image1.png)

![](/images/posts/day22/media/image2.png)

Render（）代码如上，首先根据

<span class="mark">Vector3f(x, y, -1)</span>

<span class="mark">得到z轴距离为1，则根据FOV得到y轴范围为（-scale到scale）</span>

<span class="mark">x轴范围为-scale \* imageAspectRatio到scale \* imageAspectRatio</span>

<span class="mark">根据x/width和y/height计算出实际空间中的x和y</span>

<span class="mark">i和j需要加上0.5f是因为应该经过像素中心点，同时使编译器认为是float的计算，不然i，j，width，height都是int，可能会被当成int来计算</span>

![](/images/posts/day22/media/image3.png)

<span class="mark">rayTriangleIntersect（）代码如上</span>

<span class="mark">实际上是根据课上给出的公式</span>

![](/images/posts/day22/media/image4.png)

得到t，b1，b2

满足b1和b2，t大于0且b1，b2和1-b1-b2都大于0则在三角形内

大于exp是为了避免浮点计算误差导致有些点计算错误

最终得到

![](/images/posts/day22/media/image5.emf)（这格式WPS好像打不开，要双击打开）

![](/images/posts/day22/media/image6.png)

表面某个点上接收到的功率（必须是投影到垂直方向上的面积）

![](/images/posts/day22/media/image7.png)

![](/images/posts/day22/media/image8.png)自然的冬夏就是如此

![](/images/posts/day22/media/image9.png)

衰减的解释

![](/images/posts/day22/media/image10.png)

每单位立体角单位投影面积受到的光的功率

![](/images/posts/day22/media/image11.png)

![](/images/posts/day22/media/image12.png)

有方向的irrandiance

打到特定面的indensity

![](/images/posts/day22/media/image13.png)

Radiance积分得到Irrandiance

![](/images/posts/day22/media/image14.png)

双向反射分布函数（BRDF）

![](/images/posts/day22/media/image15.png)

BRDF给出根据入射光，得到的反射光各个方向的能量（材质？）

![](/images/posts/day22/media/image16.png)

具体在后面

![](/images/posts/day22/media/image17.png)

![](/images/posts/day22/media/image18.png)

需要考虑进入着色点的光

但反射光的反射光.......递归起来后不好处理

![](/images/posts/day22/media/image19.png)渲染方程

发光等于自身自发光和反射别处射来的光（假设所有方向朝外）

![](/images/posts/day22/media/image20.png)

![](/images/posts/day22/media/image21.png)

简化渲染方程

![](/images/posts/day22/media/image22.png)陈年老图

![](/images/posts/day22/media/image23.png)

方程进一步简化

![](/images/posts/day22/media/image24.png)

进一步简化（犹如不可直视的古神）

![](/images/posts/day22/media/image25.png)

L和E看作向量，K看作矩阵

![](/images/posts/day22/media/image26.png)

然后求解出L（？）

![](/images/posts/day22/media/image27.png)

K的n次方类似于光线n次弹射

弹射无数次就是全局光照

只弹射一次约等于光栅化的着色

全局光照最后会收敛到一个亮度，不会把整个图片过曝，地球Online是真正的全局光照（果然算力惊人）

概率论部分

![](/images/posts/day22/media/image28.png)

![](/images/posts/day22/media/image29.png)

![](/images/posts/day22/media/image30.png)

高中知识，略

概率密度函数（PDF）

![](/images/posts/day22/media/image31.png)

连续函数上概率分布

![](/images/posts/day22/media/image32.png)

关于x的函数的期望