---
title: 注册公式
sidebar:
  order: 3
---

## 注册公式

使用 `registerFunction` 可以注册自定义公式

```typescript title="main.ts"
import type { PrimitiveValueType } from '@univerjs/engine-formula';

univerAPI.registerFunction({
    calculate: [
        [function (...variants: Array<PrimitiveValueType | PrimitiveValueType[][]>) {
            let sum = 0;

            for(const variant of variants){
                sum += Number(variant) || 0;
            }

            return sum;
        }, 'CUSTOMSUM', '求参数的和'],
        // ... 更多公式
    ]
});
```

如果想要提供更完善的国际化内容和描述，还可以配置 `locales` 和 `description` 字段。如下所示。

```typescript title="main.ts"
import type { PrimitiveValueType } from '@univerjs/engine-formula';

const FUNCTION_NAMES_USER = {
    CUSTOMSUM: 'CUSTOMSUM'
}
univerAPI.registerFunction({
   locales:{
        'zhCN': {
            formulaCustom: {
                CUSTOMSUM: {
                    description: '将单个值、单元格引用或是区域相加，或者将三者的组合相加。',
                    abstract: '求参数的和',
                    links: [
                        {
                            title: '教学',
                            url: 'https://support.microsoft.com/zh-cn/office/sum-%E5%87%BD%E6%95%B0-043e1c7d-7726-4e80-8f32-07b23e057f89',
                        },
                    ],
                    functionParameter: {
                        number1: {
                            name: '数值1',
                            detail: '要相加的第一个数字。 该数字可以是 4 之类的数字，B6 之类的单元格引用或 B2:B8 之类的单元格范围。',
                        },
                        number2: {
                            name: '数值2',
                            detail: '这是要相加的第二个数字。 可以按照这种方式最多指定 255 个数字。',
                        },
                    },
                },
                // ... 更多公式
            },
        },
        'enUS':{
            formulaCustom:{
                CUSTOMSUM: {
                    description: `You can add individual values, cell references or ranges or a mix of all three.`,
                    abstract: `Adds its arguments`,
                    links: [
                        {
                            title: 'Instruction',
                            url: 'https://support.microsoft.com/en-us/office/sum-function-043e1c7d-7726-4e80-8f32-07b23e057f89',
                        },
                    ],
                    functionParameter: {
                        number1: {
                            name: 'number1',
                            detail: 'The first number you want to add. The number can be like 4, a cell reference like B6, or a cell range like B2:B8.',
                        },
                        number2: {
                            name: 'number2',
                            detail: 'This is the second number you want to add. You can specify up to 255 numbers in this way.',
                        },
                    },
                },
            }
        }
    },
    description:[
         {
            functionName: FUNCTION_NAMES_USER.CUSTOMSUM,
            aliasFunctionName: 'formulaCustom.CUSTOMSUM.aliasFunctionName',
            functionType: 15,
            description: 'formulaCustom.CUSTOMSUM.description',
            abstract: 'formulaCustom.CUSTOMSUM.abstract',
            functionParameter: [
                {
                    name: 'formulaCustom.CUSTOMSUM.functionParameter.number1.name',
                    detail: 'formulaCustom.CUSTOMSUM.functionParameter.number1.detail',
                    example: 'A1:A20',
                    require: 1,
                    repeat: 0,
                },
                {
                    name: 'formulaCustom.CUSTOMSUM.functionParameter.number2.name',
                    detail: 'formulaCustom.CUSTOMSUM.functionParameter.number2.detail',
                    example: 'B2:B10',
                    require: 0,
                    repeat: 1,
                },
            ],
        },
        // ... 更多公式
    ],
    calculate: [
        [function (...variants: Array<PrimitiveValueType | PrimitiveValueType[][]>) {
            let sum = 0;

            for(const variant of variants){
                sum += Number(variant) || 0;
            }

            return sum;
        }, 'CUSTOMSUM', '求参数的和'],
        // ... 更多公式
    ]
});
```

## 卸载公式

使用 `unregisterFunction` 可以卸载自定义公式

```typescript title="main.ts"
univerAPI.unregisterFunction({
    functionNames: ['CUSTOMSUM']
})
```

如果配置了国际化内容，也需要移除

```typescript title="main.ts"
univerAPI.unregisterFunction({
    localeKeys: {
         'zhCN': ['formulaCustom'],
         'enUS': ['formulaCustom'],
        },
    functionNames: ['CUSTOMSUM']
})
```
