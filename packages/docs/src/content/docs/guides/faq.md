---
title: FAQ
---

## 安装相关

### 为什么我在使用 webpack 4 的项目中导入 Univer 会报错？

1. webpack 4 无法正确地识别 `packages.json` 的 `exports` 字段，详见 [webpack/webpack#9509](https://github.com/webpack/webpack/issues/9509)。
你需要找到正确路径并手动引入。部分第三方依赖可能需要通过配置 `resolve.alias` 建立别名来解决。
2. 在某些 webpack 4 脚手架中，默认的 babel 的配置可能不处理 node_modules 下的依赖，你可能需要手动修改 webpack 的 rules，将 `@univerjs/*` 添加到 babel-loader 的 `include` 配置中。
