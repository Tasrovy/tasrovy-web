---
title: "GAMES101 作业3记录"
date: "2025-04-09"
excerpt: "今天写了作业3"
category: "GAMES101"
---

今天写了作业3

**而在本次实验中，你需要完成的任务是:**

1\. 修改函数 rasterize_triangle(const Triangle& t) in rasterizer.cpp: 在此

处实现与作业 2 类似的插值算法，实现法向量、颜色、纹理颜色的插值。

2\. 修改函数 get_projection_matrix() in main.cpp: 将你自己在之前的实验中

实现的投影矩阵填到此处，此时你可以运行 ./Rasterizer output.png normal

来观察法向量实现结果。

3\. 修改函数 phong_fragment_shader() in main.cpp: 实现 Blinn-Phong 模型计

算 Fragment Color.

4\. 修改函数 texture_fragment_shader() in main.cpp: **在实现 Blinn-Phong**

**的基础上**，将纹理颜色视为公式中的 kd，实现 Texture Shading Fragment

Shader.

5\. 修改函数 bump_fragment_shader() in main.cpp: **在实现 Blinn-Phong 的**

**基础上**，仔细阅读该函数中的注释，实现 Bump mapping.

6\. 修改函数 displacement_fragment_shader() in main.cpp: **在实现 Bump**

**mapping 的基础上**，实现 displacement mapping

1.  插值

    代码如下图

<span class="mark">using namespace std;</span>

<span class="mark">//Screen space rasterization</span>

<span class="mark">void rst::rasterizer::rasterize_triangle(const Triangle& t, const std::array\<Eigen::Vector3f, 3\>& view_pos)</span>

<span class="mark">{</span>

<span class="mark">std::array\<Vector4f, 3\> v = t.toVector4(); float xmin = min(min(v\[0\].x(), v\[1\].x()), v\[2\].x());</span>

<span class="mark">float xmax = max(max(v\[0\].x(), v\[1\].x()), v\[2\].x());</span>

<span class="mark">float ymin = min(min(v\[0\].y(), v\[1\].y()), v\[2\].y());</span>

<span class="mark">float ymax = max(max(v\[0\].y(), v\[1\].y()), v\[2\].y());</span>

<span class="mark">xmin = floor(xmin);</span>

<span class="mark">xmax = ceil(xmax);</span>

<span class="mark">ymin = floor(ymin);</span>

<span class="mark">ymax = ceil(ymax);//这些是为了减小检测范围，不然运行太慢了，单线程好慢</span>

<span class="mark">for (int y = ymin; y \< ymax; y++)</span>

<span class="mark">{</span>

<span class="mark">for (int x = xmin; x \< xmax; x++)</span>

<span class="mark">if (insideTriangle(x, y, v.data())) {</span>

<span class="mark">auto \[alpha, beta, gamma\] = computeBarycentric2D(x, y, v.data());//得到重心坐标</span>

<span class="mark">float Z = 1.0 / (alpha / v\[0\].w() + beta / v\[1\].w() + gamma / v\[2\].w());</span>

<span class="mark">float zp = alpha \* v\[0\].z() / v\[0\].w() + beta \* v\[1\].z() / v\[1\].w() + gamma \* v\[2\].z() / v\[2\].w();</span>

<span class="mark">zp \*= Z;</span>

<span class="mark">//得到当前深度值</span>

<span class="mark">if (zp \< depth_buf\[get_index(x, y)\]) {//判断是否更“靠前”</span>

<span class="mark">//下四行根据顶点属性对每个像素插值</span>

<span class="mark">auto interpolated_color = interpolate(alpha, beta, gamma, t.color\[0\], t.color\[1\], t.color\[2\], 1.0);</span>

<span class="mark">auto interpolated_normal = interpolate(alpha, beta, gamma, t.normal\[0\], t.normal\[1\], t.normal\[2\], 1.0);</span>

<span class="mark">auto interpolated_texcoords = interpolate(alpha, beta, gamma, t.tex_coords\[0\], t.tex_coords\[1\], t.tex_coords\[2\], 1.0);</span>

<span class="mark">auto interpolated_shadingcoords = interpolate(alpha, beta, gamma, view_pos\[0\], view_pos\[1\], view_pos\[2\], 1.0);</span>

<span class="mark">//设置传入着色器的数据</span>

<span class="mark">fragment_shader_payload payload(interpolated_color, interpolated_normal.normalized(), interpolated_texcoords, texture ? &\*texture : nullptr);</span>

<span class="mark">payload.view_pos = interpolated_shadingcoords;</span>

<span class="mark">//得到像素颜色属性</span>

<span class="mark">auto pixel_color = fragment_shader(payload);</span>

<span class="mark">//重新设置深度值</span>

<span class="mark">depth_buf\[get_index(x, y)\] = zp;</span>

<span class="mark">//设置像素当前颜色</span>

<span class="mark">set_pixel(Vector2i(x, y), pixel_color);</span>

<span class="mark">}}}}</span>

2.  <span class="mark">直接使用前两次的矩阵即可</span>

<span class="mark">Eigen::Matrix4f get_projection_matrix(float eye_fov, float aspect_ratio, float zNear, float zFar)</span>

<span class="mark">{</span>

<span class="mark">Eigen::Matrix4f projection = Eigen::Matrix4f::Zero();</span>

<span class="mark">float half_eye_fovY = eye_fov / 2.0f / 180.0f \* MY_PI;</span>

<span class="mark">float top = zNear \* tan(half_eye_fovY);</span>

<span class="mark">float bottom = -top;</span>

<span class="mark">float right = aspect_ratio \* top;</span>

<span class="mark">float left = -right;</span>

<span class="mark">projection(0, 0) = 2 \* zNear / (right - left);</span>

<span class="mark">projection(1, 1) = 2 \* zNear / (top - bottom);</span>

<span class="mark">projection(2, 2) = (zFar + zNear) / (zFar - zNear);</span>

<span class="mark">projection(2, 3) = -2 \* zFar \* zNear / (zFar - zNear);</span>

<span class="mark">projection(3, 2) = -1;</span>

<span class="mark">return projection;</span>

<span class="mark">}</span>

3.  Blinn-Phong 模型实现

<span class="mark">Eigen::Vector3f phong_fragment_shader(const fragment_shader_payload& payload)</span>

<span class="mark">{</span>

<span class="mark">Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);</span>

<span class="mark">Eigen::Vector3f kd = payload.color;//漫反射属性由点原来的颜色决定</span>

<span class="mark">Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);</span>

<span class="mark">auto l1 = light{{20, 20, 20}, {500, 500, 500}};//光源位置和强度</span>

<span class="mark">auto l2 = light{{-20, 20, 0}, {500, 500, 500}};</span>

<span class="mark">std::vector\<light\> lights = {l1, l2};</span>

<span class="mark">Eigen::Vector3f amb_light_intensity{10, 10, 10};//环境光</span>

<span class="mark">Eigen::Vector3f eye_pos{0, 0, 10};//观察点</span>

<span class="mark">float p = 150;//高光用到的常数</span>

<span class="mark">//得到计算phong模型的参数</span>

<span class="mark">Eigen::Vector3f color = payload.color;</span>

<span class="mark">Eigen::Vector3f point = payload.view_pos;</span>

<span class="mark">Eigen::Vector3f normal = payload.normal;</span>

<span class="mark">Eigen::Vector3f result_color = {0, 0, 0};</span>

<span class="mark">for (auto& light : lights)</span>

<span class="mark">{ // TODO: For each light source in the code, calculate what the \*ambient\*, \*diffuse\*, and \*specular\*</span>

<span class="mark">// components are. Then, accumulate that result on the \*result_color\* object.</span>

<span class="mark">Eigen::Vector3f light_dir = (light.position - point).normalized();//负的入射方向</span>

<span class="mark">Eigen::Vector3f view_dir = (eye_pos - point).normalized();//出射方向</span>

<span class="mark">Eigen::Vector3f half_vector = (light_dir + view_dir).normalized();//计算高光用到</span>

<span class="mark">// 距离衰减</span>

<span class="mark">float r2 = (light.position - point).dot(light.position - point);//越远光强越小</span>

<span class="mark">//环境光</span>

<span class="mark">//cwiseProduct()：矩阵点对点相乘</span>

<span class="mark">Eigen::Vector3f La = ka.cwiseProduct(amb_light_intensity);</span>

<span class="mark">//漫反射</span>

<span class="mark">Eigen::Vector3f Ld = kd.cwiseProduct(light.intensity/r2);</span>

<span class="mark">Ld \*= std::max(0.0f, normal.normalized().dot(light_dir));</span>

<span class="mark">//高光</span>

<span class="mark">Eigen::Vector3f Ls = ks.cwiseProduct(light.intensity/r2);</span>

<span class="mark">Ls \*= std::pow(std::max(0.0f, normal.normalized().dot(half_vector)), p);</span>

<span class="mark">result_color += (La + Ld + Ls);//相加</span>

<span class="mark">}</span>

<span class="mark">return result_color \* 255.f;</span>

<span class="mark">}</span>

4.  <span class="mark">读取纹理</span>

<span class="mark">Eigen::Vector3f texture_fragment_shader(const fragment_shader_payload& payload)</span>

<span class="mark">{</span>

<span class="mark">Eigen::Vector3f return_color = {0, 0, 0};</span>

<span class="mark">//只增加了读取纹理上的颜色，然后和3一样</span>

<span class="mark">if (payload.texture)</span>

<span class="mark">{</span>

<span class="mark">// TODO: Get the texture value at the texture coordinates of the current fragment</span>

<span class="mark">return_color = payload.texture-\>getColor(payload.tex_coords.x(), payload.tex_coords.y());</span>

<span class="mark">}</span>

<span class="mark">Eigen::Vector3f texture_color;</span>

<span class="mark">texture_color \<\< return_color.x(), return_color.y(), return_color.z();</span>

<span class="mark">Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);</span>

<span class="mark">Eigen::Vector3f kd = texture_color / 255.f;</span>

<span class="mark">Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);</span>

<span class="mark">auto l1 = light{{20, 20, 20}, {500, 500, 500}};</span>

<span class="mark">auto l2 = light{{-20, 20, 0}, {500, 500, 500}};</span>

<span class="mark">std::vector\<light\> lights = {l1, l2};</span>

<span class="mark">Eigen::Vector3f amb_light_intensity{10, 10, 10};</span>

<span class="mark">Eigen::Vector3f eye_pos{0, 0, 10};</span>

<span class="mark">float p = 150;</span>

<span class="mark">Eigen::Vector3f color = texture_color;</span>

<span class="mark">Eigen::Vector3f point = payload.view_pos;</span>

<span class="mark">Eigen::Vector3f normal = payload.normal;</span>

<span class="mark">Eigen::Vector3f result_color = {0, 0, 0};</span>

<span class="mark">for (auto& light : lights)</span>

<span class="mark">{ // TODO: For each light source in the code, calculate what the \*ambient\*, \*diffuse\*, and \*specular\*</span>

<span class="mark">// components are. Then, accumulate that result on the \*result_color\* object.</span>

<span class="mark">Eigen::Vector3f light_dir = (light.position - point).normalized();</span>

<span class="mark">Eigen::Vector3f view_dir = (eye_pos - point).normalized();</span>

<span class="mark">Eigen::Vector3f half_vector = (light_dir + view_dir).normalized();</span>

<span class="mark">// 距离衰减</span>

<span class="mark">float r2 = (light.position - point).dot(light.position - point);</span>

<span class="mark">//环境光</span>

<span class="mark">//cwiseProduct()：矩阵点对点相乘</span>

<span class="mark">Eigen::Vector3f La = ka.cwiseProduct(amb_light_intensity);</span>

<span class="mark">//漫反射</span>

<span class="mark">Eigen::Vector3f Ld = kd.cwiseProduct(light.intensity / r2);</span>

<span class="mark">Ld \*= std::max(0.0f, normal.normalized().dot(light_dir));</span>

<span class="mark">//高光</span>

<span class="mark">Eigen::Vector3f Ls = ks.cwiseProduct(light.intensity / r2);</span>

<span class="mark">Ls \*= std::pow(std::max(0.0f, normal.normalized().dot(half_vector)), p);</span>

<span class="mark">result_color += (La + Ld + Ls);</span>

<span class="mark">}</span>

<span class="mark">return result_color \* 255.f;</span>

<span class="mark">}</span>

5.  <span class="mark">凹凸纹理实现</span>

    <span class="mark">//只是照着做，并没有讲原因</span>

<span class="mark">Eigen::Vector3f bump_fragment_shader(const fragment_shader_payload& payload)</span>

<span class="mark">{</span>

<span class="mark"></span>

<span class="mark">Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);</span>

<span class="mark">Eigen::Vector3f kd = payload.color;</span>

<span class="mark">Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);</span>

<span class="mark">auto l1 = light{{20, 20, 20}, {500, 500, 500}};</span>

<span class="mark">auto l2 = light{{-20, 20, 0}, {500, 500, 500}};</span>

<span class="mark">std::vector\<light\> lights = {l1, l2};</span>

<span class="mark">Eigen::Vector3f amb_light_intensity{10, 10, 10};</span>

<span class="mark">Eigen::Vector3f eye_pos{0, 0, 10};</span>

<span class="mark">float p = 150;</span>

<span class="mark">Eigen::Vector3f color = payload.color;</span>

<span class="mark">Eigen::Vector3f point = payload.view_pos;</span>

<span class="mark">Eigen::Vector3f normal = payload.normal;</span>

<span class="mark">float kh = 0.2, kn = 0.1;</span>

<span class="mark">// TODO: Implement bump mapping here</span>

<span class="mark">// Let n = normal = (x, y, z)</span>

<span class="mark">// Vector t = (x\*y/sqrt(x\*x+z\*z),sqrt(x\*x+z\*z),z\*y/sqrt(x\*x+z\*z))</span>

<span class="mark">// Vector b = n cross product t</span>

<span class="mark">// Matrix TBN = \[t b n\]</span>

<span class="mark">// dU = kh \* kn \* (h(u+1/w,v)-h(u,v))</span>

<span class="mark">// dV = kh \* kn \* (h(u,v+1/h)-h(u,v))</span>

<span class="mark">// Vector ln = (-dU, -dV, 1)</span>

<span class="mark">// Normal n = normalize(TBN \* ln)</span>

<span class="mark">float x = normal.x();</span>

<span class="mark">float y = normal.y();</span>

<span class="mark">float z = normal.z();</span>

<span class="mark">Eigen::Vector3f t = { x \* y / sqrt(x \* x + z \* z),sqrt(x \* x + z \* z),z \* y / sqrt(x \* x + z \* z) };</span>

<span class="mark">Eigen::Vector3f b = normal.cross(t);</span>

<span class="mark">Eigen::Matrix3f TBN;</span>

<span class="mark">TBN \<\< t, b, normal;</span>

<span class="mark">float u = payload.tex_coords.x();</span>

<span class="mark">float v = payload.tex_coords.y();</span>

<span class="mark">auto du = kh \* kn \* (payload.texture-\>getColor(u + 1.0 / payload.texture-\>width, v).norm() - payload.texture-\>getColor(u, v).norm());</span>

<span class="mark">auto dv = kh \* kn \* (payload.texture-\>getColor(u,v+1.0/payload.texture-\>height).norm() - payload.texture-\>getColor(u, v).norm());</span>

<span class="mark">Eigen::Vector3f ln = {-du, -dv, 1};</span>

<span class="mark">normal=(TBN\*ln).normalized();</span>

<span class="mark">Eigen::Vector3f result_color = {0, 0, 0};</span>

<span class="mark">result_color = normal;</span>

<span class="mark">return result_color \* 255.f;</span>

<span class="mark">}</span>

6.  <span class="mark">偏移贴图</span>

    <span class="mark">//只是照着做，并没有讲原因</span>

<span class="mark">Eigen::Vector3f displacement_fragment_shader(const fragment_shader_payload& payload)</span>

<span class="mark">{</span>

<span class="mark"></span>

<span class="mark">Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);</span>

<span class="mark">Eigen::Vector3f kd = payload.color;</span>

<span class="mark">Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);</span>

<span class="mark">auto l1 = light{{20, 20, 20}, {500, 500, 500}};</span>

<span class="mark">auto l2 = light{{-20, 20, 0}, {500, 500, 500}};</span>

<span class="mark">std::vector\<light\> lights = {l1, l2};</span>

<span class="mark">Eigen::Vector3f amb_light_intensity{10, 10, 10};</span>

<span class="mark">Eigen::Vector3f eye_pos{0, 0, 10};</span>

<span class="mark">float p = 150;</span>

<span class="mark">Eigen::Vector3f color = payload.color;</span>

<span class="mark">Eigen::Vector3f point = payload.view_pos;</span>

<span class="mark">Eigen::Vector3f normal = payload.normal;</span>

<span class="mark">Eigen::Vector3f result_color = { 0, 0, 0 };</span>

<span class="mark">float kh = 0.2, kn = 0.1;</span>

<span class="mark"></span>

<span class="mark">// TODO: Implement displacement mapping here</span>

<span class="mark">// Let n = normal = (x, y, z)</span>

<span class="mark">// Vector t = (x\*y/sqrt(x\*x+z\*z),sqrt(x\*x+z\*z),z\*y/sqrt(x\*x+z\*z))</span>

<span class="mark">// Vector b = n cross product t</span>

<span class="mark">// Matrix TBN = \[t b n\]</span>

<span class="mark">// dU = kh \* kn \* (h(u+1/w,v)-h(u,v))</span>

<span class="mark">// dV = kh \* kn \* (h(u,v+1/h)-h(u,v))</span>

<span class="mark">// Vector ln = (-dU, -dV, 1)</span>

<span class="mark">// Position p = p + kn \* n \* h(u,v)</span>

<span class="mark">// Normal n = normalize(TBN \* ln)</span>

<span class="mark">float x = normal.x();</span>

<span class="mark">float y = normal.y();</span>

<span class="mark">float z = normal.z();</span>

<span class="mark">Eigen::Vector3f t = { x \* y / sqrt(x \* x + z \* z),sqrt(x \* x + z \* z),z \* y / sqrt(x \* x + z \* z) };</span>

<span class="mark">Eigen::Vector3f b = normal.cross(t);</span>

<span class="mark">Eigen::Matrix3f TBN;</span>

<span class="mark">TBN \<\< t, b, normal;</span>

<span class="mark">float u = payload.tex_coords.x();</span>

<span class="mark">float v = payload.tex_coords.y();</span>

<span class="mark">auto du = kh \* kn \* (payload.texture-\>getColor(u + 1.0 / payload.texture-\>width, v).norm() - payload.texture-\>getColor(u, v).norm());</span>

<span class="mark">auto dv = kh \* kn \* (payload.texture-\>getColor(u, v + 1.0 / payload.texture-\>height).norm() - payload.texture-\>getColor(u, v).norm());</span>

<span class="mark">Eigen::Vector3f ln = { -du, -dv, 1 };</span>

<span class="mark">normal = (TBN \* ln).normalized();</span>

<span class="mark">point=point+kn\*normal\*payload.texture-\>getColor(u,v).norm();</span>

<span class="mark"></span>

<span class="mark">for (auto& light : lights)</span>

<span class="mark">{</span>

<span class="mark">// TODO: For each light source in the code, calculate what the \*ambient\*, \*diffuse\*, and \*specular\*</span>

<span class="mark">// components are. Then, accumulate that result on the \*result_color\* object.</span>

<span class="mark">Eigen::Vector3f light_dir = (light.position - point).normalized();</span>

<span class="mark">Eigen::Vector3f view_dir = (eye_pos - point).normalized();</span>

<span class="mark">Eigen::Vector3f half_vector = (light_dir + view_dir).normalized();</span>

<span class="mark">// 距离衰减</span>

<span class="mark">float r2 = (light.position - point).dot(light.position - point);</span>

<span class="mark">//环境光</span>

<span class="mark">//cwiseProduct()：矩阵点对点相乘</span>

<span class="mark">Eigen::Vector3f La = ka.cwiseProduct(amb_light_intensity);</span>

<span class="mark">//漫反射</span>

<span class="mark">Eigen::Vector3f Ld = kd.cwiseProduct(light.intensity / r2);</span>

<span class="mark">Ld \*= std::max(0.0f, normal.normalized().dot(light_dir));</span>

<span class="mark">//高光</span>

<span class="mark">Eigen::Vector3f Ls = ks.cwiseProduct(light.intensity / r2);</span>

<span class="mark">Ls \*= std::pow(std::max(0.0f, normal.normalized().dot(half_vector)), p);</span>

<span class="mark">result_color += (La + Ld + Ls);</span>

<span class="mark">}</span>

<span class="mark">return result_color \* 255.f;</span>

<span class="mark">}</span>