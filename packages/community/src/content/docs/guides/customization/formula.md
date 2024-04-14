---
title: Custom Formula
---

## How to configure custom formulas through plugin

Follow the steps below to implement a custom formula `CUSTOMSUM`, configure the formula information into the formula plugin, and register the formula plugin with Univer.

You can create a new `custom-function.ts` file to specifically place custom formula-related modules, or write it directly before `univer` is initialized.

1. Define formula name

    First, give the formula a name. We require that it cannot be repeated with the name of the existing formula. The existing formula is mainly from [Office Excel](https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb) refer to.

    We collect multiple custom formulas in an enumeration.

    ```ts
    /**
     * function name
     */
    export enum FUNCTION_NAMES_USER {
      CUSTOMSUM = "CUSTOMSUM",
    }
    ```

2. Define internationalization

    Define the international content you need. For detailed field descriptions, please refer to the [How to add formulas in UniverFormulaEnginePlugin](./#how-to-add-formulas-in-univerformulaengineplugin) section. Similarly, multiple formulas are distinguished by using the formula name as the `key` value.

    ```ts
    /**
     *i18n
     */
    export const functionEnUS = {
        formulaCustom: {
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
        },
    };

    export const functionZhCN = {
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
        },
    };
    ```

3. Registration internationalization

    Expand the internationalization content you defined in the original internationalization object.

    ```ts
    export const locales = {
        [LocaleType.EN_US]: {
            ...UniverSheetsEnUS,
            ...UniverDocsUIEnUS,
            ...UniverSheetsUIEnUS,
            ...UniverUiEnUS,
            ...UniverDesignEnUS,
            ...functionEnUS,
        },
        [LocaleType.ZH_CN]: {
            ...functionZhCN,
        },
    };
    ```

4. Definition description

    The description of the formula mainly configures internationalized fields, which are used for formula search prompts, details panels, etc.

    ```ts
    import type { IFunctionInfo } from '@univerjs/engine-formula';
    import { FunctionType } from '@univerjs/engine-formula';

    /**
    * description
    */
    export const FUNCTION_LIST_USER: IFunctionInfo[] = [
        {
            functionName: FUNCTION_NAMES_USER.CUSTOMSUM,
            aliasFunctionName: 'formulaCustom.CUSTOMSUM.aliasFunctionName',
            functionType: FunctionType.User,
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
    ];
    ```

5. Registration description

    Pass in the description object you defined when registering the formula plugin.

    ```ts
    // universal
    univer.registerPlugin(UniverSheetsFormulaPlugin, {
        description: FUNCTION_LIST_USER,
    });
    ```

6. Define formula algorithm

    Write specific formula calculation logic, map algorithms and formula names.

    ```ts
    import type { ArrayValueObject, BaseValueObject, IFunctionInfo } from '@univerjs/engine-formula';
    import { BaseFunction, FunctionType, NumberValueObject } from '@univerjs/engine-formula';

    /**
    * Function algorithm
    */
    export class Customsum extends BaseFunction {
        override calculate(...variants: BaseValueObject[]) {
            let accumulatorAll: BaseValueObject = NumberValueObject.create(0);
            for (let i = 0; i < variants.length; i++) {
                let variant = variants[i];

                if (variant.isError()) {
                return variant;
                }

                if (accumulatorAll.isError()) {
                return accumulatorAll;
                }

                if (variant.isArray()) {
                variant = (variant as ArrayValueObject).sum();
                }

                accumulatorAll = accumulatorAll.plus(variant as BaseValueObject);
            }

            return accumulatorAll;
        }
    }

    // Mapping of algorithms and names
    export const functionUser = [[Customsum, FUNCTION_NAMES_USER.CUSTOMSUM]];
    ```

7. Registration formula algorithm

    Pass in the formula algorithm object you defined in `UniverFormulaEnginePlugin`.

    ```ts
    univer.registerPlugin(UniverFormulaEnginePlugin, {
        function: functionUser,
    });
    ```
    :::tip
    If `UniverFormulaEnginePlugin` is instantiated in `worker`, you need to register the formula algorithm in `UniverFormulaEnginePlugin` in `worker`, otherwise the custom formula cannot be executed.
    :::

8. Test

    At this point, the development of the custom formula is completed, and now it is time to test it. Enter `=CUSTOMSUM` in any blank cell and expect to get a formula prompt. Here is a [Custom Formula Demo](/playground?title=Custom%20Function) for reference.

## How to add formulas in third-party plugin

If you are developing a Univer plugin, you can add custom formulas directly to the plugin to facilitate code management in a plugin repository.

Our internal `UniverFormulaEnginePlugin` plugin provides a `function.service` specifically for registering formula descriptions and algorithms.

First refer to [Custom Plugin](https://univer.ai/guides/customization/write-a-plugin/) to create a new plugin, and then you can start adding custom formulas.

1. Create a new `custom-function.ts` file in the `common` file and write all the basic modules required for the formula.

    ```ts
    import type { ArrayValueObject, BaseValueObject, IFunctionInfo } from '@univerjs/engine-formula';
    import { BaseFunction, FunctionType, NumberValueObject } from '@univerjs/engine-formula';

    /**
     * function name
     */
    export enum FUNCTION_NAMES_USER {
        CUSTOMSUM = 'CUSTOMSUM',
    }

    /**
     *i18n
     */
    export const functionEnUS = {
        formulaCustom: {
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
        },
    };

    export const functionZhCN = {
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
        },
    };

    /**
     * description
     */
    export const FUNCTION_LIST_USER: IFunctionInfo[] = [
        {
            functionName: FUNCTION_NAMES_USER.CUSTOMSUM,
            aliasFunctionName: 'formulaCustom.CUSTOMSUM.aliasFunctionName',
            functionType: FunctionType.User,
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
    ];

    /**
     * Function algorithm
     */
    export class Customsum extends BaseFunction {
        override calculate(...variants: BaseValueObject[]) {
            let accumulatorAll: BaseValueObject = NumberValueObject.create(0);
            for (let i = 0; i < variants.length; i++) {
                let variant = variants[i];

                if (variant.isError()) {
                    return variant;
                }

                if (accumulatorAll.isError()) {
                    return accumulatorAll;
                }

                if (variant.isArray()) {
                    variant = (variant as ArrayValueObject).sum();
                }

                accumulatorAll = accumulatorAll.plus(variant as BaseValueObject);
            }

            return accumulatorAll;
        }
    }

    export const functionUser = [[Customsum, FUNCTION_NAMES_USER.CUSTOMSUM]];
    ```

2. Create a new `custom-description.controller.ts` under the `controllers` folder to register formula internationalization content and description.

    ```ts
    import { Disposable, LifecycleStages, LocaleService, OnLifecycle } from '@univerjs/core';
    import { Inject } from '@wendellhu/redi';

    import { FUNCTION_LIST_USER, functionEnUS, functionZhCN } from '../common/custom-function';
    import { IDescriptionService } from '../services/description.service';

    @OnLifecycle(LifecycleStages.Ready, CustomDescriptionController)
    export class CustomDescriptionController extends Disposable {
        constructor(
            @IDescriptionService private readonly _descriptionService: IDescriptionService,
            @Inject(LocaleService) private readonly _localeService: LocaleService
        ) {
            super();

            this._initialize();
        }

        private _initialize(): void {
            this._registerLocales();
            this._registerCustomDescriptions();
        }

        private _registerLocales() {
            this._localeService.load({
                zhCN: functionZhCN,
                enUS: functionEnUS,
            });
        }

        private _registerCustomDescriptions() {
            this._descriptionService.registerDescription(FUNCTION_LIST_USER);
        }
    }
    ```

3. Create a new `custom-function.controller.ts` under the `controllers` folder to register formula algorithms.

    ```ts
    import { Disposable, LifecycleStages, OnLifecycle } from '@univerjs/core';
    import type { BaseFunction, IFunctionNames } from '@univerjs/engine-formula';
    import { IFunctionService } from '@univerjs/engine-formula';
    import { type Ctor } from '@wendellhu/redi';

    import { functionUser } from '../common/custom-function';

    @OnLifecycle(LifecycleStages.Ready, CustomFunctionController)
    export class CustomFunctionController extends Disposable {
        constructor(@IFunctionService private readonly _functionService: IFunctionService) {
            super();

            this._initialize();
        }

        private _initialize(): void {
            this._registerCustomFunctions();
        }

        private _registerCustomFunctions() {
            const functions: BaseFunction[] = [...functionUser].map((registerObject) => {
                const Func = registerObject[0] as Ctor<BaseFunction>;
                const name = registerObject[1] as IFunctionNames;

                return new Func(name);
            });

            this._functionService.registerExecutors(...functions);
        }
    }
    ```

4. In the plugin entry file `plugin.ts`, register `custom-description.controller.ts` and `custom-function.controller.ts` into the DI system.

    ```ts
    initialize(): void {
        // ... other logic

        const dependencies: Dependency[] = [
             // ... other modules
            [CustomFunctionController],
            [CustomDescriptionController],
        ];

        dependencies.forEach((dependency) => this._injector.add(dependency));
    }
    ```

    Start Univer and enter `=CUSTOMSUM` in any blank cell to test this newly added formula.

## Write a plugin to register formulas

In addition to registering through the `UniverFormulaEnginePlugin` configuration, the formula algorithm module can also be separately packaged as a plugin for registration.

First of all, there is no need to register `CustomFunctionController` in `plugin.ts`. Create a new `custom-function-plugin.ts` in the same directory, specifically for registering `CustomFunctionController`.

```ts
import { Plugin, PluginType } from '@univerjs/core';
import type { Dependency } from '@wendellhu/redi';
import { Inject, Injector } from '@wendellhu/redi';

import { FORMULA_UI_PLUGIN_NAME } from './common/plugin-name';
import { CustomFunctionController } from './controllers/custom-function.controller';

export class UniverSheetsCustomFunctionPlugin extends Plugin {
     static override type = PluginType.Sheet;

     constructor(@Inject(Injector) override readonly _injector: Injector) {
         super(FORMULA_UI_PLUGIN_NAME);
     }

     initialize(): void {
         const dependencies: Dependency[] = [[CustomFunctionController]];

         dependencies.forEach((dependency) => this._injector.add(dependency));
     }

     override onReady(): void {
         this.initialize();
     }
}
```

Then export it in `index.ts`

```ts
export { UniverSheetsCustomFunctionPlugin } from './custom-function-plugin';
```

Register plugin

```ts
import { UniverSheetsCustomFunctionPlugin } from '@univerjs/sheets-formula';

// ...initialize other plugins
univer.registerPlugin(UniverSheetsCustomFunctionPlugin);
```
