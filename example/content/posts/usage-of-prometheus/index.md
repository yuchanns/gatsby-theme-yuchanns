---
title: prometheus的使用
date: 2020-11-07T12:27:41.520Z
description: "prometheus的使用"
category: "golang"
wip: true
tags:
  - "prometheus"
  - "grafana"
  - "docker"
---
prometheus是一款开源的监控解决方案，通过主动定时拉取应用对外暴露的指标路由，通过图形化展示进程内部的运行状态，并且使用**promsql**提供查询。

![](./prometheus_operator_diagram.png)

本文内容预计包括prometheus的快速部署，查询语法介绍、与go项目的集成、使用grafana进行可视化、在k8s中的集成以及通过插件设置阈值进行告警等实践操作。
