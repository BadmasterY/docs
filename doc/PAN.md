## 记一次使用 cloudreve 自行编译的问题
由于公司需求, 在公网搭建一个公司自己的网盘, 而且网上有许多已经写好的开源项目(`其实就是懒`), 最后选来选取决定使用 `cloudreve v3.0.0` 进行折腾。

当然, 再懒也需要满足需求, 只能使用源码进行修改、编译。

首次构建会遇到这样一个问题:
```shell
yarn build
./node_modules/react-dplayer/lib/DPlayer.js
Cannot find module: 'dplayer/dist/DPlayer.min.css'. Make sure this package is installed.

You can install this package by running: yarn add dplayer/dist/DPlayer.min.css.
```

告诉你找不到 `dplayer/dist/DPlayer.min.css` 文件。当然, 这个好办, 根据引导进行安装就 `ok` 了:
```shell
yarn add dplayer/dist/DPlayer.min.css
error An unexpected error occurred: "http://registry.npm.taobao.org/dplayer%2fdist/DPlayer.min.css: Request \"http://registry.npm.taobao.org/dplayer%2fdist/DPlayer.min.css\" returned a 405".
```

哦吼, 神奇的 `405` 来了! WTF?!

这里是使用的淘宝镜像, 切换回原始地址依旧报错。

然后本着契而不舍的精神, 看了一下 `dplayer` 的更新, 发现在 `1.25.1`(最近一次更新) 将 `css` 内置了, 也就是说, `react-dplayer` 的文件内部, 引用 `css` 样式代码 `require('dplayer/dist/DPlayer.min.css');` 在最新版本失效。

~~但是查看 `yarn.lock` 文件发现引用的确实是 `dplayer v1.25.0`...~~  
**万恶之源 `dplayer "^1.25.0"`。**

需要指定 `dplayer` 安装版本, 添加 `css` 样式解决:
```shell
yarn add dplayer@1.25.0/dist/DPlayer.min.css
```

由这个问题让我想起来, 上上周末，一个 `NPM` 小项目的更新给整个 `NPM` 生态系统制造了一场混乱，影响到了数百万 `JS` 项目。这个库就是 `is-promise` ，仅包含了两行代码，其功能是让开发者测试一个 `JS` 对象是否是 `Promise`，其它 `JS` 项目可通过一行代码调用使用该库。

尽管这个库只有两行代码，但它却是最流行的 `NPM` 包之一，被超过 `340` 万个项目使用。

上上周末 `is-promised` 释出了一个更新，结果由于它不符合正确的 `ES` 模块标准，导致使用该库的其它项目在构建时出错。问题并没有导致现有 `JS` 项目崩溃，而主要无法编译新版本。

许多知名的 `JS` 项目都受到影响，其中包括 `Facebook` 的 `Create React App`，`Google` 的 `Angular.js` 框架，`Google` 的 `Firebasse-tools`，亚马逊的 `AWS Serverless CLI`，`Nuxt.js` 等等。

`NPM` 生态系统的依赖问题，早在 `2016` 年就引发过类似事件，有一个 `NPM` 库开发者撤回了他的代码（代码并不多，也就几行），导致诸多重量级应用（比如 `React` 和 `Babel`）都出问题了。

**曾有人为此发出疑问：难道程序员连代码都不会写了吗？**举例来说，一个叫 `isArray` 的软件包一天的下载量有 `88` 万，2016年2月有 `1800` 万次下载量，它本身就只有一行代码。

`NPM` 生态系统中的许多开发者，看起来宁愿复用其他人写好的代码而不是自己写。这种做法存在严重的安全隐患，因为一个被广泛使用的软件包存在 `bug`，你的代码也会受到影响，而你却无法自己去修正。

[npm](./npm.png)