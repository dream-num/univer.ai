---
title: Permission
---

In Univer, there is a permission mechanism that relies on third-party authentication. The smallest unit of permission is called `PermissionPoint`. The value attribute of PermissionPoint stores the metadata of the permission (such as the index key stored by the third party, such as whitelist/blacklist), and the id attribute represents the business point of that permission.

1. If the Univer level editing permission is disabled, all functionalities that depend on the Univer editing permission will be disabled as well.

```ts
import { UniverPermissionService } from '@univerjs/core';

class CustomerService{
    constructor(@Inject(UniverPermissionService) _univerPermissionService:UniverPermissionService){
        _univerPermissionService.setEditable('your unitId',false)// If the entire Univer system is set to be false, it means that no editing actions can be performed on any component or feature within the Univer system
    }
    getUniverEditable(){
        return this._univerPermissionService.getEditable()
    }
}
```

The type of `UniverEditablePermission` is as follows:

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

2. At the business level, taking sheet as an example, you can set permissions for a specific worksheet.

```ts
import { SheetPermissionService } from '@univerjs/sheets';

class CustomerService{
    constructor(@Inject(SheetPermissionService) _sheetPermissionService:SheetPermissionService){
        _sheetPermissionService.setSheetEditable(false,'your unitId','your subUnitId')// The corresponding worksheet will become uneditable.
    }

    getSheetEditable(worksheetId:string){
        return this._sheetPermissionService.getSheetEditable()
    }
}
```

The type of `SheetEditablePermission` is as follows:


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

3. Business custom permissions

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
        _sheetPermissionService.setSheetEditable(false,'your unitId','your subUnitId')
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
