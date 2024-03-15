---
title: listening and triggering events
sidebar:
  order: 2
---

:::tip
It is recommended to familiarize oneself with the [Univer command system](/guides/architecture/architecture/#command-system) before reading this section.
:::

There are two types of events in Univer: Univer commands and events.

1. Univer Commands: They usually involve changing the internal state of Univer, provided by Univer plugins, such as setting sheet selection, modifying selection values, etc.

2. Events: They usually do not directly involve changing the internal state of Univer, only used internally by Univer plugins, such as native browser events like mouse, keyboard, and screen scrolling, etc.

In the following content, we will introduce Univer commands and events separately, and how to use the Facade API to listen and trigger them.

## Univer Commands

Univer commands are provided by Univer plugins, and the command registration occurs when we mount the plugin to the Univer instance ([`Univer.registerPlugin`](/api/core/classes/Univer.html#registerPlugin)), and then Univer can use these commands.

Univer plugins will encapsulate user operations into different commands, such as the `@univerjs/sheets` plugin has commands like modifying sheet selection, modifying selection values, etc.

We can be listen , execute, undo, and redo commands. By listening and triggering commands, we can monitor and respond to user operations, providing a foundation for collaborative features. Understanding commands can help us better using Univer to implement our own business logic.

Univer provides some useful APIs to execute and listen to commands, such as `executeCommand`, `syncExecuteCommand` to execute commands, `beforeCommandExecuted` and `onCommandExecuted` to execute custom logic before and after the command is executed.

### Types of Commands

Univer commands are divided into 3 types: Command, Operation, Mutation.

- Command: Usually the specific operation of the user in the Univer interface. Such as setting the sheet selection, modifying the selection value, etc., these commands are usually triggered by user operations.
- Mutation: Usually some commands that will change the Univer business data (referring to the data of documents and sheets). For example, modifying the selection value, these commands are usually called internally by the Command. The undo and redo of Mutation are also managed by the Command.
- Operation: Usually some commands that will not affect the Univer business data. For example, setting the sheet selection, these commands will not be undone and redone.

:::tip
Please read [Univer Command System](/guides/architecture/architecture/#command-system) for more information.
:::

## Facade API Command Operation

Use the Facade API to listen to the execution of commands, you can insert custom logic before and after the command is executed.

You can try the following example code in the [Playground](/playground/).

:::tip
Before using the Facade API, please check if you have installed and registered the `@univerjs/facade` plugin, please refer to [Facade Usage](/guides/facade/#installation).
:::

### Listening Commands

Currently, there are two ways to listen to commands, before the command is executed and after the command is executed.

Before the command is executed, you can register a custom preprocessing listener by passing a callback function to the `FUniver.onBeforeCommandExecute` API.

Before the command is executed, the preprocessing listener will be triggered first, and you can customize some preprocessing logic.

```javascript
const univerAPI = FUniver.newAPI(univer);

univerAPI.onBeforeCommandExecute((command)=>{
  const { id, type, params } = command;
  // custom preprocessing logic before the command is executed
})
```

After the command is executed, you can register a custom post-processing listener by passing a callback function to the `FUniver.onCommandExecuted` API.

when the command is executed, the post-processing listener will be triggered, and you can customize some post-processing logic.

```javascript
const univerAPI = FUniver.newAPI(univer);

univerAPI.onCommandExecuted((command)=>{
  const { id, type, params } = command;
  // custom post-processing logic after the command is executed
})
```

### Destroying Listeners

Registering an event listener method will return an `IDisposable` object, calling the `dispose` method of the object will destroy the listener.

Advice you to destroy the listener when you no longer need it, to avoid memory leaks.

```javascript
const univerAPI = FUniver.newAPI(univer);

// Register a listener
const disposable = univerAPI.onBeforeCommandExecute((command)=>{
  // custom preprocessing logic before the command is executed
})

setTimeout(()=>{
  // Destroy the listener
  disposable.dispose();
}, 1000);
```

### Triggering Commands

In fact, all commands are triggered internally by calling the `ICommandService`'s `executeCommand` or `syncExecuteCommand` method.

The Facade API also provides `executeCommand` and `syncExecuteCommand` methods, we can use these two methods to trigger commands.

The difference between `executeCommand` and `syncExecuteCommand` is that `executeCommand` is an asynchronous execution command, which will return a Promise object, and `syncExecuteCommand` is a synchronous execution command, which directly returns the execution result.

For example, we can modify the table value `sheet.mutation.set-range-values` as an example, all data changes are Mutation type commands, and Mutations are executed synchronously, so we can use `syncExecuteCommand` to trigger the command.

```javascript
const univerAPI = FUniver.newAPI(univer);
// set the value of the first cell in the first sheet to "Hello World"
univerAPI.executeCommand('sheet.command.set-range-values', {
  value: { v: "Hello World" },
  range: { startRow: 0, startColumn: 0, endRow: 0, endColumn: 0 }
})
```

### Preventing Command execution

```javascript
const univerAPI = FUniver.newAPI(univer);
univerAPI.beforeCommandExecute((command)=>{
  const { id, type, params } = command;
  if (id === 'sheet.mutation.set-range-values') {
    // Prevent the command from executing
    return false;
  }
})
```

Before version 0.1.2, you can `throw` an exception in the `beforeCommandExecute` callback function to prevent the command from executing.

## Most used Commands

We have encapsulated some common commands into the Facade API, which can help us to listen and trigger commands more conveniently.

For commands that have not been encapsulated, we can also use the `executeCommand` and `syncExecuteCommand` methods introduced above to trigger commands.

Since the commands are provided by the plugins, when we use Univer, we can learn what commands the plugins provide according to the plugins' documentation.

When we judge commands and filter commands, it is recommended to use the ID property exported by the plugin, so as to avoid errors caused by the change of the command's ID value.

- Set the table selection
- Set the selection value
- Insert node

## Events

Univer events are usually used internally by Univer plugins, such as listening to native browser events like mouse, keyboard, and screen scrolling, etc.

and some events or hooks designed internally by the plugins, users generally do not need to care too much, for some useful events, they will also be provided to users after being encapsulated by the Facade API, please refer to the [Facade API](/guides/facade/).

## Reference

If you are writing a plugin and want to register a command, you can refer to [Plugin Development](/guides/extend/command/).
