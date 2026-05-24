---
title: "GAMES101 材质与外观"
date: "2025-04-18"
excerpt: "![](/images/posts/day26/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day26/media/image1.png)

材质和外观

![](/images/posts/day26/media/image2.png)

材质定义反射

则![](/images/posts/day26/media/image3.png)

![](/images/posts/day26/media/image4.png)

![](/images/posts/day26/media/image5.png)

漫反射:任何光线进来都均匀的打出去且不吸收任何光，入射出射

算出BRDF=1/Π

定义albedo（反射率）在0到1之间，brdf=albedo/Π

![](/images/posts/day26/media/image6.png)类镜面反射

![](/images/posts/day26/media/image7.png)左图（glossy）

![](/images/posts/day26/media/image8.png)类水面或玻璃

![](/images/posts/day26/media/image9.png)左图，右图有颜色是因为在玻璃中某个颜色的光被吸收

![](/images/posts/day26/media/image10.png)

反射定律

![](/images/posts/day26/media/image11.png)

![](/images/posts/day26/media/image12.png)镜面反射材质

![](/images/posts/day26/media/image13.png)光的折射

右下的海水的亮斑叫costics（听的发音），国内叫交散

![](/images/posts/day26/media/image14.png)折射定律

光线与法线夹角的正弦在当前材质内的折射率相乘的值与折射后的光线与法线夹角的正弦在另一材质内的折射率相乘的值相等

![](/images/posts/day26/media/image15.png)计算余弦值(如果得不到实数结果，则不发生折射（全反射）

![](/images/posts/day26/media/image16.png)这种情况

![](/images/posts/day26/media/image17.png)

折射可以称为BTDF

BRDF+BTDF=BSDF；

![](/images/posts/day26/media/image18.png)

垂直看几乎没有反射，水平看能看到反射

（菲涅尔项）

![](/images/posts/day26/media/image19.png)

S和P表示光的极化现象（一般不考虑）

![](/images/posts/day26/media/image20.png)金属的菲涅尔项

![](/images/posts/day26/media/image21.png)

菲涅尔项计算公式

![](/images/posts/day26/media/image22.png)有一个近似

![](/images/posts/day26/media/image23.png)

微表面材质

![](/images/posts/day26/media/image24.png)

![](/images/posts/day26/media/image25.png)

近处的几何，远处是材质

![](/images/posts/day26/media/image26.png)

可以通过微表面得到法线分布表示粗糙程度

![](/images/posts/day26/media/image27.png)

菲涅尔项计算反射量

Shadowing-masking项防止表面之间的遮挡

法线分布项决定到底是怎么反射

因为是基于物理的，所以非常真实

![](/images/posts/day26/media/image28.png)![](/images/posts/day26/media/image29.png)

![](/images/posts/day26/media/image30.png)描述木头更复杂

![](/images/posts/day26/media/image31.png)

各向同性和各向异性

![](/images/posts/day26/media/image32.png)

![](/images/posts/day26/media/image33.png)

旋转立体角得到结果不一样

![](/images/posts/day26/media/image34.png)

![](/images/posts/day26/media/image35.png)布料

BRDF的性质

![](/images/posts/day26/media/image36.png)

非负性，线性性

![](/images/posts/day26/media/image37.png)可逆性，能量守恒

![](/images/posts/day26/media/image38.png)

各向同性的BRDF可以写成三个参数，具有可逆性，不用考虑方位角谁大谁小

![](/images/posts/day26/media/image39.png)

测量菲涅尔项，能减少模型的推导

![](/images/posts/day26/media/image40.png)测量过程

![](/images/posts/day26/media/image41.png)![](/images/posts/day26/media/image42.png)

理论上穷举所有情况就能得到BRDF

但这样数据会过多

可以考虑根据各向同性来减少测量

或者根据得到的数据计算出剩下的数据

![](/images/posts/day26/media/image43.png)

存储的要求

![](/images/posts/day26/media/image44.png)BRDF的一个库