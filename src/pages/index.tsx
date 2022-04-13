import type { NextPage, GetStaticProps } from 'next'
import Map from '@components/Map'
import ControlPanel from '@components/ControlPanel'
import { ISculpture, MapEventType } from 'src/types'
import { getClient } from '@lib/sanity'
import { groq } from 'next-sanity'
import Modal from '@components/Modal'
import { useModal } from 'src/store/modal'
import { useInitLocationTracker } from '@hooks/useGetLocation'
import { measureDistance } from 'src/utils'
import { usePosition } from 'src/store/position'

type Props = {
  sculpturesRaw: any
}

const resolveProps = (node: any): ISculpture => ({
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

  useInitLocationTracker()

  return (
    <div className='relative'>
      <Map sculptures={sculptures} />
      <ControlPanel sculptures={sculptures} />
      {isOpen && <Modal />}
      <button
        className='absolute left-10 bottom-10'
        onClick={() => openModal(sculptures[0])}
      >
        open modal test
      </button>
    </div>
  )
}

const query = groq`
*[_type == "sculpture"] {
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
}) => {
  const sculpturesRaw = await getClient().fetch(query)

  return {
    props: {
      sculpturesRaw,
    },
  }
}
