---
title: "Day30"
date: "2025-04-23"
excerpt: "![](/images/posts/day30/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day30/media/image1.png)

![](/images/posts/day30/media/image2.png)白光分解成彩虹，各种各样的颜色合成其他颜色

![](/images/posts/day30/media/image3.png)

不同波长对应不同折射率，对应不同光谱

![](/images/posts/day30/media/image4.png)

光在不同波长的分布

![](/images/posts/day30/media/image5.png)

![](/images/posts/day30/media/image6.png)

描述不同波长能量分布

![](/images/posts/day30/media/image7.png)

两个SPD可以直接相加（线性）

![](/images/posts/day30/media/image8.png)

颜色是人感知的结果

![](/images/posts/day30/media/image9.png)

眼球将光传给感光细胞

![](/images/posts/day30/media/image10.png)

分为棒状和锥型细胞

锥形细胞感知颜色

![](/images/posts/day30/media/image11.png)

锥形细胞又分为S，M，L三种，三者敏感感知的波长不一样

![](/images/posts/day30/media/image12.png)每个人这三种细胞分布都不一样

![](/images/posts/day30/media/image13.png)

波长的光强和感知程度相乘然后累加不同波长，得到三个数

19. M，L

    ![](/images/posts/day30/media/image14.png)

    然后传给大脑

    ![](/images/posts/day30/media/image15.png)

    所以会有可能不同的波长得到的结果相同

    ![](/images/posts/day30/media/image16.png)所以只需要颜色一样，不需要波长一致

    ![](/images/posts/day30/media/image17.png)

    ![](/images/posts/day30/media/image18.png)

    加色系统

    ![](/images/posts/day30/media/image19.png)

    只需要测出原色的混合比例能得到所需要颜色，就是加色

    ![](/images/posts/day30/media/image20.png)

    也可以给需要得到的颜色加上颜色，等价于原色减去一个颜色（线性性）

    ![](/images/posts/day30/media/image21.png)

    ![](/images/posts/day30/media/image22.png)

    CIE得到如何混合单色光，得到给定的特定颜色

    ![](/images/posts/day30/media/image23.png)

    只需要得到这三个积分，就可以通过RGB调出颜色（颜色匹配函数）

    sRGB

    ![](/images/posts/day30/media/image24.png)

    ![](/images/posts/day30/media/image25.png)

    CIExyz，通过xyz表示颜色，还能通过y表示亮度

    ![](/images/posts/day30/media/image26.png)

    CIExyz将xyz归一化，固定大写Y（亮度），根据X和Z表示颜色，叫色域，是颜色空间可以表示的所有颜色

    ![](/images/posts/day30/media/image27.png)

    ![](/images/posts/day30/media/image28.png)

    ![](/images/posts/day30/media/image29.png)

    sRGB不能表示所有的颜色

    ![](/images/posts/day30/media/image30.png)

    HSV色域（颜色拾取器）

    色调，饱和度，亮度

    ![](/images/posts/day30/media/image31.png)

    ![](/images/posts/day30/media/image32.png)

    CIELAB色域

    a表示红绿

    b表示蓝黄

    L表示亮度

    a和b实际上定义的是互补色

    ![](/images/posts/day30/media/image33.png)

    ![](/images/posts/day30/media/image34.png)

    想象不出偏红的绿色

    人脑会自动产生互补色

    还有个小实验（）

    ![](/images/posts/day30/media/image35.png)

    A和B其实一样亮

    ![](/images/posts/day30/media/image36.png)

    所以颜色实际上就是人脑的感知得到的

    减色系统

    ![](/images/posts/day30/media/image37.png)

    CMYK

    蓝绿，品红，黄色，黑色

    多一个黑色实际上是为了便宜，避免混合彩色墨水

    没有涉及HDR和伽马矫正