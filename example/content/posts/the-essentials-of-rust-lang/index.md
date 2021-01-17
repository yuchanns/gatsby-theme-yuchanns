---
title: Rust语言精要
date: 2021-01-16T23:23:00.427Z
description: "Rust语言精要"
category: "rust"
wip: true
tags:
    - "essentials"
    - "rust"
---
![](./parts-of-ferris-the-crab.png)

一文总结Rust语言精要，快速形成整体风格认知。

## 文章构成
* 环境安装与工具链
    * 环境安装
    * 编译器与包管理器
    * 核心库与标准库
* 语法和语义介绍
    * 表达式
    * 变量声明语义
    * 函数与闭包
    * 流程控制
* 类型系统
    * 基础类型
    * 复合类型
    * 标准库通用集合类型
    * 智能指针
    * 泛型
    * trait
* 错误处理
* 注释与打印

## 环境安装与工具链
Rust语言使用[rustup](https://rustup.rs/)作为安装器，它可以安装、更新和管理Rust的所有官方工具链。绝大多数情况下建议使用者使用该工具进行环境安装。
### 环境安装
对于`*nix`系统用户而言，执行：
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
对于`Windows`系统用户而言，下载安装[rustup-init.exe](https://win.rustup.rs/x86_64)。

安装完毕后可以通过`rustup show`获取工具链安装地址，进一步查看有哪些工具链，例如在笔者的macOS上是：
```bash
❯ rustup show
Default host: x86_64-apple-darwin
rustup home:  /Users/yuchanns/.rustup

stable-x86_64-apple-darwin (default)
rustc 1.49.0 (e1884a8e3 2020-12-29)
❯ ls /Users/yuchanns/.rustup
settings.toml toolchains    update-hashes
❯ ls /Users/yuchanns/.rustup/toolchains
stable-x86_64-apple-darwin
❯ ls /Users/yuchanns/.rustup/toolchains/stable-x86_64-apple-darwin
bin   etc   lib   share
❯ ls /Users/yuchanns/.rustup/toolchains/stable-x86_64-apple-darwin/bin
cargo         cargo-clippy  cargo-fmt     clippy-driver rust-gdb      rust-gdbgui   rust-lldb     rustc         rustdoc       rustfmt
```
### 编译器与包管理器
`rustc`是**官方编译器**，负责将源代码编译为可执行文件或库文件。经过分词和解析生成**AST**，然后处理为**HIR**(进行类型检查)，接着编译为**MIR**(实现增量编译)，最终翻译为**LLVM IR**，交由LLVM作为后端编译为各个平台的目标机器码，因此Rust是跨平台的，并且支持交叉编译。

`rustc`可以用`run`命令和`build`命令编译运行源码，但大多数情况下用户不直接使用`rustc`对源码执行操作，而是使用`cargo`这一工具间接调用`rustc`。

`cargo`是**官方包管理器**，可以方便地管理包依赖的问题。

使用`cargo new proj_name`可以创建一个新的项目，包含一个`Cargo.toml`依赖管理文件和`src`源码文件夹。
```bash
❯ cargo new proj_name
     Created binary (application) `proj_name` package
❯ tree proj_name
proj_name
├── Cargo.toml
└── src
    └── main.rs

1 directory, 2 files
```
执行`cargo run .`可以简单编译运行默认的代码，编译结果将会与`src`同级的`target`下，包含`target/debug`和`target/release`两个文件夹。
```bash
❯ cd proj_name
❯ cargo run .
   Compiling proj_name v0.1.0 (/Users/yuchanns/Coding/backend/github/rustbyexample/trpl/proj_name)
    Finished dev [unoptimized + debuginfo] target(s) in 1.02s
     Running `target/debug/proj_name .`
Hello, world!
```
同时我们可以看到文件根目录下生成了一个`Cargo.lock`文件，记录详细的依赖版本信息。然后观察`Cargo.toml`：
```bash
❯ cat Cargo.toml
[package]
name = "proj_name"
version = "0.1.0"
authors = ["yuchanns <airamusume@gmail.com>"]
edition = "2018"

[dependencies]
rand = "0.8.1"
```
可以看到，`[package]`记录的是关于本项目的一些信息，而下方的`[dependencies]`则记录了对外部包的依赖。

添加依赖，是通过编辑该文件，手动写入包名和版本，然后在编译过程中cargo就会自动下载依赖并使用。

也许有的读者好奇是否还有类似于其他语言的**CLI**命令，通过`cargo add`等命令添加依赖的方式，遗憾的是官方并没有提供这样的支持。而社区则提供了一个[killercup/cargo-edit](https://github.com/killercup/cargo-edit)实现了这一需求：
```bash
cargo install cargo-edit
cargo add rand
cargo rm rand
```
在一个issue [Subcommand to add a new dependency to Cargo.toml #2179](https://github.com/rust-lang/cargo/issues/2179) 中官方推荐了该工具，可能很多人(包括笔者在内)都如同下面这位老哥一样很难接受官方因为社区有解决方案而不提供官方解决的决定。不过也许可以理解为这就是官方宣称的 **“重视社区”** 的身体力行吧。

![](./issue-subcommand-of-cargo-add-new-dependency.png)

和许多其他语言一样，身在中国境内，用户还需要设置Cargo的镜像站点，改善下载状况：
```bash
❯ cat ~/.cargo/config
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```
