import type { IMenuButtonItem } from '@univerjs/ui'
import { MenuGroup, MenuItemType, MenuPosition } from '@univerjs/ui'
import { GithubButtonOperation } from '../commands/operations/github-button.operation'

export function GithubButtonFactory(): IMenuButtonItem<string> {
  return {
    id: GithubButtonOperation.id,
    type: MenuItemType.BUTTON,
    icon: 'GithubSingle24',
    tooltip: 'GitHub',
    title: 'GitHub',
    positions: [MenuPosition.TOOLBAR_START],
    group: MenuGroup.TOOLBAR_OTHERS,
  }
}
