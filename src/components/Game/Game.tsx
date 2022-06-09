import Bag from '@components/Bag'
import CollectButton from '@components/CollectButton'
import Inventory from '@components/Inventory'
import Map from '@components/Map'
import Modal from '@components/Modal'
import TreasureMapGuide from '@components/TreasureMapGuide'
import useWatchPosition from '@hooks/useWatchPosition'
import React from 'react'
import { useInventory } from 'src/store/inventory'
import { useRefMap } from 'src/store/map'
import { useModal } from 'src/store/modal'
import { useSculptures } from 'src/store/sculptures'
import { sculptureGardenCenter } from 'src/utils'

type Props = {
  mapboxEndpoint: string
}

const Game = ({ mapboxEndpoint }: Props) => {
  const { inventoryOpen } = useInventory()
  const { sculptures } = useSculptures()
  const { isOpen: modalOpen } = useModal()

  useWatchPosition(sculptures)

  return (
    <>
      <Map
        sculptures={sculptures}
        mapboxEndpoint={mapboxEndpoint}
      />
      <Bag />
      <TreasureMapGuide />
      {inventoryOpen && (
        <Inventory sculptures={sculptures} />
      )}
      <CollectButton sculptures={sculptures} />
      {modalOpen && <Modal />}
    </>
  )
}

export default Game
