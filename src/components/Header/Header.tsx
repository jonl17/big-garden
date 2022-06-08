import Close from '@components/Close'
import React from 'react'
import cn from 'classnames'

type Props = {
  toggle: () => void
  children?: React.ReactNode
  className?: string
}

const Header = ({ toggle, children, className }: Props) => {
  return (
    <nav className='flex justify-between w-full p-5 relative z-20'>
      {children ? children : <span />}
      <button
        onClick={toggle}
        className='relative w-14 h-14 p-4 grid place-items-center'
      >
        <Close
          className={cn(
            'fill-current stroke-current h-full w-full',
            className
          )}
        />
      </button>
    </nav>
  )
}

export default Header
