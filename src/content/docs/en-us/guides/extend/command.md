---
title: Extend Command
---

:::info
Before reading this section, we suggest that you familiarize yourself with [Univer's command system](/guides/architecture/architecture/#CommandSystem) 
:::

## Create a New Command


### Undo / Redo


## Extend an Existing Command

Beyond creating new commands, Univer also supports extending existing ones, a feature especially important for expanding Univer's built-in capabilities. Here, three representative scenarios are introduced.
### Add Mutations at the Specific Command Execution Time



### Extend the Copy-paste Functionality

In Univer, copy&paste operations are all added via hooks, which means that you can:

1. Modify the default handling process of copying/pasting;
2. Add some process in addition to the default.

To create a custom hook object, implement the `ISheetClipboardHook` interface and add it to the `SheetClipboardService`. The default copy-paste behavior in Univer is implemented in this way.

The hook object contains multiple optional hook functions for copying or pasting. You can learn about the definitions and execution times of all hooks in a later introduction.

During the copy-paste process, Univer will call the hook functions of `ISheetClipboardHook` and execute them in a specific order and rule.

#### Create and Add a Hook

```tsx

import { ISheetClipboardService, Disposable } from '@univer/core';

export class YourController extends Disposable {
    constructor(
        @ISheetClipboardService private readonly _sheetClipboardService: ISheetClipboardService
    ) {
        const yourHook: ISheetClipboardHook = {
            id: 'your-hook-id',
            onBeforeCopy: () => {
                alert('Hello!') // In this method, your code will be executed before copying.
            }
            // all hook methods are optional, you can learn it from interface definition.
        }
        // register your hook
        this.disposeWithMe(this._sheetClipboardService.addClipboardHook(yourHook));
    }
}
```

#### Handling the Copy Process with Hooks
Copy and paste behaviors are not always consistent, and the source of the copy and the destination of the paste can be both within Univer and external to it. Therefore, in a hook object, copy and paste can be processed independently, and you can choose to implement both or only one of them. In Univer, copy-paste behavior is mainly handled through the clipboard and relies on the `clipboard.write` API.

Copy and cut operations can be triggered in Univer through keyboard shortcuts and menus. Once triggered, Univer will generate HTML and PLAIN text and write them to the clipboard.

Copy and cut share Hook Functions, which will be distinguished only during paste.

The following methods are exposed to implement in hook to handle the HTML generation process:

1. onBeforeCopy:
This Hook Function will be executed before the copy, and you can do some preliminary work here.

2. onCopyCellContent:
This Hook Function will handle the content of the copied cell, and it will process the string content of the <td /> inside the <table /> in the generated HTML.

3. onCopyRow:
This Hook Function will handle the row properties of the copy, and it will process the attributes of the <tr /> inside the <table /> in the generated HTML.

4. onCopyColumn:
This Hook Function will handle the column properties of the copy, and it will process the string content of the <colgroup /> inside the <table /> in the generated HTML.

5. onAfterCopy:
This Hook Function will be executed after the copy.


#### Handling the Paste Process with Hooks

In Univer, the paste operation can be triggered through keyboard shortcuts and menus. Unlike copy, paste flow involves mutation to modify data, and therefore, the Hook Functions related to paste mostly need to return a Mutations array, which should specify Undo and Redo. The parameters of the Hook Function can be used to determine whether the paste is from copy or cut.

The following methods are exposed in the hook to handle the paste process:

1. onBeforePaste:
This Hook Function will be executed before the paste, and you can do some preliminary work here.

2. onPasteCells:
This Hook Function will handle pasting the cells, and it should return the Undo Mutations & Redo Mutations for handling the cell content.

3. onPasteRows:
This Hook Function will handle pasting the row properties, and it should return the Undo Mutations & Redo Mutations for handling the row properties.

4. onPasteColumns:
This Hook Function will handle pasting the column properties, and it should return the Undo Mutations & Redo Mutations for handling the column properties.

5. onAfterPaste:
This Hook Function will be executed after the paste.

#### Example: Number Format Copy-Paste in Univer

In Univer tables, the number format is a top-level module, and its information is independent of cell information. In the case of internal copy-paste, it requires actively saving format information when copying and performing corresponding operations to add number format when pasting. Therefore, only the onBeforeCopy and onPasteCells hooks need to be implemented. In the onPasteCells implementation, it is necessary to distinguish whether it is cut or copy.

```tsx
export class NumfmtCopyPasteController extends Disposable {
    constructor(
        @Inject(Injector) private _injector: Injector,
        @Inject(ISheetClipboardService) private _sheetClipboardService: ISheetClipboardService,
    ) {
        super();
        this._initClipboardHook();
    }

    // register hook
    private _initClipboardHook() {
        this.disposeWithMe(
            this._sheetClipboardService.addClipboardHook({
                hookName: 'numfmt',
                onBeforeCopy: (unitId, subUnitId, range) => this._collectNumfmt(unitId, subUnitId, range),
                onPasteCells: (pastedRange, _m, _p, _copyInfo) =>
                    this._generateNumfmtMutations(pastedRange, { ..._copyInfo, pasteType: _p }),
            })
        );
    }

    // collect number format info
    private _collectNumfmt(unitId: string, subUnitId: string, range: IRange) {
        // save number format info to private variable
    }

    // generate number format mutations
    private _generateNumfmtMutations(
        pastedRange: IRange,
        copyInfo: {
            copyType: COPY_TYPE;
            copyRange?: IRange;
            pasteType: string;
        }
    ) {
        if (copyInfo.copyType === COPY_TYPE.CUT) {
            // remove number format info
        }
        if (copyInfo.pasteType === PASTE_TYPE.COPY) {
            // add number format info
            return {
                redos: [
                    { id: RemoveNumfmtMutation.id, params: removeRedos },
                    { id: SetNumfmtMutation.id, params: setRedos },
                ],
                undos: [
                    ...factorySetNumfmtUndoMutation(this._injector, setRedos),
                    ...factoryRemoveNumfmtUndoMutation(this._injector, removeRedos),
                ],
            };
        }
    }
}
```

Here is the detailed definition of the `ISheetClipboardHook` interface:


```ts
export interface ISheetClipboardHook {
    hookName: string;

    specialPasteInfo?: ISpecialPasteInfo;
    priority?: number;

    onBeforeCopy?(unitId: string, subUnitId: string, range: IRange): void;
    onCopyCellContent?(row: number, col: number): string;
    onCopyCellStyle?(row: number, col: number, rowSpan?: number, colSpan?: number): IClipboardPropertyItem | null;
    onCopyRow?(row: number): IClipboardPropertyItem | null;
    onCopyColumn?(col: number): IClipboardPropertyItem | null;
    onAfterCopy?(): void;

    onBeforePaste?(unitId: string, subUnitId: string, range: IRange): boolean;
    onPasteCells?(
        pastedRange: IRange,
        matrix: ObjectMatrix<ICellDataWithSpanInfo>,
        pasteType: string,
        copyInfo: {
            copyType: COPY_TYPE;
            copyRange?: IRange;
            subUnitId?: string;
            unitId?: string;
        }
    ): {
        undos: IMutationInfo[];
        redos: IMutationInfo[];
    };
    onPasteRows?(
        range: IRange,
        rowProperties: IClipboardPropertyItem[],
        pasteType: string
    ): {
        undos: IMutationInfo[];
        redos: IMutationInfo[];
    };
    onPasteColumns?(
        range: IRange,
        colProperties: IClipboardPropertyItem[],
        pasteType: string
    ): {
        undos: IMutationInfo[];
        redos: IMutationInfo[];
    };
    onAfterPaste?(success: boolean): void;

    getFilteredOutRows?(): number[];
}

```

### Extend the Drop-down Filling

In Univer, the drop-down filling is also implemented through hooks, similar to copy-paste. This means that you can implement the `ISheetAutoFillHook` interface to add a hook object to modify and extend the behavior of drop-down filling.

#### Create and Add a Hook

```tsx
import { IAutoFillService, Disposable } from '@univer/core';

export class YourController extends Disposable {
    constructor(
        @IAutoFillService private readonly _autoFillService: IAutoFillService,
    ) {
        const yourHook: ISheetAutoFillHook = {
            id: 'your-hook-name',
            priority: 1,
            type: AutoFillHookType.Append // This hook will be executed after the default one
            onBeforeFillData: (location, direction) => {
                // In this method, you can cache the date in source range in case of refilling
                console.log(`AutoFill will apply from Range-${location.source} to Range-${location.target}`)
            },
            onFillData: (location, direction, applyType) => {
                console.log(`apply type is ${applyType}`)
                // In this method, you can provide the mutations in redos which are supposed to be executed.
                // Undos is also necessary.
                return {
                    undos: [],
                    redos: [],
                }
                
            },
            onAfterFillData: (location, direction, applyType) => {
                console.log('AutoFill is completed.')
            }
            // all hook methods are optional, you can learn it from interface definition.
        }
        // register your hook
        this.disposeWithMe(this._autoFillService.addHook(yourHook));
    }
}

```
#### Modifying the Default Drop-Down Filling
In Univer, the **default** drop-down filling is implemented using hooks, with the exception of changes to the selection. Its Hook Function handles the sequence content and style.

This default hook is similar to other hooks, except for its type is `AutoFillHookType.Default`. Only one such hook can be effective, and it will be the first to execute. Therefore, you can write your own default hook, as long as its Priority is greater than the default value of 0.

```tsx
const yourHook: ISheetAutoFillHook = {
            id: 'your-hook-name',
            priority: 1,
            type: AutoFillHookType.Default
            onBeforeFillData: (location, direction) => {
                console.log(`AutoFill will apply from Range-${location.source} to Range-${location.target}`)
            },
            onFillData: (location, direction, applyType) => {
                return {
                    undos: [],
                    redos: [],
                }
            },
            onAfterFillData: (location, direction, applyType) => {
                console.log('AutoFill is completed.')
            }
        }
```

#### Add Mutations to the Drop-Down Filling

If you want to execute some additional mutations during drop-down filling, such as having third-party values also fill down with the selection, you can add a hook object which type is `AutoFillHookType.Append`, and write your codes in the corresponding Hook Function. This type of hook will be executed after the default hook. it and can also be disabled using the disable method.

```tsx
const yourHook: ISheetAutoFillHook = {
            id: 'your-hook-name',
            priority: 0,
            type: AutoFillHookType.Append,
            disable: (location, direction, applyType) => true
            onBeforeFillData: (location, direction) => {
                console.log(`AutoFill will apply from Range-${location.source} to Range-${location.target}`)
            },
            onFillData: (location, direction, applyType) => {
                return {
                    undos: [],
                    redos: [],
                }    
            },
            onAfterFillData: (location, direction, applyType) => {
                console.log('AutoFill is completed.')
            }
        }
```
