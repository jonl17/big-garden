import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MapContainerProps } from 'react-leaflet'

const Map = (mapProps: MapContainerProps) => {
  const LeafletMap = useMemo(
    () =>
      dynamic(() => import('./LeafletMap'), {
        ssr: false,
        loading: () => <p>Loading map...</p>,
      }),
    []
  )
  return <LeafletMap {...mapProps} />
}

export default Map
