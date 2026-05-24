---
title: "Day23"
date: "2025-04-15"
excerpt: "作业6"
category: "GAMES101"
---

作业6

![](/images/posts/day23/media/image1.png)

![](/images/posts/day23/media/image2.png)

Render和上次差不多，只需要注意观察点改变不影响方向，同时castRay函数第二个参数表示光线折射次数（max_depth-0）

![](/images/posts/day23/media/image3.png)

Inter都是一些字面的数据

根据triangle和之前的判断就能得到

除了distance，距离实际上是\|<span class="mark">ray.origin + t \* ray.direction;</span>\|，显然t越大，距离越大，同时这个距离的比较显然只在同一条ray上，所以distance可用t表示

![](/images/posts/day23/media/image4.png)

课上的算法，都进入才算进入，离开一个就是离开

满足<span class="mark">t0 \<= t1 && t1 \>= 0就是经过该包围盒</span>

![](/images/posts/day23/media/image5.png)

先初始化一个<span class="mark">Intersection</span>

<span class="mark">若节点不存在则直接返回</span>

<span class="mark">计算incvir和disIsNeg</span>

<span class="mark">若节点的包围盒不与物体相交，直接返回</span>

<span class="mark">若相交，若节点无后续节点，则计算光线与物体相交情况，然后返回</span>

<span class="mark">若有后续节点，则计算光线与后续左右节点的Intersection，取distance更小，即更接近的，返回</span>