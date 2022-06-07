import React, { useState } from 'react'

type Props = {
  startGame: (username: string) => void
}

const StartingScreen = ({ startGame }: Props) => {
  const [username, setUsername] = useState('')
  return (
    <section className='h-screen w-full fixed top-0 left-0 z-50 bg-white px-5 grid gap-5 pb-36 place-content-center'>
      <div className='text-center mb-3'>
        <h1 className='text-3xl mb-3'>welcome to</h1>
        <h1 className='text-5xl lucky-guy-font font-normal'>
          Sculpture Hunt
        </h1>
      </div>
      <div className='text-lg max-w-md leading-relaxed font-light'>
        <p className='mb-1'>
          After entering your username, you will be asked to
          allow location tracking for this app.
        </p>
        <p className='mb-1'>
          It is essential to accept if you want to be able
          to participate in the sculpture hunt.
        </p>
        <p className='italic'>
          If you need further instructions, press info in
          the top right corner of the map.
        </p>
      </div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder='enter username'
        type='text'
        className='text-center border-2 border-black h-16 w-full placeholder:text-xl text-xl px-3 rounded-lg'
      />
      <button
        onClick={() => startGame(username)}
        className='border-2 border-black h-16 w-full mx-auto rounded-lg bg-green-400'
      >
        <h1 className='text-3xl'>start</h1>
      </button>
    </section>
  )
}

export default StartingScreen
