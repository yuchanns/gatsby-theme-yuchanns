---
title: porotobuf的使用
date: 2021-01-09T15:36:12.266Z
description: "porotobuf的使用"
category: "golang"
wip: true
tags:
  - "protobuf"
  - "protoc"
  - "grpc"
---
protobuf是谷歌开发的一款跨平台跨语言强扩展性的用于序列化数据的协议，就像人们常用的xml、json一样。它主要由C++编写，用户按照相应的接口描述语言(Interface description language, **IDL**)可以批量生成对应语言的代码模板，用于诸如微服务rpc交换数据之类的通信。

而grpc是使用protobuf协议实现的一个RPC框架，由谷歌开发。

本文通过一个小例子演示使用go创建grpc服务以及代理网关使其支持http访问。

![](./protobuf.png)

## 环境安装
* 安装环境
* 安装插件
### 安装protoc
protoc是protobuf的编译器。就像其他编程语言，用户编写代码，编译器将其编译成其他后端语言，protoc可以将用户编写的IDL编译成其他后端语言。具体编译成什么语言则根据稍后安装的语言插件以及用户操作而定。

直接从[protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)下载编译安装。

```sh
# 下载
wget https://github.com/protocolbuffers/protobuf/releases/download/v3.14.0/protobuf-all-3.14.0.tar.gz
# 解压
tar -zxvf protobuf-all-3.14.0.tar.gz
# 进入并编译安装
cd protobuf-3.14.0 
./configure
# 这里根据相应的cpu提高make速度
make -j6
make install
# 检查安装是否成功
protoc --version
# libprotoc 3.14.0
```
### 安装插件
**注意**，这里笔者使用的是`v1.3`版本的插件。v1.4版本在一些语法和命令上有所不同，会出现不兼容的情况，请锁好版本。

> 比如，生成代码不同。v1.3中rpc代码和grpc代码是合在一个文件上一起生成的；而v1.4会分成两个文件。
>
> v1.3对gateway的支持也和v1.4不同，语法上也有所不同。

首先安装生成go语言代码的插件v1.3版本[protoc-gen-go](https://github.com/golang/protobuf/tree/master/protoc-gen-go)。
```sh
GO111MODULE=on GOPROXY=https://goproxy.cn go get github.com/golang/protobuf/protoc-gen-go@v1.3
```
然后安装`grpc gateway`插件，这里我们使用v1插件，理由同上，避免不兼容情况。
```sh
GO111MODULE=on GOPROXY=https://goproxy.cn go get github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@v1
```
> 注意，如果操作系统是macOS，还需要把两个插件(`protoc-gen-go`和`protoc-gen-grpc-gateway`)从`$GOPATH/bin/`移动到`/usr/local/go/bin`下才能在使用时自动寻找到。

然后，我们就可以编写proto文件，并生成相应的`go grpc`代码了。

## 编写proto