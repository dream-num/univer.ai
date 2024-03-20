---
title: 操作范围
sidebar:
  order: 6
---

## 设置单个值

使用 `setValue` 可以设置范围的值。该值可以是数字、字符串、布尔值或者标准的单元格格式。如果以 `=` 开头，则被解释为公式。该值会平铺到范围内所有单元格。

```typescript title="main.ts"
const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet();

// A1 设置数字
const range1 = activeSheet.getRange(0, 0, 1, 1);
range1.setValue(1);

// B1:C2 都设置字符串
const range2 = activeSheet.getRange(0, 1, 2, 2);
range2.setValue({ v: 'test' });

// D1:E2 都设置数字和背景色
const range3 = activeSheet.getRange(0, 3, 2, 2);
range3.setValue({
        v: 2,
        s: {
            bg: { rgb: 'red' }
        }
});
```

## 设置多个值

使用 `setValues` 可以为范围中每个单元格设置不同的值，该值可以是一个二维数组或者标准的范围矩阵（必须与此范围的维度相匹配），由数字、字符串、布尔值或者标准的单元格格式组成的。如果某个值以 `=` 开头，则会被解释为公式。

```typescript title="main.ts"
const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet();

// B3:C4 设置值
const range1 = activeSheet.getRange(2, 1, 2, 2);
range1.setValues([[1,1],[1,1]]);

// D3:E4 设置值和背景色
const range2 = activeSheet.getRange(2, 3, 2, 2);
range2.setValues({
    2:{
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
    3:{
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
});
```
