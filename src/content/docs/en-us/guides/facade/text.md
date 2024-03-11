---
title: Text
sidebar:
  order: 5
---

Operate on text elements in rich text areas

## Append Text

Adds the specified text to the end of this text region.

```typescript title="main.ts"
const activeDoc = univerAPI.getActiveDocument();
activeDoc?.appendText('Univer');
```