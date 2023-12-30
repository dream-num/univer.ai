---
title: 插件自定义模型
---

Univer 允许用户自定义插件需要存储在文档快照上的模型。
![image](@/assets/img/resource.jpg)
在 `@univer/core` 中存在一个 `ResourceManagerService` 实例,你可以在自己新建的 plugin 中注册对应的 `hook` ,将数据绑定到 `snapshot` 上.

```ts
import {
    IResourceManagerService,
} from '@univerjs/core';
import { Inject } from '@wendellhu/redi';

const YOUR_PLUGIN_NAME = 'YOUR_PLUGIN_NAME'
type Resource = {testResource:string}
class CustomerService{
    constructor(@Inject(IResourceManagerService) _resourceManagerService:IResourceManagerService){
        this._resourceManagerService.registerPluginResource<Resource>(unitID, YOUR_PLUGIN_NAME, {
                toJson: (unitID) => this._toJson(unitID),
                parseJson: (json) => this._parseJson(json),
                onChange:(unitId:string,resource:Resource)=>{
                    this.model = resource
                }
            });
    }

    _toJson(unitID:string){
        // 将你需要存储的数据转为 json 字符串存储。
        const model = this.getModel(unitID)
        return JSON.stringify(model)
    }

    parseJson(json:string){
        // 将 json 字符串数据反序列化为对象。
        return JSON.parse(json)
    }
}
```

当你的数据已经接入 `ResourceManagerService` 后,将根据你选择的持久化方式进行落盘处理.这里根据落盘的方式差异有 2 种快照方案.

## 本地化快照方案

在以上注册逻辑生效后,需要执行初始化/落盘两步的操作,可以模拟以下 service 实现.

```ts
import type { ISnapshotPersistenceService, Workbook } from '@univerjs/core';
import { Disposable, IResourceManagerService, IUniverInstanceService } from '@univerjs/core';
import { Inject } from '@wendellhu/redi';

export class LocalSnapshotService extends Disposable implements ISnapshotPersistenceService {
    constructor(
        @Inject(IResourceManagerService) private _resourceManagerService: IResourceManagerService,
        @Inject(IUniverInstanceService) private _univerInstanceService: IUniverInstanceService
    ) {
        super();
        this._initWorkBook();
    }

    private _initWorkBook() {
        this._univerInstanceService.sheetAdded$.subscribe((workbook) => this._initWorkbookFromSnapshot(workbook));
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
            const resourceSnapshot = (snapshot.resources || []).find((item) => item.name === resource.resourceName);
            if (resourceSnapshot) {
                const model = resource.hook.parseJson(resourceSnapshot.data);
                resource.hook.onChange(unitId, model);
            }
        });
    }

    saveWorkbook(workbook: Workbook) {
        const snapshot = { ...workbook.getSnapshot() };
        const unitId = workbook.getUnitId();
        const resourceHooks = this._resourceManagerService.getAllResource(workbook.getUnitId());
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

具体实现见 [本地如何保存插件快照](https://github.com/dream-num/univer/blob/dev/examples/src/plugins/local-save/services/local-snapshot.service.ts)

### 1.1 获取当前资源快照

如果你已经有一个保存完好的快照需要初始化，此时会在 `_initWorkbookFromSnapshot` 函数中，完成数据的初始化，通过注册的 `hook` ，调用 onchange 通知自定义插件执行自己的初始化逻辑.

### 1.2 保存快照

通过 DI 拿到 `LocalSnapshotService` 实例后,调用 `LocalSnapshotService.saveWorkbook` 方法，可以获得一个序列化的 json 对象.

## 远端快照方案

   具体文档等协同方案公布后同步。

## 模型引用化

将重复的字符串使用一个短码进行映射，以减少内存/带宽开销.

### 运行时引用化

运行时引用化，主要是为来缩减运行时的内存开销.
在 `model` 层,我们会设计一个 `shadowModel`,以及一个 `mappingModel`.

`mappingModel` 用来存储 id 与具体值的映射关系.
:::note
后续的 `id`  特指 `mappingModel` 中的 `id`.
:::
`shadowModel` 用来存储 id 与具体渲染的映射关系.比如某个单元格与其对应的 id.

具体实现可以参考 [数据格式如何做引用话](https://github.com/dream-num/univer/blob/dev/packages/sheets/src/services/numfmt/numfmt.service.ts)

### 传输时引用化

具体文档等协同方案公布后同步。
