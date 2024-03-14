---
title: 拓展 Canvas
---

## 如何自定义渲染扩展？

Univer 部分元素的渲染，如边框和背景，就是使用扩展机制来完成的。常用扩展注册入口，比如：

- 中间内容区域： SpreadsheetExtensionRegistry
- 行标题：SheetRowHeaderExtensionRegistry
- 列标题：SheetColumnHeaderExtensionRegistry

继承 `SheetExtension` 后，提供唯一键值、层级、绘制逻辑就能实现一个 Sheet 渲染扩展。如下：

```typescript
class RowHeaderCustomExtension extends SheetExtension {
  override uKey = 'RowHeaderCustomExtension'

  // 必须大于 10
  override get zIndex() {
    return 11
  }

  override draw(ctx: UniverRenderingContext, parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton) {
    // ... 主要的渲染逻辑
  }
}

SheetRowHeaderExtensionRegistry.add(new RowHeaderCustomExtension())
```

:::note
行标题、列标题的扩展 zIndex 必须大于 10，中间内容区域的扩展 zIndex 必须大于 50，否则会被覆盖。
:::

可参考的扩展行标题和列标题的在线案例：[Render Extension](/playground?title=Render%20Extension)
