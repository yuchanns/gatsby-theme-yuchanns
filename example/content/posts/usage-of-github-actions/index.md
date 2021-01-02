---
title: 自下而上的github actions使用笔记
date: 2021-01-02T16:25:23.807Z
description: "自下而上的github actions使用笔记"
category: "devops"
tags:
  - "github actions"
  - "devops"
---
## 前言
笔者常常在github上使用一些**XXexample**的仓库记录使用某种语言的过程中对第三方包的试用或者验证一些思路和想法，时间一长，整个仓库就显得杂乱无比。

于是笔者打算采用Monorepo的方式对这些仓库进行管理，将各自的记录过程进行隔离，并且独立运行对应的单元测试。

调研过程一开始想到的是熟悉的CircleCI，遗憾的是这个工具官方不支持分割配置文件，所有的job都需要塞到同一个`config.yml`里，同样会显得冗长繁杂(民间是有通过makefile进行分割合并的解决方案，但是笔者觉得太过复杂)；再者印象中曾看过别人使用github自带的CI/CD工具Actions似乎支持多个工作流，而且天然亲近github自身，于是决定新年的第一天就把它掌握了，用于接下来的Monorepo管理辅助。

> 注：在这篇文章中，笔者假定读者都已经掌握了yaml配置语法。

## 开始
学习一个工具的第一件事自然是去翻阅官方文档——github actions的官方文档很完整，令人感到欣喜的是还有中文版本。

> [github actions 手册](https://docs.github.com/cn/free-pro-team@latest/actions)

### 开启支持
只要在仓库的根目录创建一个`.github/workflows`的文件夹，然后往其中添加一个`learn-github-action.yml`文件，就开启了该仓库的github actions功能，并且得到了第一个工作流**learn-github-action**。注意，yml文件可以是任意名字，一个文件就是一个工作流，这正是笔者之所以用它的重要原因。

该配置文件主要由三个字段组成，分别是`name`、`on`和`jobs`。
* `name`: 工作流名称
* `on`: 触发条件
* `jobs`: 作业集

```yaml
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
配置关键字段`on`，决定了触发工作流的条件。官方称之为**指定触发事件**。

它支持多种事件，可以从[这里](https://docs.github.com/cn/free-pro-team@latest/actions/reference/events-that-trigger-workflows)获取支持列表。

这里笔者简单举例三个比较重要的事件`push`、`pull_request`和`schedule`。

用户可以简单地在on字段上配置事件关键字数组，例如：
```yaml
on: [push, pull_request]
```
这样在仓库发生**push**和**pr**时就会触发该工作流。

也可以将on的内容改成一个对象，将事件当做键名，对事件进行具体的配置。

例如，在笔者的example仓库中，将旧有的代码保留在分支master上，新的Monorepo管理方式的代码放在monorepo分支上。笔者希望工作流只在更新monorepo分支的时候触发，那么可以通过`on.<event>.branches`来配置这一条件：
```yaml
on:
  push:
    branches:
      - monorepo
```
当然，也可以通过`on.<event>.branches-ignore`来配置忽略的分支，需要注意的是，两者不能同时使用。

另外，计划上每个工作流只负责monorepo中的每个小仓库，笔者还需要工作流只被对应的小仓库的变更触发，也就是对文件路径的指定支持。这里可以使用`on.<event>.paths`来配置：
```yaml
on:
  push:
    branches:
      - monorepo
    paths:
      - 'learn-github-action/**'
      - '.github/workflows/learn-github-action.yml'
```
这样一来，只有配置文件本身以及`learn-github-action`文件夹的内容发生了变更才会触发这个工作流的执行。

除此之外，事件触发还支持`on.<event>.tags`、`on.<event>.types`配置，除了`types`以外的事件都有相应的`-ignore`配置。

> `types`指`published, created, edited`这些操作，对`types`感兴趣的读者可以查看[手册](https://docs.github.com/cn/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#onevent_nametypes)获取详细的说明

而`schedule`这一事件相对比较特殊，它是一个定时器事件，支持`Posix cron`语法调度配置：

```yaml
on:
  schedule:
    - cron: '*/15 * * * *'
```
**Posix cron**语法：

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │                                   
│ │ │ │ │
│ │ │ │ │
* * * * *
```
支持运算符：

|运算符|描述|示例|
|---|---|
|* | 任意值 | * * * * * 在每天的每分钟运行。|
|, |	值列表分隔符 |	2,10 4,5 * * * 在每天第 4 和第 5 小时的第 2 和第 10 分钟运行。|
|- |	值的范围 |	0 4-6 * * * 在第 4、5、6 小时的第 0 分钟运行。|
|/ |	步骤值 |	20/15 * * * * 从第 20 分钟到第 59 分钟每隔 15 分钟运行（第 20、35 和 50 分钟）。|