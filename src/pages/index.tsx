import type { NextPage, GetStaticProps } from 'next'
import Map from '@components/Map'
import ControlPanel from '@components/ControlPanel'
import { ISculpture, MapEventType } from 'src/types'
import { getClient } from '@lib/sanity'
import { groq } from 'next-sanity'
import Modal from '@components/Modal'
import { useModal } from 'src/store/modal'
import useWatchPosition from '@hooks/useWatchPosition'
import { measureDistance } from 'src/utils'
import { usePosition } from 'src/store/position'
import { useState } from 'react'
import Inventory from '@components/Inventory'
import { useInventory } from 'src/store/inventory'
import { useTracker } from 'src/store/tracker'
import CollectButton from '@components/CollectButton'

type Props = {
  sculpturesRaw: any
}

const resolveProps = (node: any): ISculpture => ({
  id: node._id,
  title: node.title,
  coordinates: node.coordinates,
  mapIcon: {
    url: node.mapIcon.asset.url,
    alt: 'map icon',
  },
  video: node.video
    ? {
        url: node.video.asset.url,
      }
    : undefined,
})

const Home: NextPage<Props> = ({ sculpturesRaw }) => {
  const sculptures: ISculpture[] =
    sculpturesRaw.map(resolveProps)

  const { isOpen, openModal } = useModal()

  useWatchPosition(sculptures)
  const { inventoryOpen, toggleInventory, inventory } =
    useInventory()

  const [controlPanelOpen, setControlPanelOpen] =
    useState(true)

  return (
    <div className='relative'>
      <Map sculptures={sculptures} />
      <div className='absolute top-5 right-5'>
        {controlPanelOpen ? (
          <button
            onClick={() => setControlPanelOpen(false)}
          >
            <ControlPanel />
          </button>
        ) : (
          <button onClick={() => setControlPanelOpen(true)}>
            <p>Open control panel</p>
          </button>
        )}
      </div>

      {inventoryOpen && (
        <Inventory sculptures={sculptures} />
      )}

      <CollectButton sculptures={sculptures} />

      <button
        className='absolute left-10 bottom-36'
        onClick={() => toggleInventory(true)}
      >
        {`BAG (${inventory.length})`}
      </button>
    </div>
  )
}

const query = groq`
*[_type == "sculpture"] {
    _id,
    mapIcon { 
    asset->
    },
    video {
    asset->
    },
    title,
    coordinates
}
`

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const sculpturesRaw = await getClient().fetch(query)

  return {
    props: {
      sculpturesRaw,
    },
  }
}
