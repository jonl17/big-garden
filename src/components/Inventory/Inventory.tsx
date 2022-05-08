import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'

type Props = {
  sculptures: ISculpture[]
}

const Inventory = ({ sculptures }: Props) => {
  const { inventory, toggleInventory } = useInventory()
  const { openModal } = useModal()

  const collectedSculptures = sculptures.filter((sc) =>
    inventory.includes(sc.id)
  )

  return (
    <div className='top-0 lef-0 h-screen bg-white fixed w-full z-10'>
      <div className='h-[100px] bg-gray-300 w-full'>
        <button
          className='h-full text-right w-full p-5'
          onClick={() => toggleInventory(false)}
        >
          X
        </button>
      </div>
      <div className='grid w-full grid-cols-2 place-items-center'>
        {collectedSculptures.map((item, key) => (
          <button
            key={key}
            onClick={() => {
              openModal(item.id)
            }}
          >
            <img
              className='h-44 w-44 object-cover'
              src={item.mapIcon.url}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Inventory
