---
title: go项目怎么分布
date: 2020-10-13T15:39:06.346Z
description: "go项目怎么分布"
category: "golang"
tags:
  - "project"
  - "layout"
---
萌新总是喜欢问，“go的项目应该怎么组织结构？如何分层？”。

群友们纷纷给出自己的见解，转语言玩家又在犹疑：“我以前写Java/PHP/Python的时候不这么做，感觉这个不是很合适呀~”

笔者首先想说的是，拘泥于固定范式往往是因为使用者被其他语言成熟生态缔造的框架目录规范所禁锢了认知。没有了他人制定的秩序指导，一时间无所适从显得迷茫的结果。

当然自由并不意味着为所欲为，无论是从协作的角度考虑，还是从逻辑清晰的角度去看，一个规范的目录结构还是有所必要的。然而规范并不是一成不变的模板，笔者想强调的是，我们应该根据具体的开发方向、业务的类型来决定项目的结构。

在发表长篇大论之前，笔者先插叙一个前置的话题基础——go的模板。

## Template