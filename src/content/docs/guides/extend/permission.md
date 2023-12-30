---
title: 权限
---

在 `Univer` 中有一套依赖第三方鉴权的权限机制,权限的最小单位为`PermissionPoint`.`PermissionPoint`的`value`存储权限的元信息(比如第三方存储的索引键,比如白名单/黑名单列表),`id`表示该权限的业务点位.

1. `Univer` 级别的编辑权限,如果本权限被关闭,所有依赖`Univer`编辑权限的的功能将被关闭.

```ts
import { UniverPermissionService } from '@univerjs/core';

class CustomerService{
    constructor(@Inject(UniverPermissionService) _univerPermissionService:UniverPermissionService){
        _univerPermissionService.setEditable('your unitId',false)// 整个 Univer 将不可编辑
    }
    getUniverEditable(){
        return this._univerPermissionService.getEditable()
    }
}
```

其中的 `UniverEditablePermission` 的类型如下

```ts
export const UniverEditablePermissionPoint = 'univer.editable';
export class UniverEditablePermission extends PermissionPoint<boolean> {
    id = UniverEditablePermissionPoint;
    value = true;
    unitID: string;
    constructor(unitID: string) {
        super();
        this.unitID = unitID;
    }
}
```

2. 业务层级,拿 `sheet` 举例, `sheet` 可以针对某个 `worksheet` 进行权限设置.

```ts
import { SheetPermissionService } from '@univerjs/sheets';

class CustomerService{
    constructor(@Inject(SheetPermissionService) _sheetPermissionService:SheetPermissionService){
        _sheetPermissionService.setSheetEditable(false,'your unitId','your subUnitId')// 对应的 worksheet 将不可编辑。
    }

    getSheetEditable(worksheetId:string){
        return this._sheetPermissionService.getSheetEditable()
    }
}
```

其中的 `SheetEditablePermission` 的类型如下

```ts
const SheetEditablePermissionPoint = 'univer.sheet.editable';

export class SheetEditablePermission extends PermissionPoint<boolean> {
    value = true;
    unitID: string;

    constructor(
        private _unitId: string,
        private _subUnitId: string
    ) {
        super();
        this.unitID = _unitId;
        this.id = `${SheetEditablePermissionPoint}_${_unitId}_${_subUnitId}`;
    }
}
```

3. 业务自定义权限

```ts
import  { IPermissionService,PermissionPoint } from '@univerjs/core';

 class CustomerPermission extends PermissionPoint<boolean> {
    id = 'CustomerPermission';
    value = true;
    unitID: string;

    constructor(
        private _unitId: string,
    ) {
        super();
        this.unitID = _unitId;
    }
}

class CustomerService{
    constructor(@Inject(IPermissionService) _permissionService:IPermissionService){
        _sheetPermissionService.setSheetEditable(false,'your unitId','your subUnitId')// 对应的 worksheet 将不可编辑。
        this._init()
    }

    private _init(){
        const customerPermission = new CustomerPermission('your unitId');
        this._permissionService.addPermissionPoint('your unitId', customerPermission);
    }

    getPermission(){
        return this._permissionService
            .composePermission('your unitId', [new CustomerPermission('your unitId').id])
            .every((item) => item.value);
    }
}
```
