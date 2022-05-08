import type { NextPage, GetStaticProps } from 'next'
import Map from '@components/Map'
import ControlPanel from '@components/ControlPanel'
import { ISculpture } from 'src/types'
import { getClient } from '@lib/sanity'
import { groq } from 'next-sanity'
import Modal from '@components/Modal'
import { useModal } from 'src/store/modal'
import useWatchPosition from '@hooks/useWatchPosition'
import { useEffect, useState } from 'react'
import Inventory from '@components/Inventory'
import { useInventory } from 'src/store/inventory'
import CollectButton from '@components/CollectButton'
import { useSculptures } from 'src/store/sculptures'
import Head from 'next/head'

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

  const { updateSculptures } = useSculptures()

  useEffect(() => {
    updateSculptures(sculptures)
  }, [])

  const { isOpen: isModalOpen } = useModal()

  useWatchPosition(sculptures)
  const { inventoryOpen, toggleInventory, inventory } =
    useInventory()

  const [controlPanelOpen, setControlPanelOpen] =
    useState(false)

  return (
    <>
      <Head>
        <title>Sculpture Hunt</title>
      </Head>
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
            <button
              onClick={() => setControlPanelOpen(true)}
            >
              <p>Open control panel</p>
            </button>
          )}
        </div>

        {inventoryOpen && (
          <Inventory sculptures={sculptures} />
        )}

        <CollectButton sculptures={sculptures} />

        <button
          className='absolute left-0 top-0'
          onClick={() => toggleInventory(true)}
        >
          <img className='h-28' src='/bag.png' />
          <p className='absolute top-16 left-12 text-xl'>
            {inventory.length + 1}
          </p>
        </button>

        {isModalOpen && <Modal />}
      </div>
    </>
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
