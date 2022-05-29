import React, { useState } from 'react'

type Props = {
  startGame: (username: string) => void
}

const StartingScreen = ({ startGame }: Props) => {
  const [username, setUsername] = useState('')
  return (
    <section className='h-screen w-full fixed top-0 left-0 z-50 bg-white px-5 grid gap-5 place-content-center'>
      <h1 className='text-4xl italic'>
        Welcome to Sculpture Hunt!
      </h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter username'
        type='text'
        className='text-center border-2 border-black h-24 w-full placeholder:text-3xl text-3xl px-3 rounded-lg'
      />
      <button
        onClick={() => startGame(username)}
        className='border-2 border-black h-24 w-full rounded-lg'
      >
        <h1 className='text-3xl'>START</h1>
      </button>
    </section>
  )
}

export default StartingScreen
