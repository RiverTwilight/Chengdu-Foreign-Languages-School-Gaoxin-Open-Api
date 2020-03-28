[![构建状态](/badges/cflsgx/build.svg)](/p/cflsgx/ci/job)

[TOC]

# 体验示例项目

这个示例代码可以帮你快速了解一个简单的 Node.js 网页应用。并已经配置好自动编译过程。

文件解释
-----------

样例包括:

* README.md - 本文件
* Jenkinsfile - 用以自动构建和测试的脚本
* Dockerfile - 用以自动构建 Docker 镜像的脚本
* package.json - npm 的包管理文件
* app.js - 主 Nodejs 服务器端源代码
* tests - 主测试代码

快速开始
---------------

如下这些引导，假定你想在自己的电脑上开发本项目。

1. 安装依赖

        $ npm install

2. 启动服务器

        $ npm start

5. 打开 http://127.0.0.1:3000/ .