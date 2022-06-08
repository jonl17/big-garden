import React from 'react'
import { useRefMap } from 'src/store/map'
import { sculptureGardenCenter } from 'src/utils'
import Link from 'next/link'

const TreasureMapGuide = () => {
  const { map } = useRefMap()

  const flyToTrigger = () => {
    if (map) {
      map.flyTo(sculptureGardenCenter)
    }
  }
  return (
    <div className='absolute top-5 right-5 grid gap-3'>
      <Link passHref href='/info'>
        <a className='bg-white px-2 py-2 border-2 rounded text-center'>
          <p className='text-sm'>info</p>
        </a>
      </Link>
      <button
        onClick={flyToTrigger}
        className='bg-white px-2 py-1 border-2 rounded'
      >
        <p className='text-sm w-24'>
          where are the sculptures?
        </p>
      </button>
    </div>
  )
}

export default TreasureMapGuide
