import useGetCurrentPosition from '@hooks/useGetCurrentPosition'
import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'
import { useTracker } from 'src/store/tracker'
import { checkProximity } from 'src/utils'

type Props = {
  sculptures: ISculpture[]
}

const CollectButton = ({ sculptures }: Props) => {
  const { addToInventory, findItem } = useInventory()
  const { tracked, updateTracking } = useTracker()
  const collectable = tracked.find(
    (t) => t.isInProximity && !t.collected
  )
  const { position } = useGetCurrentPosition()
  const { openModal } = useModal()

  const callback = (id: string) => {
    if (!findItem(id) && position) {
      addToInventory(id)
      updateTracking(
        sculptures.map((sc) => {
          const id = sc.id
          const name = sc.title
          const { isInProximity, meters } = checkProximity(
            {
              lat: position.latitude,
              lng: position.longitude,
            },
            sc.coordinates
          )
          return {
            distance: meters,
            isInProximity,
            name,
            collected: !!findItem(id),
            ...sc,
          }
        })
      )
      openModal(id)
    }
  }

  if (collectable) {
    return (
      <div className='fixed h-screen bg-white/80 z-50 w-full top-0 left-0'>
        <div className='h-full w-full p-4 grid place-items-center pb-36'>
          <h1 className='text-6xl text-center italic mt-5'>
            Sculpture unlocked
          </h1>
          <img
            className='h-full w-full object-contain'
            src={collectable.mapIcon.url}
            alt={collectable.mapIcon.alt}
          />
          <button
            className='px-10 py-5 border bg-red rounded-2xl'
            onClick={() => callback(collectable.id)}
          >
            <h2 className='text-4xl uppercase text-white mt-1'>
              collect
            </h2>
          </button>
        </div>
      </div>
    )
  }
  return null
}

export default CollectButton
