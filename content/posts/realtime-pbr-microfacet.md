---
title: "PBR微表面BRDF"
date: "2026-05-19"
excerpt: "![](/images/posts/realtime-pbr-microfacet/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtime-pbr-microfacet/media/image1.png)

![](/images/posts/realtime-pbr-microfacet/media/image2.png)

![](/images/posts/realtime-pbr-microfacet/media/image3.png)

![](/images/posts/realtime-pbr-microfacet/media/image4.png)

![](/images/posts/realtime-pbr-microfacet/media/image5.png)

![](/images/posts/realtime-pbr-microfacet/media/image6.png)

这节主要讲PBR的两种BRDF，微表面模型和迪士尼规则的BRDF

PBR理论上应该是包括所有和渲染有关的部分都应该基于物理，如材质，光照，摄像机，光的传播等，但是通常PBR指PBR的材质

PBR在实时渲染的材质种类会比离线渲染少，而且不会很物理（，比如头发在实时渲染不能很好的模拟

PBR对于表面模型主要是微表面的BRDF（如果用错了就不是很PBR了）和迪斯尼原则的BRDF（适合给艺术家调效果，但也不是很物理）

对于体积，如一些会透光的云雾，头发，皮肤等，需要考虑快速估计光的单次和多次作用的效果

PBR的理论实际上离线渲染都已经有了，只是为了在实时渲染中实现需要很多hack，都是为了性能的考量

![](/images/posts/realtime-pbr-microfacet/media/image7.png)

![](/images/posts/realtime-pbr-microfacet/media/image8.png)

![](/images/posts/realtime-pbr-microfacet/media/image9.png)

菲涅尔项描述光的反射的多少

![](/images/posts/realtime-pbr-microfacet/media/image10.png)

完全物理的公式，计算会很麻烦，一般会使用一个估计

![](/images/posts/realtime-pbr-microfacet/media/image11.png)![](/images/posts/realtime-pbr-microfacet/media/image12.png)

对于法线，分布越分散（粗糙），就会越diffuse

![](/images/posts/realtime-pbr-microfacet/media/image13.png)

对于法线分布函数，实时渲染用的近似主要是两种，Beckmann和GGX

![](/images/posts/realtime-pbr-microfacet/media/image14.png)

Beckmann类似于正态分布，但是是一个各项同性的定义在坡度空间的函数，也就是方向和法线对于球的切面的交点到法线顶点的距离，因为这样无论多远，角度都在90度以内，这样就能始终保持没有微表面面朝下

除法的系数实际上是为了保持其在法线平面上的积分为1

![](/images/posts/realtime-pbr-microfacet/media/image15.png)

GGX和Beckmann相比，有一个主要的特性就是长尾，虽然也会很快衰减，但最后不会很快衰减到0，也就是有一个更好的光晕效果

![](/images/posts/realtime-pbr-microfacet/media/image16.png)

![](/images/posts/realtime-pbr-microfacet/media/image17.png)

迪士尼的B B改良了GGX变成了GTR，实现了更多类型的长尾，且在γ很大的时候近似becnmann

![](/images/posts/realtime-pbr-microfacet/media/image18.png)

对于G项，其是为了描述微表面自遮挡的现象，因为光线和视线都会被 挡住，所以也可以把G项叫做Shadowing-Masking Term，来让光照变暗

![](/images/posts/realtime-pbr-microfacet/media/image19.png)

其可以实现在掠面角的时候避免太过亮

![](/images/posts/realtime-pbr-microfacet/media/image20.png)

我们认为G项可以近似成光线和视线分别与微表面模型的遮挡的乘积，对于微表面的法线分布，可以选不同的近似，有不同的效果，但都是在掠面角的时候都近似0

![](/images/posts/realtime-pbr-microfacet/media/image21.png)

但这样会有一个情况，随着粗糙度上升，物体越来越暗了

通过白炉测试可以观察到光的损失

![](/images/posts/realtime-pbr-microfacet/media/image22.png)

因为粗糙度越高，微表面的光越容易被挡住，这些反射光会被忽略，计算补正的方法存在，但是在实时渲染里面是不能接受的，太慢了

但只需要认为被挡住，就会发生下一次弹射，那么我们有了

![](/images/posts/realtime-pbr-microfacet/media/image23.png)

![](/images/posts/realtime-pbr-microfacet/media/image24.png)

对于积分，我们需要有一个BRDF来让原来的积分与其相加后为1

![](/images/posts/realtime-pbr-microfacet/media/image25.png)

对于这个BRDF，Eavg不好求解，我们使用splitsum拆开，然后发现其与μ0和roughness有关，然后就可以通过预计算得到

![](/images/posts/realtime-pbr-microfacet/media/image26.png)

这样让roughness大的物体变亮了

![](/images/posts/realtime-pbr-microfacet/media/image27.png)

如果BRDF有颜色，会吸收能量，所以本身就会有能量损失，我们做一个近似的菲涅尔项，认为一次有这些能量损失了（不在乎入射方向）

![](/images/posts/realtime-pbr-microfacet/media/image28.png)

最后我们得到了准确的颜色项，然后乘到原来没有损失的BRDF上

![](/images/posts/realtime-pbr-microfacet/media/image29.png)

![](/images/posts/realtime-pbr-microfacet/media/image30.png)

用一个diffuse来模拟损失的能量（应该是认为多次反射就是diffuse的，然后做一个系数补正），被闫教授切割了，完全错误，能量也不守恒