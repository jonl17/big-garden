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
    <div className='top-1/2 left-0 -mt-[250px] bg-white fixed'>
      <div className='h-[100px] bg-gray-300 w-full'>
        <button
          className='h-full text-right w-full p-5'
          onClick={() => toggleInventory(false)}
        >
          X
        </button>
      </div>
      <section className='grid w-full grid-cols-3'>
        <div className='h-full w-full p-5'>
          {collectedSculptures.map((item, key) => (
            <button
              key={key}
              onClick={() => openModal(item.id)}
            >
              <p>{item.title}</p>
              <img
                className='h-24 w-24'
                src={item.mapIcon.url}
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inventory
