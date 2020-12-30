---
title: 领域驱动设计理论学习笔记
date: 2020-12-20T16:38:16.996Z
description: "领域驱动设计理论学习笔记"
category: "architechure"
tags:
  - "Domain Driven Design"
  - "DDD"
---
本文为极客时间上的[《DDD实战课》](https://time.geekbang.org/column/intro/238)学习笔记。

![](./event-storm.jpg)

> DDD分为战略设计和战术设计

## 域的概念
领域建模的核心思想：**将问题域逐步分解，降低业务理解和系统实现的复杂度**。

划分的`本质`是**公司的战略方向的体现**。

* 领域：确定范围，在这个边界内要解决的业务问题域
* 子域：领域的进一步划分，对应更小的业务问题域
    * 核心域：产品和业务具有竞争力的核心业务(优先解决，最重要)
    * 通用域：同时被多个子域使用的功能子域(认证、鉴权、限流等)
    * 支撑域：必需的功能子域（企业特性，如人脸识别、客户号码检验等）

## 限界上下文
* 通用语言：
    * 团队统一的语言，解决交流障碍
    * 能够简单、清晰、准确描述业务涵义和规则
    * 包含术语和用例场景
    * 名词可以给领域对象命名
    * 动词对应领域事件和命令

> 设计过程中可以用一些表格，来记录事件风暴和微服务设计过程中产生的领域对象及其属性

* 限界上下文
    * 确定通用语言所在的领域边界和语义环境
    * 封装通用语言和领域对象
    * 领域边界通过限界上下文定义

## 实体与值对象
> 实体和值对象是组成领域模型的基础单元

* 实体：
    * 具有唯一标识符，经历各种状态变更后仍能保持一致
    * 重要的是延续性和标识
    * 业务形态：领域模型的重要对象
    * 代码形态：实体类
        * 包含属性和方法
        * 业务逻辑在实体类中实现
        * 跨多个实体则在领域服务中实现
    * 运行形态：
        * 以领域对象(DO)存在
        * 具有唯一的ID
    * 数据库形态：
        * 一对一(大多数)
        * 一对多(权限实体对应user和role两个持久化对象)
        * 多对一(customer和account对应一张聚合表)
* 值对象：
    * 没有标识符
    * 本质上是一个集
    * 不可变，只能整个替换
    * 业务形态：
        * 只是若干属性的集合
        * 逻辑上是实体属性的一部分
    * 代码形态：
        * 单一属性直接定义为实体类的属性
        * 属性集合设计为Class类，没有ID，会被整体引用
    * 运行形态：
        * 属性嵌入
        * 序列化大对象
    * 数据库形态：“数据建模为中心”->“领域建模为中心”
 
> 只承担描述实体的作用，且只能整体替换，就可以设计成值对象

## 聚合、聚合根
* 聚合
    * 让实体和值对象协同工作的组织
    * 保证实现共同的业务逻辑时数据一致性
    * 是数据修改和持久化的基本单元
    * 一个聚合对应一个仓储
    * 聚合中的多个实体可以形成领域服务的业务逻辑
    * 领域层的多个聚合可以形成应用服务的业务逻辑
* 聚合根
    * 避免聚合、实体间数据不一致性(用户积分修改，商品库存修改)
    * 是根实体，也是聚合的管理者
    * 聚合之间通过聚合根ID关联，外部只能通过访问聚合根导航到聚合内部的实体
* 设计聚合
    * 用例分析+场景分析+用户旅程分析->
    * 列出所有可能的业务行为和事件->
    * 产生领域对象->
    * 梳理领域对象间的关系->
    * 找出聚合根->
    * 找出与聚合根紧密关联的实体和值对象->
    * 构建聚合(聚合根+实体+值对象)
    * 多个聚合根据业务语义和上下文划分到同一个限界上下文
* 设计原则
    * 聚合用来封装真正的不变性
    * 设计小聚合
    * 通过唯一标识引用其他聚合
    * 聚合内数据强一致性，聚合间数据最终一致性；一次事务最多只能更改一个聚合的状态；更改多个聚合状态采用领域事件的方式异步修改，实现解耦
    * 通过应用层实现跨聚合的服务调用

## 领域事件
> 事件发生后通常会导致进一步的业务操作，在 DDD 中这种事件被称为领域事件。
>
> 比如生成订单后触发付款通知的动作，就是一个领域事件。

领域事件强调最终一致性：一次事务最多更改一个聚合的状态，多个聚合状态的更改使用领域事件。事件发布完成后发布方不必关心后续订阅事件处理是否成功，可以实现解耦。

服务之间通过事件总线进行跨聚合领域事件的处理

* 领域事件总体架构
    * 事件构建和发布
        * 基本属性至少包括：事件唯一标识、发生时间、事件类型和事件源
        * 业务属性：记录业务数据
        * 两种属性一起构成事件实体，依赖聚合根
        * 领域事件发生后业务数据不再修改，可以保存为值对象
    * 事件数据持久化
        * 持久化到本地业务数据库的事件表中
        * 持久化到共享的事件数据库中(分布式事务机制对性能有影响)
    * 事件总线
        * 进程内模型
        * 在微服务内聚合之间遍历订阅者列表，采取同步或异步的模式传递数据
        * 分发流程：
            * 微服务内的订阅者（其它聚合）直接分发
            * 微服务外的订阅者保存到事件库（表）并异步发送到消息中间件
            * 同时有内外则二合一
    * 消息中间件：Kafka，RabbitMQ等
    * 事件接收和处理
        * 接收：在应用层监听，接收并完成数据的持久化
        * 处理：在领域服务中实现