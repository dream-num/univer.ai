---
title: Extending Canvas
---

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
    override get zIndex() {
        return 11;
    }

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