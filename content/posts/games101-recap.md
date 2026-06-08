---
title: "GAMES101 复习总结"
date: "2026-02-28"
excerpt: "复习一下games101"
category: "实时渲染"
---

复习一下games101

![](/images/posts/games101-recap/media/image1.png)

渲染管线，OpenGL，OpenGL的着色器语言，渲染方程，微积分

![](/images/posts/games101-recap/media/image2.png)

渲染管线接收3D空间中的顶点数据，经过顶点处理阶段（主要是MVP矩阵变换）得到在屏幕空间中离散的点，根据原本在3D空间中的连接关系重新连接成三角形，然后通过光栅化阶段确定哪些实际像素在三角形内，对这些像素执行片元着色器后得到结果并利用Z-Buffer(深度缓存)处理好遮挡关系（这两个操作谁先谁后都有说法），然后将这些像素显示到屏幕上（如果使用MSAA就像画一张分辨率更高的画，最后会压画质显示，但效果比直接在低分辨率上显示更好）

![](/images/posts/games101-recap/media/image3.png)

OpenGL是一系列api合集来在cpu端调用GPU渲染管线

![](/images/posts/games101-recap/media/image4.png)

有非常多的版本，每个版本之间不一定互通，是c语言风格的API，不好用，不方便Debug

![](/images/posts/games101-recap/media/image5.png)

类似于油画

![](/images/posts/games101-recap/media/image6.png)

1.  要将指定渲染物体的顶点数据如坐标，法线，纹理坐标等传到GPU，叫做VBO。

    transform等矩阵可以通过opengl自带的函数得到

    ![](/images/posts/games101-recap/media/image7.png)

2.  通过自带的函数来得到View变换矩阵，通过创建或者使用framebuffer来承载计算的结果

    ![](/images/posts/games101-recap/media/image8.png)

3.  可以将多种结果放到一个framebuffer里面，如深度，法线，颜色等

    ![](/images/posts/games101-recap/media/image9.png)![](/images/posts/games101-recap/media/image10.png)

4.  并行地根据顶点着色器处理顶点数据，opengl执行光栅化后根据每个片元的数据并行执行片元着色器，深度测试opengl可以自行处理，也可以自定义

    ![](/images/posts/games101-recap/media/image11.png)

    也就是指定好物体，摄像机，MVP矩阵，framebuffer，输入输出纹理以及顶点和片元着色器，就可以开始渲染了

    ![](/images/posts/games101-recap/media/image12.png)

    一个场景可以执行多个pass，比如先生成shadowmap，再渲染实际场景

    ![](/images/posts/games101-recap/media/image13.png)

    着色器语言是类似于C语言的一种语言，早期只能写汇编在GPU上，后来有了各种语言来编译得到汇编指令，现在主要是DX的HLSL和opengl的GLSL，应该还有apple的MSL

    ![](/images/posts/games101-recap/media/image14.png)

    首先要创建shader，然后将其编译，将其附到程序上，再链接，最后使用

    Shader只是一连串字符串，步骤实际上和普通程序编译差不多

    ![](/images/posts/games101-recap/media/image15.png)

    Opengl典型的shader创建过程

    ![](/images/posts/games101-recap/media/image16.png)

    链接过程

    ![](/images/posts/games101-recap/media/image17.png)

    现在主要是使用Nsight graphics和renderdoc来debug

    也可以把值当作颜色渲染出来

    ![](/images/posts/games101-recap/media/image18.png)

    输出光线等于自发光加上其反射的光

    ![](/images/posts/games101-recap/media/image19.png)

    实时渲染中还需要考虑可见性

    ![](/images/posts/games101-recap/media/image20.png)

    还有环境光，通常是用环境光贴图表示