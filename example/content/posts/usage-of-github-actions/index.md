---
title: github actions使用笔记
date: 2021-01-02T16:25:23.807Z
description: "github actions使用笔记"
category: "devops"
tags:
  - "github actions"
  - "devops"
---
## 前言
我常常在github上使用一些**XXexample**的仓库记录使用某种语言的过程中对第三方包的试用或者验证一些思路和想法，时间一长，整个仓库就显得杂乱无比。

于是我打算采用Monorepo的方式对这些仓库进行管理，将各自的记录过程进行隔离，并且独立运行对应的单元测试。

调研过程一开始想到的是熟悉的CircleCI，遗憾的是这个工具官方不支持分割配置文件，所有的job都需要塞到同一个`config.yml`里，同样会显得冗长繁杂(民间是有通过makefile进行分割合并的解决方案，但是我觉得太过复杂)；再者印象中曾看过别人使用github自带的CI/CD工具Actions似乎支持多个工作流，而且天然亲近github自身，于是决定新年的第一天就把它掌握了，用于接下来的Monorepo管理辅助。

## 开始
学习一个工具的第一件事自然是去翻阅官方文档——github actions的官方文档很完整，令人感到欣喜的是还有中文版本。

> [github actions 手册](https://docs.github.com/cn/free-pro-team@latest/actions)

### 开启支持
只要在仓库的根目录创建一个`.github/workflows`的文件夹，然后往其中添加一个`learn-github-action.yml`文件，我们就开启了该仓库的github actions功能，并且得到了第一个工作流**learn-github-action**。注意，yml文件可以是任意名字，一个文件就是一个工作流，这正是我之所以用它的重要原因。

该配置文件主要由三个字段组成，分别是`name`、`on`和`jobs`。
* `name`: 工作流名称
* `on`: 触发条件
* `jobs`: 作业集

```yml
name: learn-github-action
on: push
jobs:
  say-hello:
    env:
      Action: Hello
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        shell: bash
        env:
          Object: World
        run: |
          echo $Action $Object!
```

### 如何触发

