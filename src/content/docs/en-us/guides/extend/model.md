---
title: Plug-in custom model
---

Univer allows users to customize the models that plug-ins need to store on a document snapshot
![image](@/assets/img/resource.jpg)
Register a hook with the the `ResourceManagerService` service in package `@univer/core` to persist the data

```ts
import { IResourceManagerService } from "@univerjs/core";
import { Inject } from "@wendellhu/redi";

const YOUR_PLUGIN_NAME = "YOUR_PLUGIN_NAME";
type Resource = { testResource: string };
class CustomerService {
  constructor(
    @Inject(IResourceManagerService)
    _resourceManagerService: IResourceManagerService
  ) {
    this._resourceManagerService.registerPluginResource<Resource>(
      unitID,
      YOUR_PLUGIN_NAME,
      {
        toJson: (unitID) => this._toJson(unitID),
        parseJson: (json) => this._parseJson(json),
        onChange: (unitId: string, resource: Resource) => {
          this.model = resource;
        },
      }
    );
  }

  _toJson(unitID: string) {
    // Convert the data you need to store to a JSON string store.
    const model = this.getModel(unitID);
    return JSON.stringify(model);
  }

  parseJson(json: string) {
    // Deserializes JSON string data into objects.
    return JSON.parse(json);
  }
}
```
After your data is connected to 'Resourcemanagerservice' , it will be processed according to the persistence method you choose. There are two different snapshot schemes depending on how you land.

## Localized snapshot schemes

After the above registration logic takes effect, we need to perform the initialization/deactivation steps. We can simulate the following service implementation.

```ts
import type { ISnapshotPersistenceService, Workbook } from "@univerjs/core";
import {
  Disposable,
  IResourceManagerService,
  IUniverInstanceService,
} from "@univerjs/core";
import { Inject } from "@wendellhu/redi";

export class LocalSnapshotService
  extends Disposable
  implements ISnapshotPersistenceService
{
  constructor(
    @Inject(IResourceManagerService)
    private _resourceManagerService: IResourceManagerService,
    @Inject(IUniverInstanceService)
    private _univerInstanceService: IUniverInstanceService
  ) {
    super();
    this._initWorkBook();
  }

  private _initWorkBook() {
    this._univerInstanceService.sheetAdded$.subscribe((workbook) =>
      this._initWorkbookFromSnapshot(workbook)
    );
    const workbooks = this._univerInstanceService.getAllUniverSheetsInstance();
    workbooks.forEach((workbook) => {
      this._initWorkbookFromSnapshot(workbook);
    });
  }

  private _initWorkbookFromSnapshot(workbook: Workbook) {
    const unitId = workbook.getUnitId();
    const snapshot = workbook.getSnapshot();
    const resources = this._resourceManagerService.getAllResource(unitId);
    resources.forEach((resource) => {
      const resourceSnapshot = (snapshot.resources || []).find(
        (item) => item.name === resource.resourceName
      );
      if (resourceSnapshot) {
        const model = resource.hook.parseJson(resourceSnapshot.data);
        resource.hook.onChange(unitId, model);
      }
    });
  }

  saveWorkbook(workbook: Workbook) {
    const snapshot = { ...workbook.getSnapshot() };
    const unitId = workbook.getUnitId();
    const resourceHooks = this._resourceManagerService.getAllResource(
      workbook.getUnitId()
    );
    const resources = resourceHooks.map((resourceHook) => {
      const data = resourceHook.hook.toJson(unitId);
      return {
        name: resourceHook.resourceName,
        data,
      };
    });
    snapshot.resources = resources;
    return snapshot;
  }
}
```

pecific implementation can be referenced [How to save a plug-in snapshot locally](https://github.com/dream-num/univer/blob/dev/examples/src/plugins/local-save/services/local-snapshot.service.ts)

### Gets a snapshot of the current resource

如果你已经有一个保存完好的快照需要初始化，此时会在 `_initWorkbookFromSnapshot` 函数中，完成数据的初始化，通过注册的 `hook` ，调用 onchange 通知自定义插件执行自己的初始化逻辑.
If you already have a well-preserved snapshot that needs to be initialized, this will be done in `_initWorkbookFromSnapshot`,  through the registered 'hook' .Call onchange to notify the custom plug-in to perform its own initialization logic.
### Save to snapshot
Get `LocalSnapshotService` instance from DI, call `LocalSnapshotService.saveWorkbook`  to get a snapshot

## Remote Snapshot Scheme

Specific documents and other collaborative programs after the release of synchronization.

## Model referencing

Duplicate strings are mapped using a short code to reduce memory/bandwidth overhead.

### Referencing at run time

Runtime referencing, primarily to reduce memory overhead at runtime.

Specific implementation can refer to [How data formats are referenced](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/services/numfmt/numfmt.service.ts)

### Referencing at transport time

Specific documents and other collaborative programs after the release of synchronization.

