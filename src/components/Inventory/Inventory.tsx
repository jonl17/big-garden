import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'
import Header from '@components/Header'

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
    <div className='top-0 left-0 h-screen bg-white/80 fixed w-full z-10'>
      <div className='h-[100px] w-full'>
        <Header toggle={() => toggleInventory(false)}>
          <h1 className='text-xl flex place-items-center'>{`Collected sculptures (${collectedSculptures.length}/${sculptures.length})`}</h1>
        </Header>
      </div>
      <div className='grid w-full grid-cols-3'>
        {collectedSculptures.map((item, key) => (
          <button
            key={key}
            onClick={() => {
              openModal(item.id)
            }}
            className='h-36 w-36 md:h-56 md:w-56 relative'
          >
            <img
              src={item.mapIcon.url}
              alt='bag icon'
              className='h-full w-full'
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Inventory
