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