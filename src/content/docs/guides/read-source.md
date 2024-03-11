---
title: Source code reading guide
---

:::note
The content of this chapter is time-sensitive. If you find that the content does not match the source code when reading, please refer to the latest version of the source code. If you find that the document content is incorrect or incomplete, please submit a PR or Issue.
:::

:::tip
It is recommended to read [Univer Architecture](/en-us/guides/architecture/architecture/), [This is Univer](/en-us/blog/this-is-univer), and [Univer Document Architecture and Module Design](/en-us/blog/univer-doc-architecture) before reading this section to understand the overall architecture design of Univer.
:::

If you want to further understand the implementation details of Univer, you can read the source code.

Here are some guidelines, you can choose the module you are interested in to start reading, which is convenient for quick start.

## Basic Example

:::tip
It is recommended to experience the basic functions of Univer in the [playground](/playground) before reading this section.
:::

- document example [examples/src/docs/main.ts](https://github.com/dream-num/univer/blob/dev/examples/src/docs/main.ts)
- sheet example [examples/src/sheets/main.ts](https://github.com/dream-num/univer/blob/dev/examples/src/sheets/main.ts)

## Core Package

### Basic Types

- Univer [packages/core/src/basics/univer.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/basics/univer.ts)
- Plugin [packages/core/src/plugin/plugin.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/plugin/plugin.ts)

### Command

:::tip
It is recommended to read [Architecture#Command System](/en-us/guides/architecture/architecture/#command-system) before reading this section to understand the design of the Univer command system.
:::

- Command manage [packages/core/src/services/command/command.service.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/services/command/command.service.ts)
- Command undo & redo [packages/core/src/services/undoredo/undoredo.service.ts](https://github.com/github/dream-num/univer/blob/dev/packages/core/src/services/undoredo/undoredo.service.ts)

### Render

:::tip
It is recommended to read [Render Engine Architecture](/en-us/guides/architecture/renderer/) and [Univer Document Typesetting Design](/en-us/blog/doc-typesetting-design) before reading this section to understand the overall architecture design of the Univer rendering engine.
:::

- render engine [packages/engine-render/src/engine.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/engine.ts)
  - canvas render engine [packages/engine-render/src/canvas.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/canvas.ts)
- `BaseObject` Graph base object definition [packages/engine-render/src/base-object.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/base-object.ts)
  - `BaseObject` is the logical unit of rendering. `BaseObject` defines the basic properties of the graph, including `width`, `height`, `scaleX`, `scaleY`, `visible`, etc. used for rendering.
  - The rendering engine will call the `render` method of the graph, and implement the rendering logic in `render`, such as calling the renderer or Canvas API to complete the drawing.
  - The graph also defines the event interface, providing a foundation for business layer event processing.
- document component [packages/engine-render/src/components/docs/doc-component.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components/docs/doc-component.ts)
  - The document rendering component inherits `BaseObject` and is a complex graph.
  - The document rendering component registers and manages many `ComponentExtension` renderers, such as `FontAndBaseLine`, `Border`, `Background`, etc.
  - When the document rendering component `render`, it will distribute the `Skeleton` data (calculated typesetting data) to different `ComponentExtension` renderers for `draw`, and finally complete the rendering logic of the graph.
- `DocSkeletonManagerService` Document typesetting data management [packages/docs/src/services/doc-skeleton-manager.service.ts](https://github.com/dream-num/univer/blob/dev/packages/docs/src/services/doc-skeleton-manager.service.ts)
- `FontAndBaseLine` Text renderer [packages/engine-render/src/components/docs/extensions/font-and-base-line.ts](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components/docs/extensions/font-and-base-line.ts)
-Graph and renderer list [packages/engine-render/src/components](https://github.com/dream-num/univer/blob/dev/packages/engine-render/src/components)

## Sheets

### Basic Data Structure

- Data structure definition [packages/core/src/types/interfaces](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces)
  - Cell data structure definition [packages/core/src/types/interfaces/i-cell-data.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces/i-cell-data.ts)
  - Cell style data structure definition [packages/core/src/types/interfaces/i-style-data.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces/i-style-data.ts)

### Core Module

- Cell selection manager [packages/sheets/src/services/selection-manager.service.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/services/selection-manager.service.ts)
- Set cell value and style [packages/sheets/src/commands/commands/set-range-values.command.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/commands/commands/set-range-values.command.ts)

### UI and Render

- Editor
  - The implementation of the cell editor reuses the editing form of the document mode.
  - EditorContainer[packages/sheets-ui/src/views/editor-container/EditorContainer.tsx](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/views/editor-container/EditorContainer.tsx)
  - FormulaBar editor [packages/sheets-ui/src/views/formula-bar/FormulaBar.tsx](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/views/formula-bar/FormulaBar.tsx)
  -shortcuts [packages/sheets-ui/src/controllers/shortcuts](https://github.com/dream-num/univer/tree/dev/packages/sheets-ui/src/controllers/shortcuts)
  - Cell style shortcut registration [packages/sheets-ui/src/controllers/shortcuts/style.shortcut.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/controllers/shortcuts/style.shortcut.ts)
  - Zoom shortcut registration [packages/sheets-ui/src/controllers/shortcuts/view.shortcut.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/controllers/shortcuts/view.shortcut.ts)
- Copy and paste [packages/sheets-ui/src/commands/commands/clipboard.command.ts](https://github.com/dream-num/univer/blob/dev/packages/sheets-ui/src/commands/commands/clipboard.command.ts)

## Document

### Basic Data Structure

- Document data structure[packages/core/src/types/interfaces/i-document-data.ts](https://github.com/dream-num/univer/blob/dev/packages/core/src/types/interfaces/i-document-data.ts)

### Core Module

- Text selection manager [packages/docs/src/services/text-selection-manager.service.ts](https://github.com/dream-num/univer/blob/dev/packages/docs/src/services/text-selection-manager.service.ts)
-Copy and paste [packages/docs/src/commands/commands/clipboard.command.ts](https://github.com/dream-num/univer/blob/dev/packages/docs/src/commands/commands/clipboard.command.ts)

### Document UI and Render

-Control bar menu registration [packages/docs-ui/src/controllers/doc-ui.controller.ts](https://github.com/dream-num/univer/blob/dev/packages/docs-ui/src/controllers/doc-ui.controller.ts)

##Plugin Extension

### Uniscript

You can read the source code of Uniscript to understand how to develop a plugin.

- ScriptEditorPanel [packages/uniscript/src/views/components/ScriptEditorPanel.tsx](https://github.com/dream-num/univer/blob/dev/packages/uniscript/src/views/components/ScriptEditorPanel.tsx)
- Execution [packages/uniscript/src/services/script-execution.service.ts](https://github.com/dream-num/univer/blob/dev/packages/uniscript/src/services/script-execution.service.ts)
-Uniscript using example [examples/src/uniscript](https://github.com/dream-num/univer/tree/dev/examples/src/uniscript)
