---
title: mongodb的使用
date: 2020-11-10T15:25:45.655Z
description: "mongodb的使用"
category: "golang"
wip: true
tags:
  - "mongodb"
  - "go"
---
mongodb是以json格式存储的文档型NoSQL数据库。

笔者以前基本上是以mysql使用为主。最近工作上使用到了mongodb，感觉它的聚合能力非常强大，但语法使用颇为复杂，并且在go中使用上手不太容易，因此决定写一篇文章记录一下自己的使用心得。

![](./go-mongo.png)

## 前置准备
首先我们需要一份[官方使用文档](https://docs.mongodb.com/manual/)，然后再安装一份数据库实例。尽管官方网站提供了在线云实例，但是不知道为什么我这边访问特别的卡，即使科学上网也一样。于是我打算用docker快速部署一个容器，然后用navicat连接。

```bash
docker run -d --name mongo -p 27017:27017 -p 28017:28017 mongo:4.4
```

为后面curd以及复杂聚合操作准备，我还需要以下这些集合以及文档。。。
