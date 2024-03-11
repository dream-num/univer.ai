---
title: 文本
sidebar:
  order: 5
---

对富文本区域的文本元素进行操作

## 追加文本

将指定的文本添加到此文本区域的末尾。

```typescript title="main.ts"
const activeDoc = univerAPI.getActiveDocument();
activeDoc?.appendText('Univer');
```