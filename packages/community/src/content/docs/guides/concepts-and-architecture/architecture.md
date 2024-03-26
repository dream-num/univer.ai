---
title: Univer Architecture
---

This document describes the overall architecture of Univer.

## Univer Code Organization

![](@/assets/img/architecture.png)

### Plugins

Univer's modules have been divided into various plugins based on comprehensive considerations of multiple factors. Multiple plugins combine to form a single Univer application.

The plugin architecture offers the following advantages to Univer:

1. Regardless of the environment in which it runs, Univer can satisfy different requirements by loading different plugins. This reduces redundant code and associated overhead (for example, in the Node.js environment, UI-related plugins can be avoided).
2. You can choose to load only the necessary plugins, reducing the amount of unnecessary code.
3. The plugin architecture makes it easier to modify and extend Univer, allowing you to develop your own plugins to meet your needs without changing Univer's codebase.
4. Plugin architecture clarifies the responsibilities and dependencies of Univer's modules, making them easier to understand, modify, test, and maintain.

### Factors for Splitting Plugins

The division of plugins is quite flexible, and you can have your own criteria. However, the following are some of the considerations used by the Univer core team:

- Existence of modules that need to be loaded in certain environments but not in others; if such modules exist, they are suitable to be placed in a separate plugin. For example, since UI-related modules are not needed in Node.js, the UI-related parts of the basic sheet functions are split into @univerjs/sheet-ui.
- Plugins can be divided based on different document types, such as @univerjs/sheet and @univerjs/doc.
- Complex functions can be split into a separate plugin, such as @univerjs/sheet-numfmt, which is a separate plugin providing the ability to modify number formats.
- General low-level capabilities can be split into a separate plugin, such as @univerjs/design, which provides design system-related capabilities, such as themes, colors, components, and more, or @univerjs/rpc, which provides RPC capabilities.

### Types of Plugins

Univer distinguishes between plugin types, allowing Univer to initialize the plugins at the most appropriate times, thereby optimizing memory usage for plugins.

Currently, the following types are available:

- `PluginType.Univer`: The core Univer plugins, which start loading and trigger the `onStarting` life cycle when a Univer instance is created.
- `PluginType.Doc`: Document plugins for the `Doc` type.
- `PluginType.Sheet`: Document plugins for the `Sheet` type.

Except for `PluginType.Univer`, plugins of other types will only start loading and going through the life cycle when a corresponding type of file is created for the first time.

:::note
For information about life cycles, please refer to the "Plugin Life Cycle" section below.
:::

### Dependency Injection

Plugins can be divided into multiple modules (divided in a manner similar to that in the "Hierarchical Structure" section below). These modules can be integrated with Univer's dependency injection system, allowing Univer to automatically parse the dependency relationships between these modules and instantiate them, significantly reducing the complexity of managing dependencies in a complex system. Currently, all official Univer plugins have integrated the dependency injection system.

The dependency injection tool used by Univer is [redi](https://redi.wendell.fun). You can refer to redi's documentation to understand the basic concepts of dependency injection and how to use it.

### Public and Private Modules of a Plugin

To expose interfaces to other plugins, a plugin can export the dependency injection identifiers for these modules in the module's export file (usually index.ts). If a module's identifier is exported, other plugins can inject these module identifiers, creating a dependency relationship with these modules, which become public modules of the first plugin. Private modules are the opposite. If you are familiar with Angular, you will notice that this concept is very similar to NgModule, but instead of using the exports field to declare a module's public modules, we use es module's export to expose the module and consider it a public module.

### Plugin Life Cycle

Univer plugins have a life cycle to make plugin behavior more predictable and avoid timing-related logic errors.

Plugins have the following four life cycles:

- `Starting`: The first life cycle of the plugin being mounted to the Univer instance, when the Univer business instance has not yet been created. During this life cycle, the plugin should add its modules to the dependency injection system. It is not recommended to initialize internal modules outside of this life cycle.
- `Ready`: The first business instance of Univer has been created, and the plugin can perform most of the initialization work in this life cycle.
- `Rendered`: The first rendering has been completed, and the plugin can perform DOM-dependent initialization work in this life cycle.
- `Steady`: Triggered after a period of time following `Rendered`, the plugin can perform non-first screen necessary work in this life cycle to improve loading performance.

Correspondingly, the Plugin type has four life cycle hooks, and plugins can override these methods to execute corresponding logic in each declared life cycle.

```typescript
export abstract class Plugin {
  onStarting(_injector: Injector): void {}
  onReady(): void {}
  onRendered(): void {}
  onSteady(): void {}
}
```

Besides these four life cycle hooks, internal modules of the plugin can use the `OnLifecycle` decorator to declare that they need to be initialized at a specific life cycle stage, such as

```typescript
@OnLifecycle(LifecycleStages.Rendered, IMEInputController)
export class IMEInputController extends Disposable {}
```

Additionally, life cycle events can also be monitored by injecting `LifecycleService`.

```typescript
export class YourService {
  constructor(
        @Inject(LifecycleService) private _lifecycleService: LifecycleService,
  ) {
    super()

    this._lifecycleService.lifecycle$.subscribe(stage => this._initModulesOnStage(stage))
  }
}
```

### Hierarchical Structure

![image](@/assets/img/layers.png)

Modules within the plugin should belong to one of the following levels:

- View: Handles rendering and interaction, including Canvas rendering and React components.
- Controller: Encapsulates business logic (especially feature logic), dispatches commands, etc.
- Command: Executes logic through the command pattern, modifying the state or data of the layers below Service / Model.
- Service: Encapsulates features for use by higher-level modules, stores application internal state, and manipulates lower-level data, etc.
- Model: Stores business data.

There should be a single direction dependency between levels, and only certain Controllers, acting as the view-model in MVVM, may hold references to UI layer objects. Other levels should not reference the code of higher-level modules.

By using module layering and restricting single direction dependency, along with clear module division, Univer can maximize code reuse in different hosts.

:::info
When using Univer CLI to initialize the plugin, it will help you with directory structure.
:::

## Command System

In Univer, changes to the application state and data must be made through the command system. The command system itself is an abstraction of the application logic, decoupling the execution process of the logic and its parameters.

@univerjs/core provides a command service, and plugins can encapsulate business logic in commands and use the dependency injection system to obtain other modules and execute business logic.

Plugins can register commands using the `ICommandService` provided `registerCommand` interface and execute them using the `executeCommand` interface:

`Command` has three types:

- `COMMAND`: Responsible for creating, arranging, and executing `MUTATION` or `OPERATION` based on specific business logic. For example, a **delete row COMMAND** will generate a **delete row MUTATION** and an undo **insert row MUTATION**, as well as a **set cell content MUTATION**.
  - `COMMAND` is the main carrier of business logic. If a _user operation behavior_ requires triggering different _low-level behaviors_ based on the application state, such as triggering _bold text_ modification based on the current selection range, the corresponding judgment should be completed by `COMMAND`.
  - `COMMAND` can dispatch other `COMMAND`s, `OPERATION`s, and `MUTATION`s.
  - `COMMAND` allows asynchronous execution.
- `MUTATION`: Refers to changes to the stored data, such as inserting rows and columns, modifying cell content, and modifying the filter range, etc. If you want to add collaborative editing capabilities to Univer, it is the smallest unit of conflict resolution.
  - `MUTATION` cannot dispatch any other commands.
  - `MUTATION` must be executed synchronously.
- `OPERATION`: Refers to changes to non-persistent data (or application state), and does not involve conflict resolution, such as modifying scrolling position, modifying sidebar status, etc.
  - `OPERATION` cannot dispatch any other commands.
  - `OPERATION` must be executed synchronously.

### Event Listening

`ICommandService` provides an event listening interface, allowing plugins to listen for which commands have been executed and what their parameters are. In fact, an event is dispatched after the command execution:

```typescript
/**
 * The command info, only a command id and responsible params
 */
export interface ICommandInfo<T extends object = object> {
  id: string

  type: CommandType

  /**
   * Args should be serializable.
   */
  params?: T
}
```

By listening to command execution, Univer's capabilities can be expanded in a non-invasive way, such as:

- **Collaborative editing**: A collaborative editing plugin can listen for all `MUTATION` type commands and use a collaborative editing algorithm to send `MUTATION` to other collaborative ends, and re-execute these `MUTATION` through `ICommandService`.
- **Collaborative cursor**: Monitor the selection change `OPERATION` and send it to other ends, and the other ends can draw the collaborative cursor by parsing the parameters.
- **Live Share**: Monitor scrolling and zooming `OPERATION` and send it to the audience end, allowing the audience to synchronize the presenter's browsing position.
- Operation recording

And more.

## Service-Oriented Architecture

### Separation of Concerns

In the "Module Layering" section, we mentioned that there is a layer called "service" in the Univer module hierarchy. This layer of modules is called services, and their responsibility is to encapsulate some common functions. Univer encourages, in its architecture, the [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) principle, which is to encapsulate functionality into different services. This way, the services can focus more on a specific function, making them easier to understand, modify, test, and maintain.

### Abstracting Dependencies

When encapsulating services, it is recommended to use the principle of abstracting dependencies, abstracting the service's dependency on other services into an interface. This makes the service more testable and maintainable.

## Learn More

The above introduces the overall architecture of Univer. To learn about the architectural design of Univer's subsystems, you can read the following chapters:

- [Formula System](/guides/concepts-and-architecture/formula)
- [Rendering System](/guides/concepts-and-architecture/rendering)
- [Web Worker](/guides/concepts-and-architecture/web-worker)
