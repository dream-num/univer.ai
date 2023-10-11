import clsx from 'clsx'
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/Icons'
import { SheetIcon, DocIcon, LocationIcon, AdditionIcon, ContentIcon,RequirementsIcon} from '@/components/Icons'

import PCTabs, { type ITabsProps } from '@/components/PCTabs'
import MobileTabs from '@/components/MobileTabs'


export default (props: ITabsProps) => {
    const {tabs} = props
    const [type, setType] = createSignal(true);

    onMount(() => {
        // if(document.body.clientWidth < 768){
        //     setType(false)
        // }
    })

    return (
        <PCTabs tabs={tabs}/>
    )
}

