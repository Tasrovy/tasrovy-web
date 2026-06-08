---
title: "Day8"
date: "2025-03-27"
excerpt: "作业二也可以写了；"
category: "GAMES101"
---

作业二也可以写了；

<span class="mark">static bool insideTriangle(int x, int y, const Vector3f\* \_v)</span>

<span class="mark">{</span>

<span class="mark">// TODO : Implement this function to check if the point (x, y) is inside the triangle represented by \_v\[0\], \_v\[1\], \_v\[2\]</span>

<span class="mark">Vector3f v = Vector3f(x, y, 0);</span>

<span class="mark">Vector3f e1 = \_v\[1\] - \_v\[0\];</span>

<span class="mark">Vector3f e2 = \_v\[2\] - \_v\[1\];</span>

<span class="mark">Vector3f e3 = \_v\[0\] - \_v\[2\];</span>

<span class="mark">Vector3f\* p\[3\] = {&e1, &e2, &e3};</span>

<span class="mark">for (int i = 0; i \< 3; ++i) {</span>

<span class="mark">Vector3f pvec = p\[i\]-\>cross(v - \_v\[i\]);</span>

<span class="mark">if (pvec.z() \< 0) {</span>

<span class="mark">return false;</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">return true;</span>

<span class="mark">}</span>

<span class="mark">三次叉乘检验均通过说明在三角形内部</span>

<span class="mark">//Screen space rasterization</span>

<span class="mark">void rst::rasterizer::rasterize_triangle(const Triangle& t) {</span>

<span class="mark">auto v = t.toVector4();</span>

<span class="mark">// TODO : Find out the bounding box of current triangle.</span>

<span class="mark">// iterate through the pixel and find if the current pixel is inside the triangle</span>

<span class="mark">for (int x = 0; x \< width; ++x) {</span>

<span class="mark">for (int y = 0; y \< height; ++y) {</span>

<span class="mark">if (insideTriangle(x, y, t.v)) {</span>

<span class="mark">// 计算重心坐标</span>

<span class="mark">auto \[alpha, beta, gamma\] = computeBarycentric2D(x, y, t.v);</span>

<span class="mark">float w_reciprocal = 1.0 / (alpha / v\[0\].w() + beta / v\[1\].w() + gamma / v\[2\].w());</span>

<span class="mark">float z_interpolated = alpha \* v\[0\].z() / v\[0\].w() + beta \* v\[1\].z() / v\[1\].w() + gamma \* v\[2\].z() / v\[2\].w();</span>

<span class="mark">z_interpolated \*= w_reciprocal;</span>

<span class="mark">// 深度测试</span>

<span class="mark">int index = get_index(x, y);</span>

<span class="mark">if (z_interpolated \< depth_buf\[index\]) {</span>

<span class="mark">depth_buf\[index\] = z_interpolated;</span>

<span class="mark">set_pixel(Eigen::Vector3f(x, y, 0), t.getColor());</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">auto \[alpha, beta, gamma\] = computeBarycentric2D(x, y, t.v);</span>

<span class="mark">C++14好像不行，我用的C++</span>

当像素在三角形内部时，调用computeBarycentric2D函数计算该像素相对于三角形三个顶点的重心坐标。重心坐标是用于插值计算像素颜色和深度的重要参数。

通过重心坐标，代码计算出该像素在屏幕空间中的深度值z_interpolated。此处使用了透视除法（perspective division），并考虑了每个顶点的齐次坐标分量w，确保了正确的深度插值。

直接给的，不清楚是为什么，AI是这么说的

<span class="mark">深度测试我的理解就是计算哪个三角形在该点更在前，就画哪个</span>