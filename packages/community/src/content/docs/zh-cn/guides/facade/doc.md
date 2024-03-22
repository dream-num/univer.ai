---
title: Univer Doc API
sidebar:
  order: 4
---

## 概念

Univer 文档相关概念会尽可能与 Word 保持一致。

## 文本 Text

对富文本区域的文本元素进行操作

### 追加文本

将指定的文本添加到此文本区域的末尾。

```ts
const univerAPI = FUniver.newAPI(univer)
const activeDoc = univerAPI.getActiveDocument()
activeDoc?.appendText('Univer')
```
