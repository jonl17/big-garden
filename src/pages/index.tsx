import type { NextPage } from 'next'
import Map from '@/components/Map'
import { mapEvents } from '@/prismic/utils/helpers'
import {
  mapEventResolver,
  MapEventType,
} from '@/prismic/utils/resolvers'
import ControlPanel from '@/components/ControlPanel'

type Props = {
  events: MapEventType[]
}

const Home: NextPage<Props> = ({ events }) => {
  return (
    <div className='relative'>
      <Map mapEvents={events} />
      <ControlPanel />
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const rawEvents = await mapEvents()
  const resolvedEvents = rawEvents.results.map((doc: any) =>
    mapEventResolver(doc)
  )
  return {
    props: {
      events: resolvedEvents,
    },
  }
}
