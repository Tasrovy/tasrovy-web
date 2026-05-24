---
title: "GAMES101 路径追踪调试"
date: "2025-04-17"
excerpt: "![](/images/posts/day25/media/image1.png)"
category: "GAMES101"
---

![](/images/posts/day25/media/image1.png)

![](/images/posts/day25/media/image2.png)![](/images/posts/day25/media/image3.png)

一开始还以为是自己castRay写错了，在网上查了半天，结果是IntersectP需要考虑误差

首先修改Render（）成多线程

![](/images/posts/day25/media/image4.png)

其实只是打开了openmp（十三分钟变成六秒了）

![](/images/posts/day25/media/image5.png)

右键解决方案点击属性

但是OpenMP会导致原来的m++访问出错，所以要绕开m，直接计算像素位置

![](/images/posts/day25/media/image6.png)

因为场景中存在平面，不好比较tmin和tmax，所以tmax要加上一个0.00016f

这位置硬控我好久，不加会变成

![](/images/posts/day25/media/image7.png)

getIntersection不需要修改

然后是这次的代码

<span class="mark">// Implementation of Path Tracing</span>

<span class="mark">Vector3f Scene::castRay(const Ray& ray, int depth) const {</span>

<span class="mark">Intersection insec = intersect(ray);</span>

<span class="mark">if (insec.happened) {</span>

<span class="mark">Vector3f hitPoint = insec.coords;</span>

<span class="mark">Vector3f hitNormal = insec.normal;</span>

<span class="mark">Vector3f wo = normalize(ray.direction);</span>

<span class="mark">Vector3f L_dir(0), L_indir(0);</span>

<span class="mark">// 交点偏移（防止自相交）</span>

<span class="mark">Vector3f offsetPoint = (dotProduct(wo, hitNormal) \< 0) ?hitPoint + hitNormal \* EPSILON :hitPoint - hitNormal \* EPSILON;</span>

<span class="mark">// 采样光源</span>

<span class="mark">float pdf_light;</span>

<span class="mark">Intersection lightInsec;</span>

<span class="mark">sampleLight(lightInsec, pdf_light);</span>

<span class="mark">Vector3f x = lightInsec.coords;</span>

<span class="mark">Vector3f ws = normalize(x - hitPoint);</span>

<span class="mark">float distance = (x - hitPoint).norm();</span>

<span class="mark">Vector3f NN = lightInsec.normal;</span>

<span class="mark">Vector3f emit = lightInsec.emit;</span>

<span class="mark">// Add the declaration of \`offsetPoint\` before its usage in the \`castRay\` method.</span>

<span class="mark">Vector3f offsetPoint = (dotProduct(wo, hitNormal) \< 0) ? hitPoint + hitNormal \* EPSILON : hitPoint - hitNormal \* EPSILON;</span>

<span class="mark">Ray shadowRay(offsetPoint, ws);</span>

<span class="mark">Intersection shadowInsec = intersect(shadowRay);</span>

<span class="mark">if (shadowInsec.happened &&</span>

<span class="mark">std::abs(shadowInsec.distance - distance) \< 1e-2) {</span>

<span class="mark">float dist2 = distance \* distance;</span>

<span class="mark">L_dir = emit \*</span>

<span class="mark">insec.m-\>eval(wo, ws, hitNormal) \*</span>

<span class="mark">dotProduct(ws, hitNormal) \*</span>

<span class="mark">dotProduct(-ws, NN) /</span>

<span class="mark">(dist2 \* pdf_light);</span>

<span class="mark">}</span>

<span class="mark">// 俄罗斯轮盘采样间接光</span>

<span class="mark">float ksi = get_random_float(); // 0~1 的随机数</span>

<span class="mark">if (ksi \< RussianRoulette) {</span>

<span class="mark">Vector3f wi= normalize(insec.m-\>sample(wo, hitNormal));</span>

<span class="mark">Ray reflRay(offsetPoint, wi);</span>

<span class="mark">Intersection reflInsec = intersect(reflRay);</span>

<span class="mark">if (reflInsec.happened && reflInsec.m != nullptr &&</span>

<span class="mark">!reflInsec.m-\>hasEmission()) {</span>

<span class="mark">float pdf = insec.m-\>pdf(wo, wi, hitNormal);</span>

<span class="mark">if (pdf \> EPSILON) {</span>

<span class="mark">L_indir = castRay(reflRay, depth + 1) \*</span>

<span class="mark">insec.m-\>eval(wo, wi, hitNormal) \*</span>

<span class="mark">dotProduct(wi, hitNormal) /</span>

<span class="mark">(pdf \* RussianRoulette);</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">return insec.m-\>getEmission() + L_dir + L_indir;</span>

<span class="mark">}</span>

<span class="mark">// 没有命中，返回背景色</span>

<span class="mark">return backgroundColor;</span>

<span class="mark">}</span>

只需要按照步骤一步一步来即可

得到![](/images/posts/day25/media/image8.png)

Spp=16

还跑了一张spp=512的

![](/images/posts/day25/media/image9.png)