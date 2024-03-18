---
title: 扩展命令
---

:::info
建议在阅读本小节内容之前先[了解 Univer 的命令系统](/zh-cn/guides/architecture/architecture/#命令系统)。
:::

## 创建新命令

创建一个命令需要两个步骤：

第一步，创建一个实现 `ICommand` 接口的对象：

```typescript
import { CommandType, ICommand } from '@univer/core'

export interface IYourCommandInterface {
  // Your command's param's interface.
}

export const YourCommand: ICommand = {
  name: 'your-command',
  type: CommandType.COMMAND,
  handler: async (accessor: IAccessor, params?: IYourCommandInterface) => {
    // Implement your business logic here.
  }
}
```

命令需要声明以下属性：

1. `name`：命令的名称，必须唯一；我们建议以 `业务域:类型:含义` 的方式来命名，例如 `sheet.command.copy`、`sheet.command.paste` 等
2. `type`：命令的类型
3. `handler`：命令的执行逻辑，接收一个 `IAccessor` 对象以及命令参数，通过 `IAccessor` 对象可以访问 Univer 的依赖注入系统

命令可接收参数，参数需要是一个对象，接口由你的业务逻辑决定。当然一个命令也可以不接收参数，此时 `handler` 的第二个参数为 `undefined`。

第二步，将 Command 注册到命令服务上：

```typescript
import { Disposable, ICommandService } from '@univer/core'

export class YourController extends Disposable {
  constructor(
        @ICommandService private readonly _commandService: ICommandService
  ) {
    this.disposeWithMe(this._commandService.registerCommand(YourCommand))
  }
}
```

之后就可以通过 `ICommandService` 来执行命令了。实践中常用的方式是通过 UI 触发，请参考[拓展 UI](/zh-cn/guides/extend/ui)。

### Undo / Redo

Univer 提供了 undo redo 的能力，如果你的命令需要接入，需要在命令的 `handler` 回调函数中调用 `IUndoRedoService` 的对应方法：

```typescript
import { IUndoRedoService } from '@univer/core'

export const YourCommand: ICommand = {
  name: 'your-command',
  type: CommandType.COMMAND,
  handler: async (accessor: IAccessor, params?: IYourCommandInterface) => {
    const undoRedoService = accessor.get(IUndoRedoService)

    undoRedoService.pushUndoRedo({
      unitID: 'your-documents-id',
      undoMutations: [/** mutations for undo */],
      redoMutations: [/** mutations for do and redo */],
    })
  }
}
```

## 扩展已有命令

除了创建新命令，Univer 还支持扩展已有的命令，这在扩展 Univer 内置能力时尤其必要。以下介绍三个比较典型的场景。

### 在其他 COMMAND 执行的时机补充 MUTATIONS

### 扩展复制粘贴

Univer 中的复制粘贴操作都是通过插件化的方式添加的，这意味着你可以:

1. 修改复制/粘贴的默认处理过程;
2. 在默认行为之外再追加一些逻辑。

你可以通过实现 `ISheetClipboardHook` 接口来构造一个你自己的 Hook 对象，并把它添加到 `SheetClipboardService` 上，Univer 默认的复制粘贴行为也是通过这一方式实现的。Hook 对象包含多个可选的复制或粘贴钩子函数（Hook Function），你可以在后面的介绍了解所有钩子的定义和执行时机。

在复制粘贴的过程中，Univer 会调用 `ISheetClipboardHook` 的钩子函数，并按照特定规则及顺序执行。

#### 创建和添加 Hook

```tsx
import { Disposable, ISheetClipboardService } from '@univer/core'

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
    this.disposeWithMe(this._sheetClipboardService.addClipboardHook(yourHook))
  }
}
```

#### 使用 Hook 处理复制流程

复制和粘贴行为并不具有连贯性，复制的来源和粘贴去向不仅会在 Univer 内部，也可能在外部。因此，在 Hook 对象中，复制和粘贴可以进行独立的处理，你可以选择在 你的 Hook 中同时处理复制和粘贴，或只处理一个。Univer 复制粘贴的内容主要通过剪切板来存取，依赖`clipboard.write`API。

在 Univer 中，可以通过快捷键和菜单触发复制操作。触发后，Univer 会将选区内容生成 HTML 和 PLAIN 写入剪切板。

复制和剪切共用 Hook Functions，它们只会在粘贴时进行区分。

Hook 中暴露如下方法来处理 HTML 的生成过程：

1. onBeforeCopy:
   这个 Hook Function 会在复制前执行，你可以在这里做一些前置工作。

2. onCopyCellContent:
   这个 Hook Function 会处理复制单元格的内容，它会决定生成的 HTML 中`<table />`中的`<td />`里的字符串内容。

3. onCopyRow:
   这个 Hook Function 会处理复制行属性，它会决定生成的 HTML 中`<table />`中的`<tr />`里的属性。

4. onCopyColumn:
   这个 Hook Function 会处理复制列属性，它会决定生成的 HTML 中`<table />`中的`<colgroup />`里的字符串内容。

5. onAfterCopy:
   这个 Hook Function 会在复制后执行。

#### 使用 Hook 处理粘贴流程

在 Univer 中，可以通过快捷键和菜单触发粘贴操作。不同于复制，粘贴流程会触发 Mutation 来修改数据，因此关于粘贴的 Hook Function 基本都需要返回 Mutations 数组，需指定 Undo 和 Redo。在 Hook Function 的参数中，可以判断粘贴的来源是复制还是剪切。

Hook 中暴露如下方法来处理粘贴过程：

1. onBeforePaste:
   这个 Hook Function 会在粘贴前执行，你可以在这里做一些前置工作。

2. onPasteCells:
   这个 Hook Function 会处理粘贴单元格，它需要返回处理单元格内容的 Undo Mutations & Redo Mutations，即

3. onPasteRows:
   这个 Hook Function 会处理粘贴行属性，它需要返回处理行属性的 Undo Mutations & Redo Mutations。

4. onPasteColumns:
   这个 Hook Function 会处理粘贴列属性，它需要返回处理列属性的 Undo Mutations & Redo Mutations。

5. onAfterPaste:
   这个 Hook Function 会在粘贴后执行。

#### 例子：在 Univer 中复制粘贴数据格式

在 Univer 表格中，数字格式是一个上层模块，其信息独立于单元格信息之外。在只考虑内部复制粘贴的情况下，它需要在复制时主动去保存格式信息，并在粘贴时执行对应的添加数字格式的操作，因此只需实现 Hook 中的 onBeforeCopy 和 onPasteCells。在 onPasteCells 的实现中，需要区分是剪切还是复制。

```tsx
export class NumfmtCopyPasteController extends Disposable {
  constructor(
        @Inject(Injector) private _injector: Injector,
        @Inject(ISheetClipboardService) private _sheetClipboardService: ISheetClipboardService,
  ) {
    super()
    this._initClipboardHook()
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
    )
  }

  // collect number format info
  private _collectNumfmt(unitId: string, subUnitId: string, range: IRange) {
    // save number format info to private variable
  }

  // generate number format mutations
  private _generateNumfmtMutations(
    pastedRange: IRange,
    copyInfo: {
      copyType: COPY_TYPE
      copyRange?: IRange
      pasteType: string
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
      }
    }
  }
}
```

关于`ISheetClipboardHook`接口的详细定义如下

```typescript
export interface ISheetClipboardHook {
  hookName: string

  specialPasteInfo?: ISpecialPasteInfo
  priority?: number

  onBeforeCopy?: (unitId: string, subUnitId: string, range: IRange) => void
  onCopyCellContent?: (row: number, col: number) => string
  onCopyCellStyle?: (row: number, col: number, rowSpan?: number, colSpan?: number) => IClipboardPropertyItem | null
  onCopyRow?: (row: number) => IClipboardPropertyItem | null
  onCopyColumn?: (col: number) => IClipboardPropertyItem | null
  onAfterCopy?: () => void

  onBeforePaste?: (unitId: string, subUnitId: string, range: IRange) => boolean
  onPasteCells?: (
    pastedRange: IRange,
    matrix: ObjectMatrix<ICellDataWithSpanInfo>,
    pasteType: string,
    copyInfo: {
      copyType: COPY_TYPE
      copyRange?: IRange
      subUnitId?: string
      unitId?: string
    }
  ) => {
    undos: IMutationInfo[]
    redos: IMutationInfo[]
  }
  onPasteRows?: (
    range: IRange,
    rowProperties: IClipboardPropertyItem[],
    pasteType: string
  ) => {
    undos: IMutationInfo[]
    redos: IMutationInfo[]
  }
  onPasteColumns?: (
    range: IRange,
    colProperties: IClipboardPropertyItem[],
    pasteType: string
  ) => {
    undos: IMutationInfo[]
    redos: IMutationInfo[]
  }
  onAfterPaste?: (success: boolean) => void

  getFilteredOutRows?: () => number[]
}
```

### 扩展下拉填充

Univer 中的下拉填充也是通过插件化的方式添加的，类似复制粘贴，这意味着你可以通过实现接口`ISheetAutoFillHook`来添加一个 Hook 对象，从而修改和拓展下拉填充的行为。

#### 创建和添加 Hook

```tsx
import { Disposable, IAutoFillService } from '@univer/core'

export class YourController extends Disposable {
  constructor(
        @IAutoFillService private readonly _autoFillService: IAutoFillService,
  ) {
    const yourHook: ISheetAutoFillHook = {
      id: 'your-hook-id',
      priority: 1,
      type: AutoFillHookType.Append, // This hook will be executed after the default one
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
    this.disposeWithMe(this._autoFillService.addHook(yourHook))
  }
}
```

#### 修改默认下拉填充

除了选区变更以外，Univer 的默认下拉填充行为都是以 Hook 的形式添加的，在它的 Hook Function 中处理了扩充序列内容、样式等逻辑。

这个 Hook 与其他的 Hook 没什么不同，只是`type: AutoFillHookType.Default`而已，这类 Hook 只会有一个生效，并会第一个执行。因此，你完全可以自己写一个`type: AutoFillHookType.Default`的 Hook，只要它的 Priority 比默认的 0 大就行。

```typescript
const yourHook: ISheetAutoFillHook = {
  id: 'your-hook-id',
  priority: 1,
  type: AutoFillHookType.Default,
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

#### 拓展下拉填充

如果在下拉填充时，希望执行一些额外的逻辑，比如让第三方的值也会跟随着下拉一起填充，你可以添加一个`type: AutoFillHookType.Append`的 Hook 对象，并在对应的 Hook Function 处理你的逻辑。这类 Hook 会在 AutoFillHookType.Default 后跟随执行，也可以通过 disable 方法去让它禁用。

```typescript
const yourHook: ISheetAutoFillHook = {
  id: 'your-hook-id',
  priority: 0,
  type: AutoFillHookType.Append,
  disable: (location, direction, applyType) => true,
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
