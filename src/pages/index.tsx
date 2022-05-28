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
import Image from 'next/image'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { resolveSculpture } from 'src/utils'

type Props = {
  sculpturesRaw: any
  mapboxEndpoint: string
}

const Home: NextPage<Props> = ({
  sculpturesRaw,
  mapboxEndpoint,
}) => {
  const sculptures: ISculpture[] = sculpturesRaw.map(
    resolveSculpture
  )

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

  console.log('rendering')

  return (
    <>
      <Head>
        <title>Sculpture Hunt</title>
      </Head>
      <div className='relative'>
        <Map
          sculptures={sculptures}
          mapboxEndpoint={mapboxEndpoint}
        />
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
          className='absolute left-0 top-0 h-28 w-28'
          onClick={() => toggleInventory(true)}
        >
          <div className='relative h-full w-full'>
            <Image
              alt='Bag icon'
              layout='fill'
              src='/bag-yellow.png'
            />
            <p className='absolute top-16 left-12 text-xl'>
              {inventory.length}
            </p>
          </div>
        </button>

        {isModalOpen && <Modal />}
      </div>
    </>
  )
}

// preload models
useLoader.preload(GLTFLoader, '/models/kassi.glb')
useLoader.preload(GLTFLoader, '/models/tunna.glb')

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
    coordinates,
    threeDeeModel
}
`

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const sculpturesRaw = await getClient().fetch(query)

  const mapboxAccessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const mapboxEndpoint = `https://api.mapbox.com/styles/v1/jonfiskur666/cl2xja6kd00ab15mur7qxc94o/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxAccessToken}`

  return {
    props: {
      sculpturesRaw,
      mapboxEndpoint,
    },
  }
}
