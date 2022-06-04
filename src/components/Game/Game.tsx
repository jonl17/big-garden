import Bag from '@components/Bag'
import CollectButton from '@components/CollectButton'
import Inventory from '@components/Inventory'
import Map from '@components/Map'
import Modal from '@components/Modal'
import useWatchPosition from '@hooks/useWatchPosition'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useModal } from 'src/store/modal'
import { useSculptures } from 'src/store/sculptures'

type Props = {
  mapboxEndpoint: string
}

const Game = ({ mapboxEndpoint }: Props) => {
  const { inventoryOpen } = useInventory()
  const { sculptures } = useSculptures()
  const { isOpen } = useModal()

  useWatchPosition(sculptures)

  return (
    <>
      <Map
        sculptures={sculptures}
        mapboxEndpoint={mapboxEndpoint}
      />
      <Bag />
      {inventoryOpen && (
        <Inventory sculptures={sculptures} />
      )}
      <CollectButton sculptures={sculptures} />
      {isOpen && <Modal />}
    </>
  )
}

export default Game
