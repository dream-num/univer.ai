---
title: 源码阅读指引
---

:::note
本章节内容具有时效性，如果你在阅读时发现内容与源码不符，请以最新版源码为准，如果你发现文档内容有误或者不完善，欢迎提交 PR 或者 Issue。
:::

:::tip
建议在阅读本小节内容之前先阅读 [Univer 架构](/guides/architecture/architecture/)、[这就是 Univer](http://localhost:4321/blog/this-is-univer)和[Univer 文档架构及模块设计](/blog/univer-doc-architecture) 了解 Univer 的整体架构设计。
:::

如果你想进一步了解 Univer 的实现细节，你还可以阅读源码。

以下是一些指引，你可以选择感兴趣的模块开始阅读，便于快速上手。

## 基础示例

:::tip
建议在阅读本小节内容之前先在 [演练场](/playground) 体验 Univer 的基础功能。
:::

- 文档示例 [examples/src/docs/main.ts](https://github.com/dream-num/univer/blob/dev/examples/src/docs/main.ts)
- 表格示例 [examples/src/sheets/main.ts](https://github.com/dream-num/univer/blob/dev/examples/src/sheets/main.ts)

## 框架

- Univer [packages/core/src/basics/univer.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/basics/univer.ts)
- 插件基类定义 [packages/core/src/plugin/plugin.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/plugin/plugin.ts)

## 文档
  
- 文字选区管理 [packages/docs/src/services/text-selection-manager](https://github.com/dream-num/univer/blob/dev/packages/docs/src/services/text-selection-manager.service.ts)
- 复制粘贴 [packages/docs/src/commands/commands/clipboard.command.ts](https://vscode.dev/github/dream-num/univer/blob/dev/packages/docs/src/commands/commands/clipboard.command.ts)

## 表格
  
- 数据结构定义 [packages/core/src/types/interfaces](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces)

  - 单元格数据结构定义 [packages/core/src/types/interfaces/i-cell-data.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces/i-cell-data.ts)

  - 单元格样式数据结构定义 [packages/core/src/types/interfaces/i-style-data.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces/i-style-data.ts)
  
- 单元格选区管理 [packages/sheets/src/services/selection-manager.service.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/services/selection-manager.service.ts)

- 改变单元格选区 [packages/sheets/src/commands/commands/set-range-values.command.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/commands/commands/set-range-values.command.ts)

- 单元格编辑器

  - 单元格编辑器的实现复用了文档模式的编辑形态。

  - 双击进入的编辑器 [packages/sheets-ui/src/views/editor-container/EditorContainer.tsx](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/views/editor-container/EditorContainer.tsx)

  - 公式栏编辑器 [packages/sheets-ui/src/views/formula-bar/FormulaBar.tsx](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/views/formula-bar/FormulaBar.tsx)

- 快捷键 [packages/sheets-ui/src/controllers/shortcuts](https://github.com/dream-num/univer/tree/dev/packages/sheets-ui/src/controllers/shortcuts)

  - 单元格样式快捷键注册 [packages/sheets-ui/src/controllers/shortcuts/style.shortcut.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/controllers/shortcuts/style.shortcut.ts)

  - 缩放快捷键注册 [packages/sheets-ui/src/controllers/shortcuts/view.shortcut.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/controllers/shortcuts/view.shortcut.ts)

- 复制粘贴 [packages/sheets-ui/src/commands/commands/clipboard.command.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/commands/commands/clipboard.command.ts)

## 命令

:::tip
建议在阅读本小节内容之前先阅读 [渲染引擎架构设计#命令系统](/guides/architecture/architecture/#命令系统) 了解 Univer 命令系统的设计。
:::

- 命令管理 [packages/core/src/services/command/command.service.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/services/command/command.service.ts)
- 撤销回退 [packages/core/src/services/undoredo/undoredo.service.ts](https://vscode.dev/github/dream-num/univer/blob/dev/packages/core/src/services/undoredo/undoredo.service.ts)

## 渲染

:::tip
建议在阅读本小节内容之前先阅读 [渲染引擎架构设计](/guides/architecture/renderer/) 和 [Univer 文档排版设计初探](/blog/doc-typesetting-design)， 了解 Univer 渲染引擎的整体架构设计。
:::

- 渲染引擎 [packages/engine-render/src/engine.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/engine.ts)

  - 画布渲染引擎 [packages/engine-render/src/canvas.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/canvas.ts)

- `BaseObject` 图元基类定义 [packages/engine-render/src/base-object.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/base-object.ts)

  - `BaseObject` 是渲染的逻辑单元，`BaseObject` 定义了图元的基本属性，包括 `width`、`height`、`scaleX`、`scaleY`、`visible` 等用于渲染的底层属性。

  - 渲染引擎会调用图元 `render` 的方法，在 `render` 内实现渲染逻辑，如调用渲染器或 Canvas API 来完成绘制。

  - 图元内还定义了事件接口，为业务层事件处理提供了基础。

- 文档渲染组件 [packages/engine-render/src/components/docs/doc-component.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components/docs/doc-component.ts)

  - 文档渲染组件继承了 `BaseObject`，是一个复杂图元。
  
  - 文档渲染组件注册管理了许多 `ComponentExtension` 渲染器， 如 `FontAndBaseLine`、`Border`、`Background` 等。
  
  - 文档渲染组件 `render` 时，会把 `Skeleton` 数据 （计算后的排版数据）分类型分发给不同的 `ComponentExtension` 渲染器进行 `draw` ，最终完成图元的渲染逻辑。

- `DocSkeletonManagerService` 文档排版数据管理 [packages/docs/src/services/doc-skeleton-manager.service.ts](https://github.com/dream-num/univer/blob/dev/packages/docs/src/services/doc-skeleton-manager.service.ts)

- `FontAndBaseLine` 文字渲染器 [packages/engine-render/src/components/docs/extensions/font-and-base-line.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components/docs/extensions/font-and-base-line.ts)

- 图元及渲染器清单 [packages/engine-render/src/components](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components)

## UniScript

UniScript 是一个标准的拓展插件，你可以阅读 UniScript 的源码来了解如何开发一个拓展插件。

- 面板界面 [packages/uniscript/src/views/components/ScriptEditorPanel.tsx](https://github.com/dream-num/univer/blob/dev/packages/uniscript/src/views/components/ScriptEditorPanel.tsx)

- 执行器 [packages/uniscript/src/services/script-execution.service.ts](https://github.com/dream-num/univer/blob/dev/packages/uniscript/src/services/script-execution.service.ts)

- UniScript 使用示例 [examples/src/uniscript](https://github.com/dream-num/univer/tree/dev/examples/src/uniscript)
