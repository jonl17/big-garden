import useGetCurrentPosition from '@hooks/useGetCurrentPosition'
import { ISculpture } from '@types'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'
import { usePosition } from 'src/store/position'
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
            id,
            isInProximity,
            name,
            collected: !!findItem(id),
          }
        })
      )
      openModal(id)
    }
  }

  if (collectable) {
    return (
      <div className='fixed h-full w-full top-0 left-0 grid place-items-center'>
        <button
          className='px-10 py-5 bg-white border'
          onClick={() => callback(collectable.id)}
        >
          <h2 className='text-2xl'>{`Collect sculpture: ${collectable.name}`}</h2>
        </button>
      </div>
    )
  }
  return null
}

export default CollectButton
