import clsx from 'clsx'

interface IProps {
  class?: string
  children?: any
}

export default (props: IProps) => {
  return (
    <section
      class={clsx([
        "w-90% m-auto",
        props.class
      ])}
    >
      {props.children}
    </section>
  )
}
