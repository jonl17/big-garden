import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'
import Header from '@components/Header'
import Image from 'next/image'
import cn from 'classnames'

type Props = {
  sculptures: ISculpture[]
}

const Inventory = ({ sculptures }: Props) => {
  const { inventory, toggleInventory } = useInventory()
  const { openModal, isOpen } = useModal()

  const collectedSculptures = sculptures.filter((sc) =>
    inventory.includes(sc.id)
  )

  return (
    <div
      className={cn(
        'top-0 left-0 h-screen fixed w-full z-10',
        {
          'opacity-0': isOpen,
          'opacity-100 bg-white/50': !isOpen,
        }
      )}
    >
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
            <Image
              src={item.mapIcon.url}
              alt='bag icon'
              className='h-full w-full'
              layout='fill'
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Inventory
