---
title: "实时环境光照2：环境光阴影"
date: "2026-03-11"
excerpt: "![](/images/posts/realtimeenvironmentmapping2/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtimeenvironmentmapping2/media/image1.png)

给环境光做阴影，非常难

首先每个点都要生成sm，这基本是不可能的

即使考虑渲染方程，也会有很多点需要采样，但我们并不知道对于一个点的可见性，而且也不好分离计算

![](/images/posts/realtimeenvironmentmapping2/media/image2.png)

工业界主要是只找一个最亮的区域作为光源来做一个阴影

这里要用的PRT要从傅里叶变换开始

![](/images/posts/realtimeenvironmentmapping2/media/image3.png)

一个周期函数可以用傅里叶变换然后变成一个常数和若干三角函数表示

这些三角函数抛开常数项可以叫基函数

![](/images/posts/realtimeenvironmentmapping2/media/image4.png)![](/images/posts/realtimeenvironmentmapping2/media/image5.png)

滤波实际上就是去掉一些频域然后还原

![](/images/posts/realtimeenvironmentmapping2/media/image6.png)

实域的卷积就是频域的乘积

![](/images/posts/realtimeenvironmentmapping2/media/image7.png)

两个函数的乘积的积分，如果有一个函数是低频的（平滑），就可以认为结果是一个低频的，频率应该是两个函数中较小的

![](/images/posts/realtimeenvironmentmapping2/media/image8.png)

只要任意函数都能被一组函数的线性组合表达，这一组函数就叫做基函数，比如傅里叶变换的函数，以及泰勒展开中的x的n次方

![](/images/posts/realtimeenvironmentmapping2/media/image9.png)

球谐函数是一系列二维的基函数

球谐函数相比二维傅里叶因为其一开始就定义在球面上，可以更好的描述球面上的函数，二维傅里叶好像容易有条缝

基函数可以用勒让德多项式求出

通过原函数与基函数的乘积的积分就能得到该基函数的系数，叫做投影

![](/images/posts/realtimeenvironmentmapping2/media/image10.png)

用较小的阶的球谐函数类似于得到了原函数的频率中不大于所用基函数的频率的部分，就像低通滤波

![](/images/posts/realtimeenvironmentmapping2/media/image11.png)

![](/images/posts/realtimeenvironmentmapping2/media/image12.png)

预过滤后采样一个方向可以等价于不过滤采样多个方向

![](/images/posts/realtimeenvironmentmapping2/media/image13.png)

对于diffuse的BRDF，因为其非常smooth，可以视作是一个对于环境贴图的低通滤波

前三阶的球谐函数就能较好的表达一个diffuse的BRDF，也就是差不多可以认为其是一个低频的

![](/images/posts/realtimeenvironmentmapping2/media/image14.png)

BRDF对环境贴图做了低频滤波，那么环境光也就是低频了，也能用球谐函数来近似了

![](/images/posts/realtimeenvironmentmapping2/media/image15.png)

那么就能把一个点的环境光着色变成与其法线相关的一个二次型

![](/images/posts/realtimeenvironmentmapping2/media/image16.png)

基函数可以近似表示任意函数，只要有足够多的基，也能通过较少的基保留一部分较低的频率，同时减少乘法运算

![](/images/posts/realtimeenvironmentmapping2/media/image17.png)

环境光渲染方程可以拆分成主要的三项球面函数，如果一项一项算就会非常慢

![](/images/posts/realtimeenvironmentmapping2/media/image18.png)![](/images/posts/realtimeenvironmentmapping2/media/image19.png)

我们可以把light transport的部分先预计算出来，因为漫反射是向四周反射，可以认为与观察角度无关，BRDF是一个常数，n又是一个点的属性，而可见性也只与light方向有关，那么就能把这三项写成一个只与i相关的球面函数

![](/images/posts/realtimeenvironmentmapping2/media/image20.png)

预计算包含了可见性项，那么就不能移动物体

![](/images/posts/realtimeenvironmentmapping2/media/image21.png)

球谐函数是正交的，容易重建，容易旋转（旋转原函数等价于旋转基函数，旋转的基函数可以被同阶的基函数线性组合得到）

![](/images/posts/realtimeenvironmentmapping2/media/image22.png)

阶数越多越准

![](/images/posts/realtimeenvironmentmapping2/media/image23.png)

![](/images/posts/realtimeenvironmentmapping2/media/image24.png)![](/images/posts/realtimeenvironmentmapping2/media/image25.png)

![](/images/posts/realtimeenvironmentmapping2/media/image26.png)

那我们就把环境光写成了几个点乘的和

![](/images/posts/realtimeenvironmentmapping2/media/image27.png)

如果能考虑光的多次折射，效果会更好