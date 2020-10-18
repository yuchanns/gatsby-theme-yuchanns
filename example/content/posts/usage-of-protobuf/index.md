---
title: porotobuf的使用
date: 2020-10-17T09:16:43.393Z
description: "porotobuf的使用"
category: "golang"
wip: true
tags:
  - "protobuf"
  - "protoc"
  - "grpc"
---
protobuf是谷歌开发的一款跨平台跨语言强扩展性的用于序列化数据的协议，就像人们常用的xml、json一样。它主要由C++编写，用户按照语法可以批量生成对应语言的代码模板，用于诸如微服务rpc交换数据之类的通信。

本文将会结合官方文档以及grpc，从安装到案例进行全面的讲解。

![](./protobuf.png)