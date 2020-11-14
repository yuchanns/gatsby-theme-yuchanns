---
title: k8s学习之对象
date: 2020-11-14T12:30:52.864Z
description: "k8s学习之对象"
category: "kubernetes"
wip: true
tags:
  - "k8s"
  - "object"
---
> 注：本文基于版本1.9.0以上的k8s写作，可作为某种程度的api参考手册。如果你还没有一个k8s集群，可以参考[这篇文章](/r/kubernetes/study-with-k8s)进行搭建。

## 前言
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
不幸的是，对于初学者来说，既不清楚自己在干什么，将会导致什么后果，也不了解这份清单中的字段表示了什么意思，包含有哪些可选项。

实际上，[官方文档](https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/kubernetes-objects/)都一一给出了答案，不过鲜有新人能细致耐心地找出这些隐藏在角落里的长篇大论的说明及文中的扩展阅读延伸。
## 什么是k8s对象
首先，在这些配置文件中，我们都在用**Yaml**语法描述一些内容，这些内容包含着键值对，所以最终可以表达出一个对象，这个对象将会被k8s读取，作为创建实体依据，告知系统工作的**期望状态**。这被称为`k8s对象`(**kubernetes objects**)。换言之：

> 通过创建对象，本质上是在告知 Kubernetes 系统，所需要的集群工作负载看起来是什么样子的。

为了便于操作对象，k8s提供了一系列描述规约，即所谓的[`Kubernetes API`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/)。

## k8s对象的必须要素
在描述k8s对象的yaml文件中，必须包含以下三个字段：
* `apiVersion`-用于指定创建k8s对象的api版本
* `kind`-想要创建的对象的类别
* `metadata`-对象的标识数据

如同级联选择那样，前两个字段是单向从下至上依赖的：先确定`apiVersion`，才能确定有哪些`kind`。而`metadata`则包含有三个属性：`name`字符串、UID和可选的`namespace`。

下面，本文将列出`apiVersion`的候选项，以及相应的子选项`kind`候选项，作为使用参考。
### apiVersion表单数据
`apiVersion`由`Group`和`Version`组成，比如创建要创建一个`kind`为**Deployment**的对象，所使用的`apiVersion`为**apps/v1**。其中`Group`是**apps**，而`Version`则是**v1**，它们通过`/`组成了`apiVersion`。

下表总结了API组及其版本，阅读起来颇为枯燥，但是需要用到的时候作为参考就很有用。

|Group|Version|
|---|---|
|admissionregistration.k8s.io|v1, v1beta1|
|apiextensions.k8s.io|v1, v1beta1|
|apiregistration.k8s.io|v1, v1beta1|
|apps|v1|
|authentication.k8s.io|v1, v1beta1|
|authorization.k8s.io|v1, v1beta1|
|autoscaling|v1, v2beta2, v2beta1|
|batch|v1, v1beta1, v2alpha1|
|certificates.k8s.io|v1, v1beta1|
|coordination.k8s.io|v1, v1beta1|
|core|v1|
|discovery.k8s.io|v1beta1|
|events.k8s.io|v1, v1beta1|
|extensions|v1beta1|
|flowcontrol.apiserver.k8s.io|v1alpha1|
|networking.k8s.io|v1, v1beta1|
|node.k8s.io|v1beta1, v1alpha1|
|policy|v1beta1|
|rbac.authorization.k8s.io|v1, v1beta1, v1alpha1|
|scheduling.k8s.io|v1, v1beta1, v1alpha1|
|settings.k8s.io|v1alpha1|
|storage.k8s.io|v1, v1beta1, v1alpha1|

其中alpha表示不稳定的版本，beta表示基本稳定的版本。

比较特别地，当`Group`为**core**时，其`apiVersion`直接写作`v1`。

### 部分kind表单数据
虽然上文中有如此多的`apiVersion`，其对应的`kind`更是不计其数，但对于初学者来说，常用的`kind`寥寥可数，因此本文仅列出可能常用的几种`kind`和其对应的`apiVersion`。更详细的数据全部可以在[`Kubernetes API`](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/)查询。

|kind|apiVersion|备注|
|---|---|---|
|DaemonSet|apps/v1||
|Deployment|apps/v1||
|Ingress|extensions/v1beta1||
|IngressRule|extensions/v1beta1||
|StorageClass|storage.k8s.io/v1||
|VolumeAttachment|storage.k8s.io/v1||
|ClusterRole|rbac.authorization.k8s.io/v1||
|ClusterRoleBinding|rbac.authorization.k8s.io/v1||
|Role|rbac.authorization.k8s.io/v1||
|RoleBinding|rbac.authorization.k8s.io/v1||
|Container|v1|只在Pod上下文中创建使用|
|Pod|v1|推荐通过Controller(例如Deployment)创建，而不是直接创建|
|Service|v1||
|ConfigMap|v1||
|Volume|v1||
|PersistentVolumeClaim|v1||
|NetworkPolicy|networking.k8s.io/v1||
|ObjectMeta|meta/v1|对应各种Kind的k8s对象中的meta字段|

除了上述三个必要字段之外，在确定了`kind`之后，还需要使用`spec`字段来具体描述k8s对象的精确属性。这些属性在每个`kind`中各不相同，需要区分看待。

## kind及其对应的spec
这一节，将会给出上文列出的常用部分kind对应的spec。
### spec格式
(未完成)
### 实践1-解读nginx对象
在文章开头给出了一份`nginx-deployment.yml`。在了解k8s对象的规范后，我们已经可以对这一内容进行解读。(未完成)
### 实践2-创建jenkins对象
经过对实例的解读，我们对如何描述k8s对象更胸有成竹了一些。现在，可以尝试给自己布置一个任务：描述并创建jenkins对象。(未完成)