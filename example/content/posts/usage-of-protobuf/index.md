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

本文通过一个小例子演示创建grpc的go服务端以及php和node的客户端进行通信，并为go服务端启用grpc gateway使之支持http访问。

> 注意：本文只适用于Linux或者macOS。

![](./protobuf.png)

## 环境安装
* 安装环境
* 安装go插件
* 安装php插件
* 安装node插件

### 安装protoc
protoc是protobuf的编译器。就像其他编程语言，用户编写代码，编译器将其编译成其他后端语言，protoc可以将用户编写的IDL编译成其他后端语言。具体编译成什么语言则根据稍后安装的语言插件以及用户操作而定。

直接从[protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)下载编译安装。

```bash
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
> 注意，用Linux内核的操作系统安装protoc时，很高概率的情况下还需执行`ldconfig`才能成功执行`protoc --version`。

### 安装go插件
*如果你关注的不是go服务端的部分，可以跳过这一节*

**注意**，这里笔者使用的是`v1.3`版本的插件。v1.4版本在一些语法和命令上有所不同，会出现不兼容的情况，请锁好版本。

> 比如，生成代码不同。v1.3中rpc代码和grpc代码是合在一个文件上一起生成的；而v1.4会分成两个文件。
>
> v1.3对gatewayc的支持也和v1.4不同，语法上也有所不同。

首先安装生成go语言代码的插件v1.3版本[protoc-gen-go](https://github.com/golang/protobuf/tree/master/protoc-gen-go)。
```bash
GO111MODULE=on GOPROXY=https://goproxy.cn go get github.com/golang/protobuf/protoc-gen-go@v1.3
```
然后安装`grpc gateway`插件，这里我们使用v1插件，理由同上，避免不兼容情况。
```bash
GO111MODULE=on GOPROXY=https://goproxy.cn go get github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway@v1
```
> 注意，如果操作系统是macOS，还需要把两个插件(`protoc-gen-go`和`protoc-gen-grpc-gateway`)从`$GOPATH/bin/`移动到`/usr/local/go/bin`下才能在使用时自动寻找到。

### 安装php插件
*如果你关注的不是php客户端的部分，可以跳过这一节*

安装php的插件是三种语言中最麻烦的一个步骤。

首先确认你的php环境包含`pecl`，然后`grpc-1.34.0`和`protobuf`的扩展:
```bash
pecl install grpc-1.34.0 protobuf
## 找到php.ini的位置
php -i | grep php.ini
## 往php.ini中添加扩展
echo 'extension=grpc.so' >> php.ini
echo 'extension=protobuf.so' >> php.ini
## 查看扩展是否已经安装
php -m | egrep 'grpc|protobuf'
```
接下来编译安装适用于protoc的`grpc_php_plugin`。

由于插件编译已经废弃了make方式，所以这里采用`bazel`进行编译安装，首先需要安装bazel：

> `bazel`是Google开发的一款代码构建工具，可以处理大规模构建，解决环境问题。

```bash
sudo apt install curl gnupg
curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor > bazel.gpg
sudo mv bazel.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
apt update
apt install bazel
```
然后Clone[grpc/grpc](https://github.com/grpc/grpc)，并编译安装：
```bash
git clone git@github.com:grpc/grpc.git
cd grpc
bazel build @com_google_protobuf//:protoc
bazel build src/compiler:grpc_php_plugin
```
完成之后会在`grpc/bazel-bin/src/compiler`下生成一个`grpc_php_plugin`，供后续使用。

### 安装node插件
*如果你关注的不是node客户端的部分，可以跳过这一节*

Node安装gprc是最简单的。直接在项目根目录(`package.json`所在的目录)安装两个插件就可以了：
```bash
yarn add grpc @grpc/proto-loader
```

## 编写proto
安装完相应的插件，我们就可以编写proto文件，并生成相应的`grpc`代码了。