---
title: "SDF与环境光渲染"
date: "2026-04-09"
excerpt: "![](/images/posts/realtime-sdf-envlight/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtime-sdf-envlight/media/image1.png)

SDF（有向距离场）非常快

![](/images/posts/realtime-sdf-envlight/media/image2.png)

距离函数表示一个点到物体的距离，而且是有方向的

![](/images/posts/realtime-sdf-envlight/media/image3.png)

SDF可以表示物体的边界，因此对SDF插值可以得到一个边界的移动

![](/images/posts/realtime-sdf-envlight/media/image4.png)

SDF和最优传输有关

![](/images/posts/realtime-sdf-envlight/media/image5.png)

SDF最简单的用法的RayMatching，因为SDF可以快速查询到光线最安全的前进距离

![](/images/posts/realtime-sdf-envlight/media/image6.png)

用SDF做阴影，可以查到一条光线的安全角度

![](/images/posts/realtime-sdf-envlight/media/image7.png)

只需要算出最大的夹角就可以了

![](/images/posts/realtime-sdf-envlight/media/image8.png)

实际上只用比值就能得到一个相对大小

![](/images/posts/realtime-sdf-envlight/media/image9.png)

K值越大，可以认为过渡带越小

![](/images/posts/realtime-sdf-envlight/media/image10.png)

![](/images/posts/realtime-sdf-envlight/media/image11.png)

![](/images/posts/realtime-sdf-envlight/media/image12.png)

SDF快且质量高，但是不易存储，需要预计算而且计算动态物体很复杂

![](/images/posts/realtime-sdf-envlight/media/image13.png)

SDF还可以渲染一些文字，且抗锯齿很好

SDF的uv不好做

![](/images/posts/realtime-sdf-envlight/media/image14.png)

环境贴图表示无限远的一些物体发出的光照，主要是作为cubemap或者sphericalmap存储

![](/images/posts/realtime-sdf-envlight/media/image15.png)

环境光照的渲染，可以叫IBL，需要计算出所有在着色点上方方向上的所有光照

![](/images/posts/realtime-sdf-envlight/media/image16.png)

使用蒙特卡洛需要很多采样和计算，而采样会非常慢

![](/images/posts/realtime-sdf-envlight/media/image17.png)

如果BRDF是glossy的，覆盖区域就很小，如果diffuse的，覆盖区域就不大，且变化不大

![](/images/posts/realtime-sdf-envlight/media/image18.png)

根据这个公式，那么对diffuse的来说就可以使用这个近似

![](/images/posts/realtime-sdf-envlight/media/image19.png)

那我们就可以把light项拆出来

![](/images/posts/realtime-sdf-envlight/media/image20.png)

只需要预过滤得到贴图

![](/images/posts/realtime-sdf-envlight/media/image21.png)

那么对于很多方向的光，把着色点作为镜子，查其镜面反射方向的光卷积后的光照，可以近似认为算了所有的光照，因为他们的夹角区别实际不大

![](/images/posts/realtime-sdf-envlight/media/image22.png)

但第二项也要计算积分

![](/images/posts/realtime-sdf-envlight/media/image23.png)

预计算也会非常麻烦，需要非常大的空间（五维）来存储

![](/images/posts/realtime-sdf-envlight/media/image24.png)

我们主要要解决F项和D项

![](/images/posts/realtime-sdf-envlight/media/image25.png)

那么D和F项可以当成一个三个参数的预计算（R0，Θ，a）

![](/images/posts/realtime-sdf-envlight/media/image26.png)

然后把R0拆出来

![](/images/posts/realtime-sdf-envlight/media/image27.png)

然后就只需要这个只需要两个参数的图来采样就能得到一个近似的结果

![](/images/posts/realtime-sdf-envlight/media/image28.png)

也可以用求和来表达

![](/images/posts/realtime-sdf-envlight/media/image29.png)