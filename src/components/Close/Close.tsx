import React from 'react'

type Props = {
  className?: string
}

const Close = ({ className, ...props }: Props) => {
  return (
    <svg
      width='89'
      height='89'
      viewBox='0 0 89 89'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        d='M89 85.7831L47.7935 44.5766L89 3.21687L85.7831 0L44.5766 41.2065L3.21687 0L0 3.21687L41.2065 44.5766L0 85.7831L3.21687 89L44.5766 47.7935L85.7831 89L89 85.7831Z'
        strokeWidth='4px'
        className='stroke-current fill-current'
      />
    </svg>
  )
}

export default Close
