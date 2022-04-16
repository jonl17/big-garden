import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'

const INVENTORY_SIZE = 6

type Props = {
  sculptures: ISculpture[]
}

const Inventory = ({ sculptures }: Props) => {
  const { inventory, toggleInventory } = useInventory()

  const collectedSculptures = sculptures.filter((sc) =>
    inventory.includes(sc.id)
  )

  console.log(sculptures)

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
            <div key={key}>
              <p>{item.title}</p>
              <img
                className='h-24 w-24'
                src={item.mapIcon.url}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inventory
