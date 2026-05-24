---
title: "RealtimeGlobalIllumination2"
date: "2026-05-24"
excerpt: "![](/images/posts/realtimeglobalillumination2/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtimeglobalillumination2/media/image1.png)

![](/images/posts/realtimeglobalillumination2/media/image2.png)

LPV最早出现在孤岛危机游戏中，快且质量好

![](/images/posts/realtimeglobalillumination2/media/image3.png)

我们需要查询着色点任意方向上接受的radiance，那么我们认为radiance走直线且不变

直接光源打到物体表面，然后物体作为次级光源发出radiance发射到体素化的空间中![](/images/posts/realtimeglobalillumination2/media/image4.png)

首先生成在场景中被直接照亮的点的集合

然后从这些点作为发出光线的点插入进体素化的空间中

然后让光线在体素化的空间中不停更新

最后查询做着色

![](/images/posts/realtimeglobalillumination2/media/image5.png)

需要先做RSM，得到虚拟光源（可以适当减少或者做随机采样）

![](/images/posts/realtimeglobalillumination2/media/image6.png)

首先划分三维空间的网格（可以作为3D纹理存储）

对于每个网格记录其中虚拟光源

然后总结体素中的radiance分布

存到一个二阶球谐（四个球谐函数）上

![](/images/posts/realtimeglobalillumination2/media/image7.png)

传播时收集每个体素每个面打到的光，然后传到其六个邻近的体素（不考虑可见性），用球谐存储，最后迭代若干次（4-5次）到一个相对稳定结果

![](/images/posts/realtimeglobalillumination2/media/image8.png)

渲染的时候直接查询着色点所在体素记录的radiance来做着色

但这样就会漏光，因为体素划分太大了，不能认为一个体素内的点接受radiance接近

![](/images/posts/realtimeglobalillumination2/media/image9.png)

![](/images/posts/realtimeglobalillumination2/media/image10.png)

![](/images/posts/realtimeglobalillumination2/media/image11.png)

VXGI是两趟的算法

和RSM的主要区别是把场景离散成体素（八叉树），将RSM认为的微平面光源改成体素化的体积发出的光

然后从摄像头发出一根光线，打到着色点，反射出一个锥形体积的范围，查询范围内的被光打到的体素，查询里面的radiance来做着色

![](/images/posts/realtimeglobalillumination2/media/image12.png)

创建体素化的场景，构建八叉树加速

![](/images/posts/realtimeglobalillumination2/media/image13.png)

先在lightpass做一个体素化的记录，记录lightdir和normal，可以得到一个radiance的分布

![](/images/posts/realtimeglobalillumination2/media/image14.png)

要么把圆锥分割一层一层查询，要么做一些加速结构，如根据层级逐渐扩大体素大小等级

![](/images/posts/realtimeglobalillumination2/media/image15.png)

对于diffuse的物体可以用许多小圆锥替代，得到一个比较近似的结果

![](/images/posts/realtimeglobalillumination2/media/image16.png)

效果更好，接近光追

![](/images/posts/realtimeglobalillumination2/media/image17.png)

屏幕空间

只使用屏幕中的信息来做GI，也就是类似在主光源Pass后做后处理

![](/images/posts/realtimeglobalillumination2/media/image18.png)

![](/images/posts/realtimeglobalillumination2/media/image19.png)

Ao让场景中物体的关系更加明确（立体感）

![](/images/posts/realtimeglobalillumination2/media/image20.png)

Ao是对于全局光照的近似，只使用屏幕空间的信息（G-Buffer）

我们不知道间接光的方向，那我们假设所有方向，所有点接受到的都是常数

![](/images/posts/realtimeglobalillumination2/media/image21.png)

但比较Phong模型，我们考虑各个方向的可见性

![](/images/posts/realtimeglobalillumination2/media/image22.png)

且都认为是diffuse的

![](/images/posts/realtimeglobalillumination2/media/image23.png)

![](/images/posts/realtimeglobalillumination2/media/image24.png)

我们将可见性从渲染方程拆出来

![](/images/posts/realtimeglobalillumination2/media/image25.png)

然后分别求解积分

![](/images/posts/realtimeglobalillumination2/media/image26.png)

对于这个拆分，我们可以认为f（x）做一个在g（x）定义域内的加权平均

在AO总因为G是常数，那么就是完全准确的（虽然G不准确）

![](/images/posts/realtimeglobalillumination2/media/image27.png)

在拆分的时候我们引入了一个cos项

![](/images/posts/realtimeglobalillumination2/media/image28.png)

Cos的积分实际上就是半球投影到平面的面积

![](/images/posts/realtimeglobalillumination2/media/image29.png)

我们实际上是把cos项和dw合在一起作为微元

![](/images/posts/realtimeglobalillumination2/media/image30.png)

我们把常数直接提出来就拿到一个积分式子

![](/images/posts/realtimeglobalillumination2/media/image31.png)

但是怎么做可见性

在OS里面，我们可以直接发光线

在SS里面我们需要一个pass完成

![](/images/posts/realtimeglobalillumination2/media/image32.png)

我们限制一个范围，不考虑更远处的可见性，但这样效果会不好

![](/images/posts/realtimeglobalillumination2/media/image33.png)

在ssao里面，我们直接在着色点范围内随机采样点，判断其能不能被着色点看见

我们直接拿深度图查询，类似shadowmap

![](/images/posts/realtimeglobalillumination2/media/image34.png)

早期没有法线查询的时候才使用整个球范围采样，现在理论上可以只采样法线半球，也可以只有在至少一半点被遮挡后才开始考虑AO

![](/images/posts/realtimeglobalillumination2/media/image35.png)

没有法线，也会导致不能做加权

![](/images/posts/realtimeglobalillumination2/media/image36.png)

还可能因为采样半球半径的问题导致一些false

![](/images/posts/realtimeglobalillumination2/media/image37.png)

越多采样数更准，开销更大，为了减少开销，我们可以先得到一个有noisy的ssao，然后做降噪处理

![](/images/posts/realtimeglobalillumination2/media/image38.png)

如果有法线信息，我们可以直接对半球采样，且使用cos加权