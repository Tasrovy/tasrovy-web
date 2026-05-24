---
title: "GAMES101 3D变换"
date: "2025-03-24"
excerpt: "![](/images/posts/day3/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day3/media/image1.png)

3D Transformation

1.  绕轴旋转![](/images/posts/day3/media/image2.png)

    y的旋转不一样是因为ZxX得到Y；

2.  任意旋转![](/images/posts/day3/media/image3.png)

3.  ![](/images/posts/day3/media/image4.png)

    ![](/images/posts/day3/media/image5.png)

    投影：mvp矩阵

    观测

    规定相机始终在原点，朝向-Z看，up始终是+y

    ![](/images/posts/day3/media/image6.png)

    将一个在e，朝向g，up是t的摄像机移动到规定位置

<!-- -->

1.  移动-e；

2.  将g移到-z，t移到+y，同时(-Z)叉乘(+y)移到+x；

3.  2的矩阵表达等价于将+x移到(-Z)叉乘(+y)，+y移到t，-z移到g的矩阵的逆矩阵；

4.  ![](/images/posts/day3/media/image7.png)

    从而得到能计算出所有物体的位置的矩阵

    ![](/images/posts/day3/media/image8.png)投影矩阵

    分为正交和透视矩阵

    例：![](/images/posts/day3/media/image9.png)

    正交：类似忽略一个轴

    ![](/images/posts/day3/media/image10.png)

    正则立方体：

    每条边都是2，中心是原点

    ![](/images/posts/day3/media/image11.png)

    ![](/images/posts/day3/media/image12.png)

    投影：

    ![](/images/posts/day3/media/image13.png)

    平行线也可能相交

    ![](/images/posts/day3/media/image14.png)

    ![](/images/posts/day3/media/image15.png)

    将远处进行缩放，在等价于正交投影

    ![](/images/posts/day3/media/image16.png)

    ![](/images/posts/day3/media/image17.png)

    ![](/images/posts/day3/media/image18.png)

    解得A=n+f;B=-nf;

    上式表示近平面所有点不变，下式表示远平面中心点不变

    ![](/images/posts/day3/media/image19.png)

    问：中点是变换之后是更近了还是更远了

    答：变换后是（n+f）\*（n+f）/2-nf=（n\*n+f\*f）/2

    到远处距离=f-（n\*n+f\*f）/2

    到近处距离=（n\*n+f\*f）/2-n

    远-近=n+f-n\*n-f\*f，需要具体情况具体分析