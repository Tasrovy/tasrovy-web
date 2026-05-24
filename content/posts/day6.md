---
title: "Day6"
date: "2025-03-25"
excerpt: "网上的答案，但感觉理解不透彻，明天抽时间自己具体从头算一下"
category: "GAMES101"
---

网上的答案，但感觉理解不透彻，明天抽时间自己具体从头算一下

<span class="mark">Eigen::Matrix4f get_model_matrix(float rotation_angle)</span>

<span class="mark">{</span>

<span class="mark">// TODO: Implement this function</span>

<span class="mark">// Create the model matrix for rotating the triangle around the Z axis.</span>

<span class="mark">// Then return it.</span>

<span class="mark">Eigen::Matrix4f model = Eigen::Matrix4f::Identity();//定义 4\*4 单位矩阵</span>

<span class="mark">float r = rotation_angle / 180.0 \* MY_PI;//定义旋转的弧度</span>

<span class="mark">Eigen::Matrix4f translate;//初始化模型变换矩阵</span>

<span class="mark">translate \<\< cos(r), -sin(r), 0, 0,</span>

<span class="mark">sin(r), cos(r), 0, 0,</span>

<span class="mark">0, 0, 1, 0,</span>

<span class="mark">0, 0, 0, 1;</span>

<span class="mark">model = translate \* model;</span>

<span class="mark">return model;</span>

<span class="mark">}</span>

<span class="mark">Eigen::Matrix4f get_projection_matrix(float eye_fov, float aspect_ratio,</span>

<span class="mark">float zNear, float zFar)</span>

<span class="mark">{</span>

<span class="mark">// Students will implement this function</span>

<span class="mark">Eigen::Matrix4f projection = Eigen::Matrix4f::Identity();//定义 4\*4 单位矩阵</span>

<span class="mark">// TODO: Implement this function</span>

<span class="mark">// Create the projection matrix for the given parameters.</span>

<span class="mark">// Then return it.</span>

<span class="mark">Eigen::Matrix4f persp_to_ortho = Eigen::Matrix4f::Identity();</span>

<span class="mark">persp_to_ortho \<\< -zNear, 0, 0, 0,</span>

<span class="mark">0, -zNear, 0, 0,</span>

<span class="mark">0, 0, -zNear + -zFar, -zNear \* zFar,</span>

<span class="mark">0, 0, 1, 0;</span>

<span class="mark">float half_eye_fovY = eye_fov / 2 / 180.0 \* MY_PI;</span>

<span class="mark">float top = zNear \* tan(half_eye_fovY);</span>

<span class="mark">float bottom = -top;</span>

<span class="mark">float right = aspect_ratio \* top;</span>

<span class="mark">float left = -right;</span>

<span class="mark">Eigen::Matrix4f ortho_translate = Eigen::Matrix4f::Identity();</span>

<span class="mark">ortho_translate \<\< 1, 0, 0, -(right + left) / 2,</span>

<span class="mark">0, 1, 0, -(top + bottom) / 2,</span>

<span class="mark">0, 0, 1, -(zNear + zFar) / 2,</span>

<span class="mark">0, 0, 0, 1;</span>

<span class="mark">Eigen::Matrix4f ortho_scale = Eigen::Matrix4f::Identity();</span>

<span class="mark">ortho_scale \<\< 2 / (right - left), 0, 0, 0,</span>

<span class="mark">0, 2 / (top - bottom), 0, 0,</span>

<span class="mark">0, 0, 2 / (zFar - zNear), 0,</span>

<span class="mark">0, 0, 0, 1;</span>

<span class="mark">projection = ortho_scale \* ortho_translate \* persp_to_ortho;</span>

<span class="mark">return projection;</span>

<span class="mark">}</span>