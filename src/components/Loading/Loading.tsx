import React from 'react'

type LoadingProps = {
  text?: string
}

const Loading = ({ text = 'Loading...' }: LoadingProps) => {
  return (
    <section className='absolute top-0 left-0 h-screen w-full grid place-items-center'>
      <h1 className='text-2xl'>{text}</h1>
    </section>
  )
}

export default Loading
