import React from 'react'
import { useInventory } from 'src/store/inventory'

const INVENTORY_SIZE = 6

const Inventory = () => {
  const { inventory, toggleInventory } = useInventory()
  return (
    <div className='h-[500px] w-[500px] top-1/2 left-1/2 -mt-[250px] -ml-[250px] bg-white fixed'>
      <div className='h-[100px] bg-gray-300 w-full'>
        <button
          className='h-full text-right w-full p-5'
          onClick={() => toggleInventory(false)}
        >
          X
        </button>
      </div>
      <section className='grid h-[400px] w-full grid-cols-3'>
        <div className='h-full w-full p-5'>
          {inventory.map((item, key) => (
            <p key={key}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inventory
