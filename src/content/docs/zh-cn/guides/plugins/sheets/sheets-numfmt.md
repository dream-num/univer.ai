---
title: "@univerjs/sheets-numfmt"
---

[![npm version](https://img.shields.io/npm/v/@univerjs/sheets-numfmt)](https://npmjs.org/package/@univerjs/sheets-numfmt)

提供数字格式的编辑/渲染能力，例如编辑面板、工具栏按钮、实时预览、行列变化等等。

:::note
数字格式是电子表格的核心功能之一，因此数字格式的解析处理是在 @univerjs/sheets 中进行的。
:::

## 使用介绍
在你的入口文件处，引用 `@univerjs/sheets-numfmt`.
```ts
import { LocaleType, LogLevel, Univer } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt';


// univer
const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.ZH_CN,
    locales,
    logLevel: LogLevel.VERBOSE,
});

// ... 其他插件注册

univer.registerPlugin(UniverSheetsNumfmtPlugin);
```
:::note
如果你需要导出快照支持导出数据格式,需要额外新增[一部分代码](/guides/extend/model/#本地化快照方案)
:::

## 依赖的插件

本插件运行依赖以下插件：

- @univerjs/core
- @univerjs/design
- @univerjs/engine-numfmt
- @univerjs/engine-render
- @univerjs/sheets
- @univerjs/sheets-ui
- @univerjs/ui

<!--package-locales start-->
<!--package-locales end-->

<!--package-assets start-->
<!--package-assets end-->

