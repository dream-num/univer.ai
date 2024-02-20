---
title: 为 Univer 编写一个 CSV 导入插件
desc: 跟随本案例编写一个 Univer 插件，在操作栏添加一个按钮图标，点击后可以导入 CSV 文件到表格中。
tags: 
  - Sheet
  - Import
  - CSV
  - Guide
cover: ./cover.png
date: 2024-01-24
author: Song Xiang
lang: zh-cn
slug: blog/write-a-csv-import-plugin
---

我们将通过编写一个实际案例，来学习如何编写一个 Univer 插件。

学习本案例，你可以学习如下内容：

- 如何创建一个 Univer 插件
- 如何将插件挂载到 Univer 实例中
- 如何使用插件的生命周期
- 如何使用 Univer 依赖注入系统
- 如何定制 Univer 的 UI
- 如何访问和使用 Univer 底层 API

假设你已经有了以下知识储备：

- JavaScript 基础
- TypeScript 基础

## 案例介绍

这个插件允许用户导入 CSV 格式的文件到 Univer 表格中。

我们先来体验一下这个插件的效果。

在线体验：[CSV 导入插件](/playground?title=CSV%20Import%20Plugin)

## 需求拆解

插件需要完成以下功能：

1. 通过 Univer API 向工具栏追加一个菜单按钮，定义菜单按钮的图标、文本等属性。
2. 响应菜单按钮的点击事件，点击菜单按钮后弹出浏览器的文件选择框，选择 CSV 文件。
3. 将 CSV 内容转换成 Univer 的数据结构。
4. 通过 Univer API 将数据设置到当前表格的单元格中。

## 准备工作

### 1. 创建插件

Univer 并不限制你创建插件的方式，为了达到更高的工程化标准，推荐通过[命令行工具创建](/guides/extend/write-a-plugin/#创建项目)。

本文为了演示方便，我们直接手动编写的方式创建插件。你可以跟随本文一起动手实践，我们将基于 [Vite 初始 Demo](https://github.com/awesome-univer/sheets-vite-demo) 源码开发，进入 [Playground](/playground/?title=Vite) 一起开始。

我们在 `src/plugins` 目录下创建 `ImportCSVButton.ts` 文件，代码如下：

```ts
import { Plugin, Univer } from "@univerjs/core";
import { Inject, Injector } from '@wendellhu/redi';

/**
 * Import CSV Button Plugin 
 * A simple Plugin example, show how to write a plugin.
 */
class ImportCSVButtonPlugin extends Plugin {
  constructor (
    // inject injector, required
    @Inject(Injector) override readonly _injector: Injector
  ) {
    super('import-csv-plugin');     // plugin id
  }

  /** Plugin onStarting lifecycle */
  onStarting () {
    console.log('onStarting');     // todo something
  }
}

export default ImportCSVButtonPlugin;
```

插件需要继承 `Plugin` 类，该类提供了插件的基础功能，如插件的生命周期、插件的依赖注入等。

插件ID 通过 `super` 父类构造方法传入，该 ID 用于标识插件，必须是唯一的。

我们在插件的构造函数中，通过装饰器 `@Inject` 注入了 `Injector` 对象，该对象可以用于获取 Univer 的其他对象。

如果我们需要使用 Univer 的其他对象，可以通过 `@Inject` 装饰器注入的方式来获取，后面还会讲到。

我们在插件的 `onStarting` 生命周期中，输出了一段日志，该生命周期会在插件挂载到 Univer 实例时执行，我们在该生命周期中初始化插件的内部模块。

关于插件的生命周期的更多信息，可以查看 [插件生命周期](/guides/architecture/architecture/#插件生命周期) 了解更多。

### 2. 挂载插件到 Univer 实例

查询 API 文档，我们可以找到 `Univer.registerPlugin` 方法，该方法可以将插件挂载到 Univer 实例中。

我们在 `src/index.ts` 中挂载插件，代码如下：

```ts
import { Univer } from "@univerjs/core";
import ImportCSVButtonPlugin from "../plugins/ImportCSVButton";
//  ...omit other code

const univer = new Univer();
//  ...omit other code

univer.registerPlugin(csvImportPlugin);
```

刷新页面，可以看到控制台输出了 `onStarting` 日志，说明插件已经挂载到 Univer 实例中并执行了 `onStarting` 生命周期。

:::note
插件的挂载顺序取决于插件内部的依赖关系，如果插件 A 依赖插件 B，那么插件 B 必须先于插件 A 挂载到 Univer 实例中。
:::

文档：[Univer.registerPlugin](/api/core/classes/Univer.html#registerPlugin)

## 开发插件

### 1. 注册菜单按钮 UI

我们在插件的 `onStarting` 生命周期中追加工具栏按钮。

追加操作栏菜单按钮使用 `IMenuService.addMenuItem` 方法，该方法接收一个 `IMenuItem` 对象作为参数，该对象定义了菜单按钮的图标、文本、显示位置等属性。

首先，我们需要定义一个 `IMenuItem` 对象，代码如下：

```ts
const menuItem: IMenuItem = {
    id: 'import-csv-button',    // button id, also used as the click event command id
    title: 'Import CSV',        // button text
    tooltip: 'Import CSV',      // tooltip text
    icon: 'RenameSingle',       // button icon
    type: MenuItemType.BUTTON,  // button type
    positions: [MenuPosition.TOOLBAR_START], // add to toolbar
};
```

然后，我们需要访问到 `IMenuService` 的实例对象，该对象可以通过 `@Inject(注入ID)` 装饰器从 DI 容器中获取。

:::note
通过注入 ID 我们就可以从 DI 容器中获取到对应的对象实例，注入ID 可以是字符串常量，为了维护方便，常会定义一个变量名来存放注入 ID。

在 Univer 中，注入 ID 通常与接口名称相同，例如 `IMenuService` 接口类型的类实现的实例对象的注入 ID 的变量名也是 `IMenuService` 。
:::

我们在插件构造函数中注入 `IMenuService` 接口的类实现的实例对象，代码如下：

```ts
import { IMenuService } from "@univerjs/core";
// ...omit other code

class ImportCSVButtonPlugin extends Plugin {
  constructor (
    // inject injector, required
    @Inject(Injector) override readonly _injector: Injector,
    // inject menu service, to add toolbar button
    @Inject(IMenuService) private menuService: IMenuService,
  ) {
    // ...omit other code
  }
  // ...omit other code
}
// ...omit other code
```

这样，我们就可以在插件的 `onStarting` 生命周期中，访问 `IMenuService` 的实例对象追加菜单按钮了，代码如下：

```ts
// ...omit other code
onStarting () {
  // ...omit other code
  this.menuService.addMenuItem(menuItem);
}
// ...omit other code
```

刷新页面，可以看到工具栏中多了一个菜单按钮，但现在还不能点击，因为我们还没有定义菜单按钮的点击事件。

### 2. 注册命令来响应菜单按钮点击事件

在 Univer 菜单工具栏中，菜单按钮的点击会触发一个与菜单按钮 `id` 相同的命令，所以我们只需要注册同名命令即可响应菜单按钮的点击事件。

通过 `ICommandService.registerCommandHandler` 我们可以注册一个新命令，与 `IMenuService` 同理，通过注入ID `ICommandService` 可以获取对应的对象实例，我们在插件构造函数添加如下代码：

```ts
import { ICommandService } from "@univerjs/core";
// ...omit other code
constructor (
  // ...omit other code
  // inject command service, to register command handler
  @Inject(ICommandService) readonly commandService: ICommandService
) {
  // ...omit other code
}
// ...omit other code

```

然后，我们在插件的 `onStarting` 生命周期中，注册该菜单按钮点击事件的命令，代码如下：

```ts
// ...omit other code
onStarting () {
  // ...omit other code

  const command: ICommand = {
    id: "import-csv-button",             // command id, same as menu button id
    type: CommandType.OPERATION,
    handler: (accessor: IAccessor) => {
      console.log('click button');       // todo something
      return true;
    }
  }

  // register command handler
  this.commandService.registerCommand(command);
}
// ...omit other code
```

`ICommand.handler` 是事件处理函数，当命令被触发时，该函数会被调用。

:::note
函数的参数 `accessor` 是 `IAccessor` 对象，通过该对象可以访问 DI 容器中的其他对象，`IAccessor.get` 与 `Inject` 装饰器类似，都是依赖注入系统的一部分。

`IAccessor` 将 `Command` 与 Univer 的其他对象解耦，使组织代码可以更加灵活，提高可维护性。
:::

刷新页面，可以看到点击按钮后，控制台输出了 `click button` 日志，说明按钮点击事件已经注册成功。

参考文档：

- [ICommandService.registerCommandHandler](/api/core/interfaces/ICommandService.html#registerCommandHandler)
- [ICommand](/api/core/interfaces/ICommand.html)

### 3. 转换 CSV 为 ICellData

接下来，我们需要在点击事件中弹出文件选择框，读取用户选择的 CSV 文件，这块代码不涉 Univer，就不在本文赘述了, 可以自行查看 `waitUserSelectCSVFile` 方法的[实现源码](https://github.com/awesome-univer/csv-import-plugin-demo/blob/main/src/plugins/ImportCSVButton.ts#L21)。

我们讲下如何将 CSV 二层数组转换成 Univer 的数据结构 `ICellData` 。

`ICellData` 是 Univer 中的单元格数据结构，它包含了单元格的值和样式，其中值存放在 `v` 属性中，样式存放在 `s` 属性中，简化后的代码如下：

```ts
import type { ICellData } from "@univerjs/core";
// ...omit other code

const parseCSVToUniverData = (csv: string[][]): ICellData[][] => {
  return csv.map((row) => {
    return row.map((cell) => {
      return {
        v: cell || '',
      }
    })
  })
}
// ...omit other code
```

参考文档：[ICellData](/api/core/interfaces/ICellData.html)

### 4. 设置数据到表格

将 CSV 数据设置到当前表格中，可以通过 `ICommandService.executeCommand` 方法调用 `SetRangeValuesCommand` 命令来实现。

:::note
Univer 中绝大多数的操作都注册有命令，为开发者提供统一的使用体验，方便扩展和维护。

另外，我们刚刚定义的菜单按钮点击事件，也可以被其它插件或者用户通过命令触发。

如果你想了解更多关于命令的内容，可以查看 [命令系统](/guides/architecture/architecture/#命令系统) 了解更多。
:::

可以使用 `this.commandService.executeCommand` 访问 `ICommandService` 的实例对象，但为了代码的解耦，保持 Command 的独立性，这里我们还可以通过 `IAccessor.get` 来获取 `ICommandService` 的实例对象。

```ts
import { SetRangeValuesCommand } from "@univerjs/sheets";
// ...omit other code
  handler: (accessor: IAccessor) => {
    // ...omit other code

    // get command service
    const commandService = accessor.get(ICommandService);
    // wait user select csv file
    waitUserSelectCSVFile({ csv, rowsCount, colsCount }) => {
      // set sheet data
      commandService.executeCommand(SetRangeValuesCommand.id, {
        range: {
          startColumn: 0,  // start column index
          startRow: 0, // start row index
          endColumn: colsCount - 1, // end column index
          endRow: rowsCount - 1,  // end row index
        },
        value: parseCSV2UniverData(csv),
      });
    })
    // ...omit other code
    return true;
  }
// ...omit other code
```

至此，我们就完成了插件的开发，刷新页面，可以看到点击菜单按钮后，弹出文件选择框，选择 CSV 文件后，CSV 文件的内容就会显示在表格中。

## 总结

插件的完整代码见 [ImportCSVButton.ts](https://github.com/awesome-univer/csv-import-plugin-demo/blob/main/src/plugins/ImportCSVButton.ts) 。

本插件展示了如何通过 Univer 插件系统来扩展 Univer 的 UI 和功能，希望本文可以帮助你快速上手 Univer 插件开发。

随着插件的规模增加，推荐进一步了解[模块分层](/guides/architecture/architecture/#模块分层)的最佳实践。

Univer 生态还处于起步阶段，如果你有任何问题或者建议，欢迎提交 PR 或者 Issue。

## 参考文档

- [插件生命周期](/guides/architecture/architecture/#插件生命周期)
- [Univer.registerPlugin](/api/core/classes/Univer.html#registerPlugin)
- [ICellData](/api/core/interfaces/ICellData.html)
- [ICommandService.registerCommandHandler](/api/core/interfaces/ICommandService.html#registerCommandHandler)
- [ICommand](/api/core/interfaces/ICommand.html)
