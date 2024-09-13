import type { IAccessor } from '@univerjs/core'
import type { IMenuButtonItem } from '@univerjs/ui'
import { UniverInstanceType } from '@univerjs/core'

import { RangeProtectionPermissionEditPoint, WorkbookEditablePermission, WorksheetEditPermission, WorksheetSetCellStylePermission, WorksheetSetCellValuePermission } from '@univerjs/sheets'
import { getCurrentRangeDisable$ } from '@univerjs/sheets-ui'
import { getMenuHiddenObservable, MenuItemType, MenuPosition } from '@univerjs/ui'
import { ToggleScriptPanelOperation } from '../commands/operations/panel.operation'

export function UniscriptMenuItemFactory(accessor: IAccessor): IMenuButtonItem {
  return {
    id: ToggleScriptPanelOperation.id,
    title: 'toggle-script-panel',
    tooltip: 'script-panel.tooltip.menu-button',
    icon: 'CodeSingle',
    type: MenuItemType.BUTTON,
    positions: [MenuPosition.TOOLBAR_START],
    // FIXME hidden$ and disabled$ are not correctly in doc
    hidden$: getMenuHiddenObservable(accessor, UniverInstanceType.UNIVER_SHEET),
    disabled$: getCurrentRangeDisable$(accessor, { workbookTypes: [WorkbookEditablePermission], worksheetTypes: [WorksheetEditPermission, WorksheetSetCellStylePermission, WorksheetSetCellValuePermission], rangeTypes: [RangeProtectionPermissionEditPoint] }),
  }
}
