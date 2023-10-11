import clsx from 'clsx'
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/Icons'
import { SheetIcon, DocIcon, LocationIcon, AdditionIcon, ContentIcon,RequirementsIcon} from '@/components/Icons'
import './index.css'

export interface ITab {
    label: string;
    location: string;
    content: string[];
    requirements: string[];
    addition: string[];
    coverImage: string;
    name:string;
  }
  
export interface ITabsProps {
    tabs: ITab[];
  }

export default (props: ITabsProps) => {
    const [activeTab, setActiveTab] = createSignal(0); // 当前活动选项卡的索引


  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handlePrevTab = () => {
    setActiveTab((prevIndex) => (prevIndex === 0 ? props.tabs.length - 1 : prevIndex - 1));
  };

  const handleNextTab = () => {
    setActiveTab((prevIndex) => (prevIndex === props.tabs.length - 1 ? 0 : prevIndex + 1));
  };

  onMount(() => {
  })

  return (
      <ResponsiveContainer class="flex items-center justify-between tabs-container">
       <div class="w-full border-2 border-neutral-200">
      <div class="grid grid-cols-4">
        {props.tabs.map((tab, index) => (
          <div
            class={`text-center text-zinc-800 text-2xl font-normal font-['Source Han Sans CN'] leading-9 px-4 py-6 cursor-pointer  ${
              activeTab() === index
                ? 'bg-white text-amber-400 border-t-4 border-amber-400'
                : 'bg-stone-50 text-#35322B'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}

          </div>
        ))}
      </div>
      <div class={"p-16"}>
      <div class="grid grid-cols-1">

          <section
            class="horizontal-content grid gap-y-4 md:gap-y-0 md:gap-x-24"
            >
            <div class="cover pt-9">
                
                <img src={props.tabs[activeTab()].coverImage} alt={props.tabs[activeTab()].label} />
            </div>

            <div class="desc">
                <div>
                <div class="text-zinc-800 text-lg font-normal font-['Source Han Sans CN'] leading-10 flex grid-items-center"><span class="mr-2"><LocationIcon /></span>工作地点：{props.tabs[activeTab()].location}</div>

                   <div class="text-zinc-800 text-lg font-normal font-['Source Han Sans CN'] leading-10 flex grid-items-center mt-4">
                    <span class="mr-2"><ContentIcon /></span>
                    工作内容
                   </div>
                <p
                    class="mt-4 flex flex-col gap-4 pl-8"
                >
                    {props.tabs[activeTab()].content.map(item => (
                    <span
                        class="before:content-[''] before:block before:w-2 before:h-2 before:bg-current before:rounded-full before:shrink-0 flex grid-items-baseline gap-4 text-left">
                        {item}
                    </span>
                    ))}
                </p>

                <div class="text-zinc-800 text-lg font-normal font-['Source Han Sans CN'] leading-10 flex grid-items-center mt-4">
                <span class="mr-2"><RequirementsIcon /></span>
                岗位要求</div>

                <p
                    class="mt-4 flex flex-col gap-4 pl-8"
                >
                    {props.tabs[activeTab()].requirements.map(item => (
                    <span
                        class="before:content-[''] before:block before:w-2 before:h-2 before:bg-current before:rounded-full before:shrink-0 flex grid-items-baseline gap-4 text-left">
                        {item}
                    </span>
                    ))}
                </p>

                <div class="text-zinc-800 text-lg font-normal font-['Source Han Sans CN'] leading-10 flex grid-items-center mt-4">
                <span class="mr-2"><AdditionIcon /></span>
                加分项</div>
                <p
                    class="mt-4 flex flex-col gap-4 pl-8"
                >
                    {props.tabs[activeTab()].addition.map(item => (
                    <span
                        class="before:content-[''] before:block before:w-2 before:h-2 before:bg-current before:rounded-full before:shrink-0 flex grid-items-baseline gap-4 text-left">
                        {item}
                    </span>
                    ))}
                </p>

                </div>
            </div>

           
            </section>

        </div>
        {/* <div class="flex justify-end mt-4">
        <button
          class="px-4 py-4 bg-gray-200 text-gray-600 hover:bg-stone-300"
          onClick={handlePrevTab}
        >
          <img src="/images/talent/prev.png" alt="" />
        </button>
        <button
          class="px-4 py-4 bg-gray-200 text-gray-600 hover:bg-stone-300"
          onClick={handleNextTab}
        >
          <img src="/images/talent/next.png" alt="" />
        </button>

      </div> */}
      </div>
    </div>
      
      </ResponsiveContainer>

  )
}

