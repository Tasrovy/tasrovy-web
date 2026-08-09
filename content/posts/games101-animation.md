---
title: "Day31"
date: "2025-04-24"
excerpt: "![](/images/posts/games101-animation/media/image1.png)![](/images/posts/games101-animation/media/image2.png)"
category: "GAMES101"
---

![](/images/posts/games101-animation/media/image1.png)![](/images/posts/games101-animation/media/image2.png)

![](/images/posts/games101-animation/media/image3.png)

动画就是把东西变活

就是给画面加上时间的参数

![](/images/posts/games101-animation/media/image4.png)

略

![](/images/posts/games101-animation/media/image5.png)

关键帧动画

![](/images/posts/games101-animation/media/image6.png)

给定一系列帧，中间进行插值

![](/images/posts/games101-animation/media/image7.png)

![](/images/posts/games101-animation/media/image8.png)

需要好的插帧方式

![](/images/posts/games101-animation/media/image9.png)

物理仿真（模拟物体公式）

![](/images/posts/games101-animation/media/image10.png)例如牛顿定律

![](/images/posts/games101-animation/media/image11.png)

![](/images/posts/games101-animation/media/image12.png)流体仿真

![](/images/posts/games101-animation/media/image13.png)

质点弹簧系统

![](/images/posts/games101-animation/media/image14.png)

![](/images/posts/games101-animation/media/image15.png)

理想化的弹簧，没有长度，力大小与距离成正比

![](/images/posts/games101-animation/media/image16.png)

实际上有原长，需要通过归一化得到方向，然后考虑拉开长度，但最终会永远运行下去

![](/images/posts/games101-animation/media/image17.png)需要加上一个摩檫力，与运动速度成正比

![](/images/posts/games101-animation/media/image18.png)

摩檫力描述不了内力，如果两端都在运动的话，所以

![](/images/posts/games101-animation/media/image19.png)考虑两端点之间的相对速度

同时考虑了速度的方向

![](/images/posts/games101-animation/media/image20.png)

模拟物体

![](/images/posts/games101-animation/media/image21.png)

模拟一块布的话，会发生切变，变窄

![](/images/posts/games101-animation/media/image22.png)

可以添加对角线的弹簧，避免切变，但不对称了，所以另一边再加一条

![](/images/posts/games101-animation/media/image23.png)

但无法处理非平面的力

![](/images/posts/games101-animation/media/image24.png)

所以把每个点与其相隔的那个点相连，从而不会被弯曲

除了质点弹簧系统，还有有限元方法

![](/images/posts/games101-animation/media/image25.png)

描述力的传播？

![](/images/posts/games101-animation/media/image26.png)

粒子系统

![](/images/posts/games101-animation/media/image27.png)

定义粒子会受到的力，然后只需要模拟

![](/images/posts/games101-animation/media/image28.png)

不好找出周围粒子，需要加速结构

总之是难度大

![](/images/posts/games101-animation/media/image29.png)

粒子动画每一帧都要创建新粒子，计算每个粒子受到的力，更新坐标，减去死亡的粒子，然后渲染

![](/images/posts/games101-animation/media/image30.png)

需要考虑各种各样的力和作用

![](/images/posts/games101-animation/media/image31.png)

模拟星云（需要描述各种各样的关系），先模拟后渲染

![](/images/posts/games101-animation/media/image32.png)

群体中的个体实际上都能被称为粒子

![](/images/posts/games101-animation/media/image33.png)鸟群为例

需要考虑吸引，斥力，方向等

![](/images/posts/games101-animation/media/image34.png)

运动学

![](/images/posts/games101-animation/media/image35.png)

定义关节，pin只能在一个平面内旋转

Ball可以在球内任意旋转

Prismatic joint可以拉伸

![](/images/posts/games101-animation/media/image36.png)

正向的运动学，方便控制，很好计算位置，例如模拟行走

![](/images/posts/games101-animation/media/image37.png)、

但是定义太物理了，要调角度，不够艺术（

![](/images/posts/games101-animation/media/image38.png)

所以有了逆运动学

![](/images/posts/games101-animation/media/image39.png)

解难度有点大，而且解不唯一

![](/images/posts/games101-animation/media/image40.png)

![](/images/posts/games101-animation/media/image41.png)还有可能无解

![](/images/posts/games101-animation/media/image42.png)

所以需要优化梯度下降法，牛顿法等（都不知道）

![](/images/posts/games101-animation/media/image43.png)绑定（应该是）

![](/images/posts/games101-animation/media/image44.png)

就像木偶，给不同地方不同的控制点，决定某个点能控制哪些点

感觉像神经，类似于有些手势正常人是做不出来的，因为人体的绑定（

![](/images/posts/games101-animation/media/image45.png)

直接用控制点插值

![](/images/posts/games101-animation/media/image46.png)

动捕

![](/images/posts/games101-animation/media/image47.png)

真人身上的控制点反映到虚拟人物上

![](/images/posts/games101-animation/media/image48.png)

贴近真实，而且快

但是复杂且花费高，且真人不一定能满足艺术家需要，数据也不一定好

![](/images/posts/games101-animation/media/image49.png)

通过球识别控制点 通过磁力 通过机械记录

![](/images/posts/games101-animation/media/image50.png)

使用很多相机和高刷去录制

![](/images/posts/games101-animation/media/image51.png)

![](/images/posts/games101-animation/media/image52.png)

对时间进行查询数据

![](/images/posts/games101-animation/media/image53.png)

会产生恐怖谷效应（过于像人又不是人）

![](/images/posts/games101-animation/media/image54.png)

面部动捕

![](/images/posts/games101-animation/media/image55.png)

流水线