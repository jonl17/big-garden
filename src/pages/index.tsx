import type { NextPage, GetStaticProps } from 'next'
import { ISculpture, IUser } from 'src/types'
import { getClient } from '@lib/sanity'
import { groq } from 'next-sanity'
import { useEffect, useRef, useState } from 'react'
import {
  loadFromLocalStorage,
  useInventory,
} from 'src/store/inventory'
import { useSculptures } from 'src/store/sculptures'
import Head from 'next/head'
import { resolveSculpture } from 'src/utils'
import StartingScreen from '@components/StartingScreen'
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from 'src/store/user'
import { useTraceUpdate } from '@hooks/useTraceUpdate'
import Game from '@components/Game'

type Props = {
  sculpturesRaw: any
  mapboxEndpoint: string
}

const Home: NextPage<Props> = (props) => {
  useTraceUpdate(props)

  const { sculpturesRaw, mapboxEndpoint } = props
  const resolvedSculptures = useRef<ISculpture[] | null>(
    null
  )

  const { updateSculptures } = useSculptures()

  const { initInventory } = useInventory()

  const [user, setUser] = useState<IUser | null>()

  const startGame = (username: string) => {
    const validUsername =
      username.length > 0 ? username : 'Art explorer'
    setUser({ username: validUsername })
    saveUserToLocalStorage(validUsername)
  }

  useEffect(() => {
    resolvedSculptures.current = sculpturesRaw.map(
      resolveSculpture
    )
    if (resolvedSculptures.current)
      updateSculptures(resolvedSculptures.current)
  }, [updateSculptures, sculpturesRaw])

  useEffect(() => {
    const storedInventory = loadFromLocalStorage()
    initInventory(storedInventory)
  }, [initInventory])

  useEffect(() => {
    const username = getUserFromLocalStorage()
    if (username) {
      setUser({ username })
    } else {
      setUser(null)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Sculpture Hunt</title>
      </Head>
      <div className='relative overflow-hidden'>
        {user && <Game mapboxEndpoint={mapboxEndpoint} />}
        {user === null && (
          <StartingScreen startGame={startGame} />
        )}
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
    video,
    title,
    coordinates,
    threeDeeModel,
    modelScale,
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
