import type { IMenuButtonItem } from '@univerjs/ui'
import { MenuItemType, MenuPosition } from '@univerjs/ui'
import type { IAccessor } from '@wendellhu/redi'

import { ToggleScriptPanelOperation } from '../commands/operations/panel.operation'

export function UniscriptMenuItemFactory(_accessor: IAccessor): IMenuButtonItem {
  return {
    id: ToggleScriptPanelOperation.id,
    title: 'toggle-script-panel',
    tooltip: 'script-panel.tooltip.menu-button',
    icon: 'CodeSingle',
    // @ts-expect-error
    type: MenuItemType.BUTTON,
    // @ts-expect-error
    positions: [MenuPosition.TOOLBAR_START],
  }
}
