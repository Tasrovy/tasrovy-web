---
title: "实时阴影2：PCF与PCSS"
date: "2026-03-05"
excerpt: "![](/images/posts/realtimeshadow2/media/image1.png)"
category: "实时渲染"
---

![](/images/posts/realtimeshadow2/media/image1.png)

PCF本质上是对可见性做了一个滤波，对于给定点，将其与sm上的对应点及其周围的点均计算一次可见性，根据某种权重将可见性平均，得到结果

![](/images/posts/realtimeshadow2/media/image2.png)

因此并不能滤波得到一个平均深度然后比较得到一个0或1的可见性

也不是把采样点x周围的点的可见性做一个加权平均

![](/images/posts/realtimeshadow2/media/image3.png)

PCSS中影响性能的主要是第一步计算平均深度和第三步做PCF，因为这两步会采样非常多次sm

![](/images/posts/realtimeshadow2/media/image4.png)

PCF类似与在一个班级里面，一场考试后你有了一个成绩，你想要知道自己的排名，就需要一个一个问别的的成绩

![](/images/posts/realtimeshadow2/media/image5.png)

我们假设成绩是成正态分布，那么我们只需要均值和方差就能得到分布

![](/images/posts/realtimeshadow2/media/image6.png)

那么只需要在生成sm的时候额外生成一个深度平方值的sm，根据方差等于平方的均值减去均值的平方，得到分布

![](/images/posts/realtimeshadow2/media/image7.png)

然后根据结果查表得到你的排名，也就可以得到一个PCF值

![](/images/posts/realtimeshadow2/media/image8.png)

但更好的是使用切比雪夫不等式，对于任意分布，保证面积不会超过一个上界

这样表都不用查了

![](/images/posts/realtimeshadow2/media/image9.png)

只需要生成mipmap就行了，其他的步骤都是很快的

因此第三步就基本解决了，但是还有第一步也要加速

![](/images/posts/realtimeshadow2/media/image10.png)

我们需要找到一个区域内遮挡了采样点的所有点的平均深度

![](/images/posts/realtimeshadow2/media/image11.png)

已知了一个范围的平均深度，我们可以根据切比雪夫近似得到深度大于采样点的数量，然后也能得到小于其的深度的数量，根据二者的总深度和和平均深度，那么假设所有比采样点深度深的点的深度都是采样点深度，就能得到比采样点深度浅的平均深度，就能找到blockor平均深度了

![](/images/posts/realtimeshadow2/media/image12.png)

为了能够快速得到一个区域的均值，最直接是使用mipmap

![](/images/posts/realtimeshadow2/media/image13.png)

Mipmap是一个快速近似矩形的处理，各向异性过滤能更好解决其误差大（因为无法对齐区域）的问题

![](/images/posts/realtimeshadow2/media/image14.png)

求范围的平均，与范围内求和几乎等价

对于一个一维数组，可以构建一个sat，sat\[i\]表示数组前i+1个元素之和

这样求一个区域i到j的和，等价于sta\[j\]-sat\[i-1\]

![](/images/posts/realtimeshadow2/media/image15.png)

在二维空间下就是构建二维sat，同样的的方法查4次sat，（a,b）到（c，d）就是sat\[a\]\[b\]+sat\[c\]\[d\]-sat\[a\]\[d\]-sat\[c\]\[b\]

![](/images/posts/realtimeshadow2/media/image16.png)

VSSM在明显不能满足正态分布的情况下误差会很大

![](/images/posts/realtimeshadow2/media/image17.png)

变黑是可以容忍的，但不能容忍变白

![](/images/posts/realtimeshadow2/media/image18.png)

![](/images/posts/realtimeshadow2/media/image19.png)

为了解决分布函数不够准确的问题，可以使用MSM

使用更多的矩![](/images/posts/realtimeshadow2/media/image20.png)（vssm就是只使用了两个矩）

使用矩更多，误差越小，就越准

![](/images/posts/realtimeshadow2/media/image21.png)

m个矩可以描述有m/2个台阶的函数，实际上就是某种展开

一般4个矩就够用了

![](/images/posts/realtimeshadow2/media/image22.png)

生成sm的时候记录四个矩就可以了

![](/images/posts/realtimeshadow2/media/image23.png)

MSM能更好的解决漏光，但使用4个矩来逼近函数的方法非常复杂