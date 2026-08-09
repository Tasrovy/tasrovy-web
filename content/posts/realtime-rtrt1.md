---
title: "实时光线追踪：降噪"
date: "2026-06-08"
excerpt: "![](/images/posts/realtime-rtrt1/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtime-rtrt1/media/image1.png)

![](/images/posts/realtime-rtrt1/media/image2.png)

毛发，皮肤，体积雾的渲染被鸽掉了，不知道以后还有没有

![](/images/posts/realtime-rtrt1/media/image3.png)

![](/images/posts/realtime-rtrt1/media/image4.png)

光追会是未来，而且永远是（

![](/images/posts/realtime-rtrt1/media/image5.png)

18年nvdia就做出了图灵架构的支持光追的硬件

有2500亿的市场，好吧但是现在好像都拿来做ai了（悲

![](/images/posts/realtime-rtrt1/media/image6.png)

光追对环境光支持非常好，而且理论上就是支持无限光源

![](/images/posts/realtime-rtrt1/media/image7.png)

RTX实际上就是为了做光线追踪而存在

![](/images/posts/realtime-rtrt1/media/image8.png)

理论上RTX一秒钟可以射出一百亿次光线，但是因为不可能始终满载运行（多pass，以及其他任务），实际上最终只能给一个像素分一次采样，也就是射一根光线

![](/images/posts/realtime-rtrt1/media/image9.png)

一次SSP就是四（三）条光线，一次光栅化，一个是直接光的可见性的光线，然后是弹射的光线，然后是弹射后的点与光的可见性

![](/images/posts/realtime-rtrt1/media/image10.png)

那么显然1SSP会产生非常多的噪点，那么实时光线追踪的核心就是降噪来去掉这些噪声

![](/images/posts/realtime-rtrt1/media/image11.png)

![](/images/posts/realtime-rtrt1/media/image12.png)

对于降噪，我们要保证质量，不能太模糊，也不能有缺陷，还要保证所有细节

还要保证速度

那么基本是不可能的

切边滤波不行

离线方法也不行

深度学习也不行

主要是速度问题

![](/images/posts/realtime-rtrt1/media/image13.png)

那么一帧内完全不行，那么我们就要考虑多帧的内容，也就是使用上一帧的内容

那么我们要假设上一帧是滤波好了的（递归的原理，每一帧的信息都比上一帧多，那么就会噪声就会指数级别的衰减）

然后通过一个动作向量来描述物体上一帧和这一帧的变化，来找到这个像素应该复用哪一个像素

这样实际上不只用了上一帧的1SPP，因为上一帧也用了上上帧的1SPP，这样就能明显的增加SPP的量，只需要考虑好比重

![](/images/posts/realtime-rtrt1/media/image14.png)

实现之前，我们要首先得到几何缓冲区，也就是著名的G-buffer

Gbuffer允许我们很便捷的拿到非常多的信息，而且允许自定义，法线，diffuse等各种数据都可以，并且在渲染全流程都可以拿到

但是这是屏幕空间的，没有屏幕外的信息

而且因为数据大小原因占用很大带宽

![](/images/posts/realtime-rtrt1/media/image15.png)

对于动作向量，我们需要根据当前帧去找他上一帧的位置

![](/images/posts/realtime-rtrt1/media/image16.png)

我们只需要找到当前像素的世界坐标（直接存进Gbuffer或者依靠zbuffer手动算），对其进行上一帧的变换，就能找到其在上一帧的像素位置，就能计算动作向量

深度学习去找效率太低了

我们拿到动作向量后就可以直接去找去采样上一帧的结果了

![](/images/posts/realtime-rtrt1/media/image17.png)

先给当前帧的结果做滤波

然后和上一帧的通过动作向量算出来的像素位置的值做线性插值

而且当前帧占比一般只有0.1到0.2

![](/images/posts/realtime-rtrt1/media/image18.png)![](/images/posts/realtime-rtrt1/media/image19.png)

降噪前后对比

亮度出现明显差异是因为降噪前有很多噪点的值实际上远远大于255，被显示器截断到255了，导致结果偏暗。如果显示器支持HDR，可能亮度就很接近了

![](/images/posts/realtime-rtrt1/media/image20.png)

这是离线渲染的结果

降噪后会少一些内容，如左上角的接触阴影（Contact Shadow）