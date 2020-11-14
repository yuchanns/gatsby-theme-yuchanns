---
title: k8s学习之对象
date: 2020-11-14T12:30:52.864Z
description: "k8s学习之对象"
category: "kubernetes"
tags:
  - "k8s"
  - "object"
---
就像编程初学者第一课是“Hello World”一样，在k8s的初见中，我们通常是照葫芦画瓢编写一份xxx.yml文件，然后使用`kubectl create -f xxx.yml`执行命令，接着集群中某个作用生效了。如下，这份`nginx-deployment.yml`将会指挥集群创建一个关于nginx的**deployment**。
```yaml
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # tells deployment to run 2 pods matching the template
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```
不幸的是，对于初学者来说，既不清楚自己在干什么，导致什么后果，也不了解这份清单中的字段表示了什么意思，包含有哪些可选项。

实际上，[官方文档](https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/kubernetes-objects/)都一一给出了答案，不过鲜有新人能细致耐心地找出这些隐藏在角落里的长篇大论的说明及文中的扩展阅读延伸。
## 什么是k8s对象
首先，在这些配置文件中，我们都在用**Yaml**语法描述一些内容，这些内容包含着键值对，所以最终可以表达出一个对象，这个对象将会被k8s读取，作为创建实体依据，告知系统工作的**期望状态**。这被称为`k8s对象`(**kubernetes objects**)。换言之：

> 通过创建对象，本质上是在告知 Kubernetes 系统，所需要的集群工作负载看起来是什么样子的

为了便于操作对象，k8s提供了一系列描述标准，即所谓的[`Kubernetes API`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/)。

## k8s对象的必须要素