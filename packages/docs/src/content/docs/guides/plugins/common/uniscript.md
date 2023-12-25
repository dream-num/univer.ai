---
title: "@univerjs/uniscript"
sidebar:
  badge:
      text: experimental
      variant: caution
---

[![npm version](https://img.shields.io/npm/v/@univerjs/uniscript)](https://npmjs.org/package/@univerjs/uniscript)

@univerjs/uniscript 提供了一个基于 TypeScript 的 DSL，可以用来操作 Univer 的数据结构和业务逻辑。

![](/img/uniscript.jpeg)

用户可以在 @univerjs/uniscript 提供的代码编辑器中编写业务逻辑，以达成更加灵活的业务需求。如图所示，用户可以编写一段 Uniscript 用于从选区中读取身份证号并验证这些身份证号的合法性，把不合法的身份证号的背景标记为红色。

:::caution[试验性]
Uniscript 仍在试验阶段，建议不要在生产环境中使用。你可以在[路线图](/guides/roadmap)了解 Uniscript 的迭代计划。
:::

:::tip
Uniscript 的 DSL 实际上是对 Univer 的 API 的封装，这套 API 定义在[这里](https://github.com/dream-num/univer/blob/dev/packages/uniscript/src/facade/facade.ts)。
:::

## Demo

### 验证身份证的有效性

