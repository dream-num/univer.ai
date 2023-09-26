import { SearchIcon } from '@/components/Icons'

interface IProps {
  placeholder?: string
}

export default (props: IProps) => {
  const { placeholder } = props

  return (
    <section class="relative w-full md:w-180 h-14 mx-auto bg-#f9f9f9 rounded-lg">
      <i class="absolute w-12 h-full flex justify-center items-center">
        <SearchIcon />
      </i>

      <input
        class="block w-full h-full bg-transparent focus:outline-none pl-12"
        type="text"
        placeholder={placeholder}
      />
    </section>
  )
}
