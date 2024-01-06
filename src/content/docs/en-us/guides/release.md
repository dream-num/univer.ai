---
title: 其他发行版
---

## Alpha Release

目前非稳定版本分为 alpha 和 beta 发布通道，alpha 版本通过 `@alpha` 标签发布，beta 版本直接通过 `@latest` 发布。

安装 alpha 版本

```shell
npm install @univerjs/<包名>@alpha
```

## Nightly Release

Univer 每晚都会构建一个版本，用于测试最新功能和修复的 bug。你可以将 npm 源切换至我们私有的 npm 源，来安装这个版本。

我们推荐的使用方式是，在项目根目录下创建一个 `.npmrc` 文件

```Properties title=".npmrc"
@univerjs:registry=https://univer.work/verdaccio/
```

然后安装 nightly 版本

```shell
npm install @univerjs/<包名>@nightly
```
