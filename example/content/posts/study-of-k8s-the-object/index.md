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
### apiVersion清单
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

### 部分kind清单
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
|Service|v1||
|ConfigMap|v1||
|Volume|v1||
|PersistentVolumeClaim|v1||
|NetworkPolicy|networking.k8s.io/v1||
|ObjectMeta|meta/v1|对应各种Kind的k8s对象中的meta字段|
|LabelSelector|meta/v1|对应各种Kind的k8s对象中的spec.selector字段|
|PodTemplateSpec|v1|Pod模板，常用在各种Kind的k8s对象的spec.tempalte字段|
|PodSpec|v1|Pod定义，在模板中使用|

除了上述三个必要字段之外，在确定了`kind`之后，还需要使用`spec`字段来具体描述k8s对象的精确属性。这些属性在每个`kind`中各不相同，需要区分看待。

## kind及其对应的spec
这一节，将会给出上文列出的常用部分kind对应的spec。
### 被频繁使用的kind spec
在spec中，有一些字段使用频率很高，这里优先提出来，后续不再赘述。

* `selector` - 标签选择器，`kind`为**LabelSelector**，在对一组资源进行查询时作为标签被使用。匹配结果使用`&&`运算、空选择器可以匹配任意对象，null选择器人以对象不匹配。它的结构如下：
  ```yaml
  selector:
      matchExpressions: # 匹配表达式，本身是一个数组，成员为对象，包含key, operator和values字段
        - key: app # 选择器所作用的标签
          operator: In # 标签与下面的值的关系，有In, NotIn, Exists和DoesNotExist
          values: # 这是一个数组，包含一系列标签的值。该示例表示选择器作用在值包含有nginx, proxy这些值之一的app标签
            - nginx
            - proxy
      matchLabels: # 键值对对象，一个键值对等同于上面的matchExpressions的一个元素
        app: nginx # 这是一个示例，选择器作用在值为nginx的app标签时生效
  ```
* `template` - 模板，`kind`通常为**PodTemplateSpec**，集群将会根据此模板创建Pod。它的结构如下：
  ```yaml
  template:
      metadata: # 一个标准的kind为ObjectMeta的对象
        annotations: # 注解字段，是一个对象。注解键值对不用于标签选择，而是用于部署时作为元数据获取使用
          # 参考https://kubernetes.io/zh/docs/concepts/overview/working-with-objects/annotations/
          imageregistry： "https://hub.docker.com/" # 例如声明使用的镜像库为dockerhub
        clusterName: minikube # 声明该对象所属的集群，用于区分不同集群中存在的name和namespace相同的情况
        creationTimestamp: # 一个时间戳，表示创建此对象时的服务器时间，只读属性，由系统设置
        deletionGracePeriodSeconds:
        deletionTimestamp:
        finalizers:
        generateName:
        generation:
        labels:
        managedFields:
        name:
        namespace:
        ownerReferences:
        resourceVersion:
        selfLink:
        uid:
      spec: # 用于定义pod的行为，kind为PodSpec
  ```

(未完成)
## 实践内容
### 解读nginx对象
在文章开头给出了一份`nginx-deployment.yml`。在了解k8s对象的规范后，我们已经可以对这一内容进行解读。

(未完成)
### 创建jenkins对象
经过对实例的解读，我们对如何描述k8s对象更胸有成竹了一些。现在，可以尝试给自己布置一个任务：描述并创建jenkins对象。

(未完成)
### Prometheus以及权限分配
一个复杂的集群系统，对其进行有效的监控是非常必要的事项。我们可以通过部署一个Prometheus来对集群、对Deployment进行监控，结合Grafana图表，以了解系统的运行状态。

(未完成)
### Ingress控制器与集群外部访问手段
或许读者们在本地使用minikube描述一系列k8s对象创建系统后，感觉一切良好，但总觉得有什么地方被忽略了。没错，我们在本地访问集群如鱼得水，而一旦从其他机器访问就会发现网络无法连通——这是因为集群在配置中限制了对本地访问。

诚然我们可以通过ssh转发、或者修改配置允许外来访问，但安全而可靠的方法是通过Ingress控制器来实现对外部访问路由的请求分发。这一样是通过第三方ingress插件结合k8s对象描述来实现的。

考虑到篇幅长度的影响，这一内容笔者将会在下一篇文章中进行讲解。敬请期待！