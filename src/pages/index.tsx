import type { NextPage } from 'next'
import Map from '@/components/Map'
import ControlPanel from '@/components/ControlPanel'
import { MapEventType } from 'src/types'

const EVENTS: MapEventType[] = [
  {
    coordinates: {
      lat: 64.140617,
      lng: -21.962667,
    },
    image: {
      url: '/can.png',
      alt: 'Can',
    },
  },
]

type Props = {
  events: MapEventType[]
}

const Home: NextPage<Props> = ({ events = EVENTS }) => {
  return (
    <div className='relative'>
      <Map mapEvents={events} />
      <ControlPanel />
    </div>
  )
}

export default Home
