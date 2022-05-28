import Close from '@components/Close'
import React from 'react'

type Props = {
  toggle: () => void
  children?: React.ReactNode
}

const Header = ({ toggle, children }: Props) => {
  return (
    <nav className='flex justify-between w-full p-5 relative z-20'>
      {children ? children : <span />}
      <button
        onClick={toggle}
        className='relative w-14 h-14 p-4 border-black grid place-items-center'
      >
        <Close className='fill-black h-full w-full' />
      </button>
    </nav>
  )
}

export default Header
