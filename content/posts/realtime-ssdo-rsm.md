---
title: "SSDO与RSM间接光照"
date: "2026-05-24"
excerpt: "![](/images/posts/realtimeglobalillumination3/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtimeglobalillumination3/media/image1.png)

![](/images/posts/realtimeglobalillumination3/media/image2.png)

SSDO是对SSAO的提高，考虑了更多因素，如次级光源才能提供间接光照，那么可以用RSM拿到

![](/images/posts/realtimeglobalillumination3/media/image3.png)

但实际上不是从RSM来，而是从摄像机出发

![](/images/posts/realtimeglobalillumination3/media/image4.png)

类似路径追踪，对于屏幕空间的着色点，发出射线打到别的点就计算该点的贡献

![](/images/posts/realtimeglobalillumination3/media/image5.png)

AO和DO的逻辑是相反的，AO认为没打到的方向能接收到间接光，但DO认为打到的方向才会有间接光贡献，因为AO假设间接光来自远处，DO认为间接光来自近处

![](/images/posts/realtimeglobalillumination3/media/image6.png)

假设都是diffuse的，解法可以参考RSM

![](/images/posts/realtimeglobalillumination3/media/image7.png)

ABD三点都被挡住，那么就查询其与视角连线的G-buffer的值，计算对渲染点P的贡献

C点没有被挡住，可以查对应环境光照

但对于图三，A没有被挡住，b实际上被挡住了，但SSDO认为A被挡住，B没有被挡住

![](/images/posts/realtimeglobalillumination3/media/image8.png)

质量更好，比AO更接近离线渲染

但仍然存在问题，只能解决小范围的GI，不考虑可见性，还不能考虑到不在屏幕空间内的信息，如最右边的黄色物体的表面的反光不能被观察到，这是SS的问题

![](/images/posts/realtimeglobalillumination3/media/image9.png)

![](/images/posts/realtimeglobalillumination3/media/image10.png)

SSR是一种在实时渲染中实现全局光照的方式，通过光线追踪，但不需要3D结构（BVH，三角形等）

SSR需要求光线和场景的交，然后计算交点对着色点的贡献

![](/images/posts/realtimeglobalillumination3/media/image11.png)

![](/images/posts/realtimeglobalillumination3/media/image12.png)

我们需要计算光线打到哪里了，因此需要一步一步走

![](/images/posts/realtimeglobalillumination3/media/image13.png)

但更好的是一下可以走几格

![](/images/posts/realtimeglobalillumination3/media/image14.png)

首先生成深度图的mipmap（压缩一层，不是取四个像素平均值，而是四个像素中的最小值）

![](/images/posts/realtimeglobalillumination3/media/image15.png)

类似我们先查低精度的深度图，相交后再计算高一层精度相交在哪里......以此类推最终得到高精度交点

![](/images/posts/realtimeglobalillumination3/media/image16.png)

实际上是先小步走，然后大步走，然后小步走找到精准相交格子

![](/images/posts/realtimeglobalillumination3/media/image17.png)

SS会出现几何问题，上图手掌因为不在屏幕空间中，因此不会被反射

![](/images/posts/realtimeglobalillumination3/media/image18.png)

SS的屏幕外面也不会被反射

![](/images/posts/realtimeglobalillumination3/media/image19.png)

可以Hack一下，根据距离衰减反射

![](/images/posts/realtimeglobalillumination3/media/image20.png)

我们需要假设着色点对接受光的反射是diffuse的，因为反射点到摄像头或者反射接受点的brdf不好计算

不需要平方衰减，因为每个着色点实际上是一个小平面，也处理了可见性

![](/images/posts/realtimeglobalillumination3/media/image21.png)

Raytracing可以很好的做到

锐利和模糊的反射，类似PCSS的反射（近处清晰远处模糊），各项异性的反射，逐像素的处理粗糙度和法线

![](/images/posts/realtimeglobalillumination3/media/image22.png)

可以根据入射方向和BRDF得到光线分布，给反射的光线做重要性采样，让结果更准确

![](/images/posts/realtimeglobalillumination3/media/image23.png)

还可以考虑时间和空间的复用着色点

![](/images/posts/realtimeglobalillumination3/media/image24.png)

可以给屏幕空间做模糊然后根据BRDF和反射方向采样不同模糊等级采样一次来做到类似采样多次的效果，但是需要考虑深度的不同防止漏色

![](/images/posts/realtimeglobalillumination3/media/image25.png)

SSR可以很快的做光滑高光的反射，质量好且没有遮挡问题

不好做diffuse，不能考虑屏幕外的信息