---
title: "@univerjs/engine-render"
---

[![npm version](https://img.shields.io/npm/v/@univerjs/engine-render)](https://npmjs.org/package/@univerjs/engine-render)

@univerjs/engine-render provides the capability to render Univer documents on canvas elements. This includes drawing graphic elements, handling cursor interactions, managing scrolling and zooming, etc. The rendering layer of various types of documents is extended on the infrastructure provided by @univerjs/engine-render.

## How to Customize Rendering Extensions?

The rendering of some Univer elements, such as borders and backgrounds, is accomplished using an extension mechanism. Common extension registration points include:

* Middle content area: SpreadsheetExtensionRegistry
* Row headers: SheetRowHeaderExtensionRegistry
* Column headers: SheetColumnHeaderExtensionRegistry

By inheriting `SheetExtension` and providing a unique key, zIndex, and drawing logic, a sheet rendering extension can be implemented as follows:

```ts
class RowHeaderCustomExtension extends SheetExtension {
    override uKey = 'RowHeaderCustomExtension';

    // Must be greater than 10
    override zIndex = 11;

    override draw(ctx: UniverRenderingContext, parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton) {
        // ... primary rendering logic
    }
}

SheetRowHeaderExtensionRegistry.add(new RowHeaderCustomExtension());
```

:::note 
The zIndex for row and column header extensions must be greater than 10, and for middle content area extensions, it must be greater than 50, otherwise, they will be overridden. 
:::

For reference, here is an online example of extending row and column headers: [Render Extension](/playground?title=Render%20Extension)