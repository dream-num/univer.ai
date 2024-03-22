---
title: Univer Doc API
sidebar:
  order: 4
---

## Concepts

Univer document-related concepts are designed to be as consistent as possible with Word.

## Text

Operate on text elements in rich text areas

### Append Text

Adds the specified text to the end of this text region.

```ts
const univerAPI = FUniver.newAPI(univer)
const activeDoc = univerAPI.getActiveDocument()
activeDoc?.appendText('Univer')
```
