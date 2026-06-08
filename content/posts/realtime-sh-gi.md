---
title: "实时全局光照1：球谐函数"
date: "2026-03-15"
excerpt: "![](/images/posts/realtimeglobalillumination1/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtimeglobalillumination1/media/image1.png)

理论上将两项拆成求和形式后是一个n方的计算，但是因为球谐函数的基函数是正交的，也就是只有p=q时乘积才不为0，因此可以变成一个n的计算

![](/images/posts/realtimeglobalillumination1/media/image2.png)

对于glossy的情况，因为其brdf不再是常数，其与观察角度有关

也就是一个向量（两个变量）的函数，那么把渲染方程写成于观察角度相关的的函数，用球谐去近似，就会得到一个矩阵形式的基函数，这样会占很多的存储空间

![](/images/posts/realtimeglobalillumination1/media/image3.png)

Diffuse的计算会比Glossy的计算少一个量级

![](/images/posts/realtimeglobalillumination1/media/image4.png)

对于自反射的光，也可以预计算进球谐里面

![](/images/posts/realtimeglobalillumination1/media/image5.png)

理论上只要在预计算阶段考虑更多次弹射，就能更好的得到表达效果

![](/images/posts/realtimeglobalillumination1/media/image6.png)

我们把light的球谐函数当成光照，对其每一个基函数来计算transpot（因为基函数正交），就得到这个基函数对应的transport，可以使用各种方法来求解，比如路径追踪

![](/images/posts/realtimeglobalillumination1/media/image7.png)

![](/images/posts/realtimeglobalillumination1/media/image8.png)

用球谐函数把环境光拆成light和lighttransport两个部分

对于diffuse做点乘，对glossy做矩阵乘法

但因为存储问题，不适合做glossy的效果，因为表达高频信息需要很多阶

![](/images/posts/realtimeglobalillumination1/media/image9.png)

同时场景不能改变，如果预计算了brdf，就不能改变物体材质

同时还有存储的问题

![](/images/posts/realtimeglobalillumination1/media/image10.png)

后续有有：

使用别的基函数

多拆几项，把点乘做成两个点乘

让场景一定程度动起来

允许材质动态切换

做别的材质，如半透明，头发

把预计算做成解析解，避免预计算

![](/images/posts/realtimeglobalillumination1/media/image11.png)

除了球谐，还有小波函数，球面高斯函数，等等

![](/images/posts/realtimeglobalillumination1/media/image12.png)

小波函数是把一个函数投到小波函数上，每个基函数都有系数，可以取较大的系数的基函数来存储来方便压缩，还支持存储高频信息，同时为了能够方便表示，环境光使用cubemap来存储

![](/images/posts/realtimeglobalillumination1/media/image13.png)

![](/images/posts/realtimeglobalillumination1/media/image14.png)

相同的存储量，小波能更好的存储高频信息，但是小波不像球谐一样支持旋转，需要重新计算

![](/images/posts/realtimeglobalillumination1/media/image15.png)

全局光照，要先考虑光源直接照到的点作为次级光源来反射光，视作次级光源，次级光源因为需要考虑有没有被照亮，可以使用shadowmap查询得到，然后需要考虑每个点发射出的光的贡献

![](/images/posts/realtimeglobalillumination1/media/image16.png)

把sm的每个像素视作一个小的面光源，假设其表面都是diffuse的，向所有方向反射光相同，就能对任意点p做次级光的渲染

![](/images/posts/realtimeglobalillumination1/media/image17.png)

因为光源太多，点采样每个光源，不如使用光源采样每个像素

![](/images/posts/realtimeglobalillumination1/media/image18.png)

因为假设发光的点是diffuse的，那么可以把公式化简为![](/images/posts/realtimeglobalillumination1/media/image19.png)

只需要光源的irradience和两个点的坐标以及法线就能得到

但这样有个问题，不能判断次级光源能不能照亮某个点，这是很难计算的，因此默认能照亮

![](/images/posts/realtimeglobalillumination1/media/image20.png)

可以认为离渲染点较近的光源才有贡献，那么就可以考虑采样，就类似于sm的PCSS

![](/images/posts/realtimeglobalillumination1/media/image21.png)

![](/images/posts/realtimeglobalillumination1/media/image22.png)

那么SM就需要存储更多的数据，深度，世界坐标，法线，flux

![](/images/posts/realtimeglobalillumination1/media/image23.png)

RSM最场景的应用就是手电筒

![](/images/posts/realtimeglobalillumination1/media/image24.png)

RSM最大优点就是容易实现，但有很多问题，每一个直接光源都要做一个RSM，不在乎可见性，会影响真实感，有了太多近似，如默认diffuse，效果和采样数量挂钩