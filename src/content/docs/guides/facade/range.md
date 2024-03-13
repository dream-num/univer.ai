---
title: Operating Range
sidebar:
  order: 2
---

## Setting a Single Value

Use `setValue` to set the value of a range. This value can be a number, string, boolean, or standard cell format. If it starts with `=`, it is interpreted as a formula. The value will be tiled across all cells in the range.

```typescript title="main.ts"
const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet()

// Set a number in A1
const range1 = activeSheet.getRange(0, 0, 1, 1)
range1.setValue(1)

// Set a string in B1:C2
const range2 = activeSheet.getRange(0, 1, 2, 2)
range2.setValue({ v: 'test' })

// Set a number and background color in D1:E2
const range3 = activeSheet.getRange(0, 3, 2, 2)
range3.setValue({
  v: 2,
  s: {
    bg: { rgb: 'red' }
  }
})
```

## Setting Multiple Values

Use `setValues` to set different values for each cell in a range. These values can be a two-dimensional array or a standard range matrix (must match the dimensions of this range), composed of numbers, strings, booleans, or standard cell formats. If a value starts with `=`, it will be interpreted as a formula.

```typescript title="main.ts"
const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet()

// Set values in B3:C4
const range1 = activeSheet.getRange(2, 1, 2, 2)
range1.setValues([[1, 1], [1, 1]])

// Set values and background colors in D3:E4
const range2 = activeSheet.getRange(2, 3, 2, 2)
range2.setValues({
  2: {
    3: {
      v: 3,
      s: {
        bg: { rgb: 'yellow' }
      }
    },
    4: {
      v: 4,
      s: {
        bg: { rgb: 'green' }
      }
    },
  },
  3: {
    3: {
      v: 5,
      s: {
        bg: { rgb: 'orange' }
      }
    },
    4: {
      v: 6,
      s: {
        bg: { rgb: 'red' }
      }
    },
  },
})
```
