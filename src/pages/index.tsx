import type { NextPage, GetStaticProps } from 'next'
import Map from '@components/Map'
import ControlPanel from '@components/ControlPanel'
import { ISculpture } from 'src/types'
import { getClient } from '@lib/sanity'
import { groq } from 'next-sanity'
import Modal from '@components/Modal'
import useWatchPosition from '@hooks/useWatchPosition'
import { useEffect, useState } from 'react'
import Inventory from '@components/Inventory'
import {
  loadFromLocalStorage,
  useInventory,
} from 'src/store/inventory'
import CollectButton from '@components/CollectButton'
import { useSculptures } from 'src/store/sculptures'
import Head from 'next/head'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { resolveSculpture } from 'src/utils'
import Image from 'next/image'
import StartingScreen from '@components/StartingScreen'
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from 'src/store/user'
import cn from 'classnames'

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

  useWatchPosition(sculptures)
  const {
    inventoryOpen,
    toggleInventory,
    inventory,
    initInventory,
  } = useInventory()

  const [started, setStarted] = useState(false)

  const startGame = (username: string) => {
    setStarted(true)
    saveUserToLocalStorage(
      username.length > 0 ? username : 'Art explorer'
    )
    if (navigator && navigator.vibrate) {
      navigator.vibrate(200)
    }
  }

  useEffect(() => {
    const storedInventory = loadFromLocalStorage()
    initInventory(storedInventory)
    const username = getUserFromLocalStorage()
    if (username) setStarted(true)
    else setStarted(false)
  }, [])

  // if (!started) {
  //   return (
  //     <div
  //       className={cn('relative opacity-0', {
  //         'opacity-100': !started,
  //       })}
  //     >
  //       <StartingScreen startGame={startGame} />
  //     </div>
  //   )
  // }

  return (
    <>
      <Head>
        <title>Sculpture Hunt</title>
      </Head>
      <div className='relative'>
        <h1 className='text-5xl px-4 pt-12 text-center'>
          Welcome to Sculpture Hunt. The hunt begins on the
          9th of June.
        </h1>
        {/* <Map
          sculptures={sculptures}
          mapboxEndpoint={mapboxEndpoint}
        />

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
              layout='fill'
              alt='Bag icon'
              src='/bag-yellow.png'
            />
            <p className='absolute top-16 left-12 text-xl'>
              {inventory.length}
            </p>
          </div>
        </button>

        <Modal /> */}

        {/* <StartingScreen startGame={startGame} /> */}
      </div>
    </>
  )
}

// preload models
// useLoader.preload(GLTFLoader, '/models/kassi.glb')
// useLoader.preload(GLTFLoader, '/models/tunna.glb')

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
    threeDeeModel,
    proximity,
    panorama {
      asset->
    }
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
