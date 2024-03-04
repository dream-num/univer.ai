---
title: 监听和触发事件
sidebar:
  order: 2
---

:::tip
建议在阅读本小节内容之前先[了解 Univer 的命令系统](/guides/architecture/architecture/#命令系统)。
:::

Univer 中事件大致可以分为两类：Univer 命令和事件。

1. Univer 命令（Commands）：通常会涉及 Univer 内部状态的变更，由 Univer 插件提供，例如设置表格选区、修改选区赋值等。

2. 事件：通常不直接涉及到 Univer 状态的变更，只在 Univer 插件内部使用，例如浏览器的鼠标、键盘、屏幕滚动等原生事件等。

在接下来的内容中，我们将分别介绍 Univer 命令和事件，以及如何使用 Facade API 来监听和触发它们。

## Univer 命令

Univer 命令由 Univer 的插件各自实现和提供，命令注册发生在我们将插件挂载到 Univer 实例时 ([`Univer.registerPlugin`](/api/core/classes/Univer.html#registerPlugin)) ，之后 Univer 就可以使用这些命令。

Univer 插件会把用户的操作封装成不同命令，例如插件`@univerjs/sheets`中有修改表格选区、修改选区值等命令。

命令可以被监听、执行、撤销（undo）和重做（redo），通过监听和触发命令，可以实现对用户操作的监控和响应，为协同功能提供了基础。理解命令有助于更好地使用 Univer 来实现自己的业务逻辑。

Univer 提供了一些有用 API 来执行和监听命令，例如 `executeCommand`、`syncExecuteCommand` 用来执行命令， `beforeCommandExecuted` 和 `onCommandExecuted` 可以在命令执行前后执行自定义的逻辑。

### 命令的类型

Univer 命令分为 3 种类型：Command、Operation、Mutation。

- Command：通常是用户在 Univer 界面的具体操作。例如设置表格选区、修改选区值等，这类命令通常由用户操作触发。
- Mutation：通常是一些会改变 Univer 业务数据（指文档和表格的数据）的命令。例如修改选区值，这类命令通常在 Command 内部调用。Mutation 的撤销和重做也由 Command 来管理。
- Operation：通常是一些不会对 Univer 业务数据产生影响的命令。例如设置表格选区，这类命令不会被撤销和重做。

:::tip
请阅读 [Univer 命令系统](/guides/architecture/architecture/#命令系统) 了解更多。
:::

## Facade API 命令操作

使用 Facade API 来监听命令的执行，可以在命令执行前后插入自定义的逻辑。

你可以在 [Playground](/playground/) 中尝试以下示例代码。

:::tip
使用 Facade API 前请检查你安装和注册了 `@univerjs/facade` 插件，请参考 [Facade 使用](/guides/facade/#安装)。
:::

### 监听命令

目前提供有 2 种监听命令的时机，分别是命令执行前和命令执行后。

在命令执行之前，可以向 (`FUniver.onBeforeCommandExecute`) API 传入一个回调函数来注册自定义的预处理监听器。

当命令执行前，会先触发预处理监听器，可以自定义些预处理逻辑。

```javascript
const univerAPI = FUniver.newAPI(univer);

univerAPI.onBeforeCommandExecute((command)=>{
  const { id, type, params } = command;
  // 在命令执行前执行自定义逻辑
})
```

在命令执行之后，我们也可以向 `FUniver.onCommandExecuted` API 传入一个回调函数来注册自定义的后处理监听器。

当命令执行后，会触发后处理监听器，可以自定义些后处理逻辑。

```javascript
const univerAPI = FUniver.newAPI(univer);

univerAPI.onCommandExecuted((command)=>{
  const { id, type, params } = command;
  // 在命令执行后执行自定义逻辑
})
```

### 取消监听

注册事件监听器的方法会返回一个 `IDisposable` 对象，调用该对象`dispose`就会销毁监听器。

建议您及时销毁不再使用的监听器，有助于提高程序的健壮性。

```javascript
const univerAPI = FUniver.newAPI(univer);

// 注册监听器
const disposable = univerAPI.onBeforeCommandExecute((command)=>{
  // 在命令执行前执行自定义逻辑
})

setTimeout(()=>{
  // 取消监听
  disposable.dispose();
}, 1000);
```

### 执行命令

实际上所有命令在 Univer 内部也是通过调用 `ICommandService` 的 `executeCommand` 或 `syncExecuteCommand` 方法来触发执行。

Facade API 中也提供了 `executeCommand` 和 `syncExecuteCommand` 方法，我们可以通过这两个方法来触发命令。

区别是 `executeCommand` 是异步执行命令，会返回一个 Promise 对象，`syncExecuteCommand` 是同步执行命令，直接返回执行结果。

以修改表格值 `sheet.mutation.set-range-values` 为例，对数据的变更都是 Mutation 类型的命令，Mutation 都是同步执行的，所以我们可以使用 `syncExecuteCommand` 来触发命令。

```javascript
const univerAPI = FUniver.newAPI(univer);
// set the value of the first cell A1 in the first sheet to "Hello World"
univerAPI.executeCommand('sheet.command.set-range-values', {
  value: { v: "Hello World" },
  range: { startRow: 0, startColumn: 0, endRow: 0, endColumn: 0 }
})
```

### 阻止命令执行

```javascript
const univerAPI = FUniver.newAPI(univer);
univerAPI.beforeCommandExecute((command)=>{
  const { id, type, params } = command;
  if (id === 'sheet.mutation.set-range-values') {
    // 阻止命令执行
    return false;
  }
})
```

在 0.1.2 版本前，你可以在 `beforeCommandExecute` 回调函数中 `throw` 一个异常来阻止命令执行。

## 常用命令

我们将一些常用的命令封装成了 Facade API，这些 API 可以帮助我们更方便地监听和触发命令。

对于还没有封装的命令，我们也可以使用上面介绍的 `executeCommand` 和 `syncExecuteCommand` 来触发命令。

由于命令是插件提供的，我们在使用 Univer 时，可以根据插件的文档来了解插件提供了哪些命令。

并且在判断命令和过滤命令时，推荐使用插件导出的命令的 ID 属性，这样可以避免因为命令的 ID 值变化而导致的错误。

- 设置表格选区
- 设置选区值
- 插入节点

## 事件

事件通常是 Univer 插件在内部使用，例如监听浏览器的鼠标、键盘、屏幕滚动等底层事件。

以及各插件内部设计的一些事件或者钩子（Hook），用户一般不不需要太关心，对于一些有用的事件，也会经过 Facade API 封装后提供给用户，请参考 [Facade API](/guides/facade/)。

## 参考

如果你在编写插件，想要注册命令，可以参考 [插件开发](/guides/extend/command/)。
