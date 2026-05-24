---
title: "Day5"
date: "2025-03-24"
excerpt: "坠机了，本来准备写作业1，但虚拟机经常崩溃，在本机部署，把数学库换成glm，弄了半天，把标准换成c++20，折腾半天还是不行，C++没有包管理器太可恶了。"
category: "GAMES101"
---

坠机了，本来准备写作业1，但虚拟机经常崩溃，在本机部署，把数学库换成glm，弄了半天，把标准换成c++20，折腾半天还是不行，C++没有包管理器太可恶了。

高低把写的贴出来吧

<span class="mark">glm::mat4 get_model_matrix(float rotation_angle)</span>

<span class="mark">{</span>

<span class="mark">glm::mat4 model = glm::mat4(1.0f);</span>

<span class="mark">model\[0\]\[0\]=cos(rotation_angle);</span>

<span class="mark">model\[0\]\[1\]=-sin(rotation_angle);</span>

<span class="mark">model\[1\]\[1\]=cos(rotation_angle);</span>

<span class="mark">model\[1\]\[0\]=sin(rotation_angle);</span>

<span class="mark">return model;</span>

<span class="mark">}</span>

<span class="mark">glm::mat4 get_projection_matrix(float eye_fov, float aspect_ratio,</span>

<span class="mark">float zNear, float zFar)</span>

<span class="mark">{</span>

<span class="mark">// Students will implement this function</span>

<span class="mark">glm::mat4 projection = glm::mat4(1.0f);</span>

<span class="mark">Projection\[0\]\[0\]=zNear;</span>

<span class="mark">Projection\[1\]\[1\]=zNear;</span>

<span class="mark">Projection\[2\]\[2\]=zNear+zFar;</span>

<span class="mark">Projection\[2\]\[3\]=-zNear\*zFar;</span>

<span class="mark">Projection\[3\]\[2\]=1;</span>

<span class="mark">Projection\[3\]\[3\]=0;</span>

<span class="mark">return projection;</span>

<span class="mark">}</span>

<span class="mark">应该 还有缩放问题，虚拟机跑出了一个三角形，但还不能动，明天再搞。</span>