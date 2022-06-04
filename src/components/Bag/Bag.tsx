import Image from 'next/image'
import React, { useState } from 'react'
import { useInventory } from 'src/store/inventory'

const Bag = () => {
  const { inventory, toggleInventory } = useInventory()
  const [loaded, setLoaded] = useState(false)
  return (
    <button
      className='absolute left-0 top-0 h-28 w-28'
      onClick={() => toggleInventory(true)}
    >
      <div className='relative h-full w-full'>
        <Image
          layout='fill'
          alt='Bag icon'
          src='/bag-yellow.png'
          onLoadingComplete={() => setLoaded(true)}
        />
        {loaded && (
          <p className='absolute top-16 left-12 text-xl'>
            {inventory.length}
          </p>
        )}
      </div>
    </button>
  )
}

export default Bag
