---
title: "GAMES101 投影矩阵调试"
date: "2025-03-26"
excerpt: "<span class=\"mark\">投影矩阵算出来 projection(3, 2) = 1;，但画出来是个倒的，好像说完全相反也正常，释怀了</span>"
category: "GAMES101"
---

<span class="mark">投影矩阵算出来 projection(3, 2) = 1;，但画出来是个倒的，好像说完全相反也正常，释怀了</span>

<span class="mark">任意轴旋转直接套公式就可以了；</span>

<span class="mark">\#include "Triangle.hpp"</span>

<span class="mark">\#include "rasterizer.hpp"</span>

<span class="mark">\#include \<eigen3/Eigen/Eigen\></span>

<span class="mark">\#include \<iostream\></span>

<span class="mark">\#include \<opencv2/opencv.hpp\></span>

<span class="mark">constexpr double MY_PI = 3.1415926;</span>

<span class="mark">Eigen::Matrix4f get_view_matrix(Eigen::Vector3f eye_pos)</span>

<span class="mark">{</span>

<span class="mark">Eigen::Matrix4f view = Eigen::Matrix4f::Identity();</span>

<span class="mark">Eigen::Matrix4f translate;</span>

<span class="mark">translate \<\< 1, 0, 0, -eye_pos\[0\], 0, 1, 0, -eye_pos\[1\], 0, 0, 1,</span>

<span class="mark">-eye_pos\[2\], 0, 0, 0, 1;</span>

<span class="mark">view = translate \* view;</span>

<span class="mark">return view;</span>

<span class="mark">}</span>

<span class="mark">Eigen::Matrix4f get_model_matrix(float rotation_angle)</span>

<span class="mark">{</span>

<span class="mark">// TODO: Implement this function</span>

<span class="mark">// Create the model matrix for rotating the triangle around the Z axis.</span>

<span class="mark">// Then return it.</span>

<span class="mark">Eigen::Matrix4f model = Eigen::Matrix4f::Identity();</span>

<span class="mark">float r = rotation_angle / 180.0 \* MY_PI;</span>

<span class="mark">Eigen::Matrix4f translate;</span>

<span class="mark">translate \<\< cos(r), -sin(r), 0, 0,</span>

<span class="mark">sin(r), cos(r), 0, 0,</span>

<span class="mark">0, 0, 1, 0,</span>

<span class="mark">0, 0, 0, 1;</span>

<span class="mark">model = translate \* model;</span>

<span class="mark">return model;</span>

<span class="mark">}</span>

<span class="mark">Eigen::Matrix4f get_projection_matrix(float eye_fov, float aspect_ratio, float zNear, float zFar)</span>

<span class="mark">{</span>

<span class="mark">Eigen::Matrix4f projection = Eigen::Matrix4f::Zero();</span>

<span class="mark">float half_eye_fovY = eye_fov / 2.0f / 180.0f \* MY_PI;</span>

<span class="mark">float top = zNear \* tan(half_eye_fovY);</span>

<span class="mark">float bottom = -top;</span>

<span class="mark">float right = aspect_ratio \* top;</span>

<span class="mark">float left = -right;</span>

<span class="mark">projection(0, 0) = 2\*zNear / (right - left);</span>

<span class="mark">projection(1, 1) = 2\*zNear / (top - bottom);</span>

<span class="mark">projection(2, 2) = (zFar + zNear) / (zFar - zNear);</span>

<span class="mark">projection(2, 3) = -2 \* zFar \* zNear / (zFar - zNear);</span>

<span class="mark">projection(3, 2) = -1;</span>

<span class="mark">return projection;</span>

<span class="mark">}</span>

<span class="mark">Eigen::Matrix4f get_rotation(Vector3f axis, float angle) {</span>

<span class="mark">Eigen::Matrix4f rotation = Eigen::Matrix4f::Identity();</span>

<span class="mark">Eigen::Vector3f axis_normalized = axis.normalized();</span>

<span class="mark">float cos_theta = cos(angle);</span>

<span class="mark">float sin_theta = sin(angle);</span>

<span class="mark">float one_minus_cos_theta = 1 - cos_theta;</span>

<span class="mark">rotation(0, 0) = cos_theta + axis_normalized\[0\] \* axis_normalized\[0\] \* one_minus_cos_theta;</span>

<span class="mark">rotation(0, 1) = axis_normalized\[0\] \* axis_normalized\[1\] \* one_minus_cos_theta - axis_normalized\[2\] \* sin_theta;</span>

<span class="mark">rotation(0, 2) = axis_normalized\[0\] \* axis_normalized\[2\] \* one_minus_cos_theta + axis_normalized\[1\] \* sin_theta;</span>

<span class="mark">rotation(1, 0) = axis_normalized\[1\] \* axis_normalized\[0\] \* one_minus_cos_theta + axis_normalized\[2\] \* sin_theta;</span>

<span class="mark">rotation(1, 1) = cos_theta + axis_normalized\[1\] \* axis_normalized\[1\] \* one_minus_cos_theta;</span>

<span class="mark">rotation(1, 2) = axis_normalized\[1\] \* axis_normalized\[2\] \* one_minus_cos_theta - axis_normalized\[0\] \* sin_theta;</span>

<span class="mark">rotation(2, 0) = axis_normalized\[2\] \* axis_normalized\[0\] \* one_minus_cos_theta - axis_normalized\[1\] \* sin_theta;</span>

<span class="mark">rotation(2, 1) = axis_normalized\[2\] \* axis_normalized\[1\] \* one_minus_cos_theta + axis_normalized\[0\] \* sin_theta;</span>

<span class="mark">rotation(2, 2) = cos_theta + axis_normalized\[2\] \* axis_normalized\[2\] \* one_minus_cos_theta;</span>

<span class="mark">return rotation;</span>

<span class="mark">}</span>

<span class="mark">int main(int argc, const char\*\* argv)</span>

<span class="mark">{</span>

<span class="mark">float angle = 0;</span>

<span class="mark">bool command_line = false;</span>

<span class="mark">std::string filename = "output.png";</span>

<span class="mark">if (argc \>= 3) {</span>

<span class="mark">command_line = true;</span>

<span class="mark">angle = std::stof(argv\[2\]); // -r by default</span>

<span class="mark">if (argc == 4) {</span>

<span class="mark">filename = std::string(argv\[3\]);</span>

<span class="mark">}</span>

<span class="mark">else</span>

<span class="mark">return 0;</span>

<span class="mark">}</span>

<span class="mark">rst::rasterizer r(700, 700);</span>

<span class="mark">Eigen::Vector3f eye_pos = {0, 0, 5};</span>

<span class="mark">std::vector\<Eigen::Vector3f\> pos{{2, 0, -2}, {0, 2, -2}, {-2, 0, -2}};</span>

<span class="mark">std::vector\<Eigen::Vector3i\> ind{{0, 1, 2}};</span>

<span class="mark">auto ind_id = r.load_indices(ind);</span>

<span class="mark">int key = 0;</span>

<span class="mark">int frame_count = 0;</span>

<span class="mark">while (key != 27) {</span>

<span class="mark">auto pos_id = r.load_positions(pos);</span>

<span class="mark">r.clear(rst::Buffers::Color \| rst::Buffers::Depth);</span>

<span class="mark">r.set_model(get_model_matrix(angle));</span>

<span class="mark">r.set_view(get_view_matrix(eye_pos));</span>

<span class="mark">r.set_projection(get_projection_matrix(45, 1, 0.1, 50));</span>

<span class="mark">r.draw(pos_id, ind_id, rst::Primitive::Triangle);</span>

<span class="mark">cv::Mat image(700, 700, CV_32FC3, r.frame_buffer().data());</span>

<span class="mark">image.convertTo(image, CV_8UC3, 1.0f);</span>

<span class="mark">cv::imshow("image", image);</span>

<span class="mark">key = cv::waitKey(10);</span>

<span class="mark">std::cout \<\< "frame count: " \<\< frame_count++ \<\< '\n';</span>

<span class="mark">if (key == 'q') {</span>

<span class="mark">angle += 10;</span>

<span class="mark">}</span>

<span class="mark">else if (key == 'e') {</span>

<span class="mark">angle -= 10;</span>

<span class="mark">}</span>

<span class="mark">else if (key == 'w') {</span>

<span class="mark">eye_pos\[1\] -= 0.1;</span>

<span class="mark">}</span>

<span class="mark">else if (key =='s') {</span>

<span class="mark">eye_pos\[1\] += 0.1;</span>

<span class="mark">}</span>

<span class="mark">else if (key == 'a') {</span>

<span class="mark">eye_pos\[0\] += 0.1;</span>

<span class="mark">}</span>

<span class="mark">else if (key == 'd') {</span>

<span class="mark">eye_pos\[0\] -= 0.1;</span>

<span class="mark">}</span>

<span class="mark">}</span>

<span class="mark">return 0;</span>

<span class="mark">}</span>