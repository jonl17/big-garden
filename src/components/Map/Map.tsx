import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MapEventType } from '@/prismic/utils/resolvers'

type Props = {
  mapEvents: MapEventType[]
}

const Map = ({ mapEvents }: Props) => {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('./components/LeafletMap'), {
        ssr: false,
        loading: () => <p>Loading map...</p>,
      }),
    [mapEvents]
  )
  return <LeafletMap mapEvents={mapEvents} />
}

export default Map
