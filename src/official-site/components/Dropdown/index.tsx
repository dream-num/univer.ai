import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

interface IProps {
  children: React.ReactNode
  overlay: React.ReactNode
}

export default function Dropdown(props: IProps) {
  const { children, overlay } = props
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(true)
  }

  const { bottom, left } = dropdownRef.current?.getBoundingClientRect() || { bottom: 0, left: 0 }

  return (
    <>
      <div ref={dropdownRef} className="cursor-pointer" onClick={toggleDropdown}>
        {children}
      </div>

      {isOpen && ReactDOM.createPortal(
        <section
          className={`
            fixed z-10 mt-2 rounded-xl border border-[#E6E8EB] bg-white p-2
            shadow-[0px_4px_24px_0px_rgba(15,23,42,0.08)]
          `}
          style={{
            top: `${bottom}px`,
            left: `${left}px`,
          }}
        >
          {overlay}
        </section>,
        document.body,
      )}
    </>
  )
}
