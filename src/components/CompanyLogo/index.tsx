import clsx from 'clsx'
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/Icons'
import { SheetIcon, DocIcon, LocationIcon, AdditionIcon, ContentIcon,RequirementsIcon} from '@/components/Icons'


interface ICompany {
    img:string;
}
export interface IProps {
    company:ICompany[]
  }

export default (props: IProps) => {
    let {company} = props

    const [allCompany, setAllCompany] = createSignal<ICompany[]>(company)

    onMount(() => {
        if(document.body.clientWidth < 768){
            setAllCompany(allCompany().slice(0, 4))
        }
    })

  return (
      
<section class="grid grid-flow-col md:grid-flow-row grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-1 justify-between gap-4 md:gap-10">
        {allCompany().map(item => (
          <div class="text-center flex flex-col gap-4">
            <img class="block w-40 mx-auto" src={item.img} />
          </div>
        ))}
      </section>
  )
}

