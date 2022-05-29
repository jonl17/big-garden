import React from 'react'
import dynamic from 'next/dynamic'
import { ISculpture } from 'src/types'
import { usePosition } from 'src/store/position'

type Props = {
  sculptures: ISculpture[]
  mapboxEndpoint: string
}

const LeafletMap = dynamic(
  () => import('./components/LeafletMap'),
  { ssr: false }
)

const Map = ({ sculptures, mapboxEndpoint }: Props) => {
  const tileLayerAttribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'

  const { coordinates } = usePosition()

  if (!coordinates) return <p>Loading coordinates</p>

  return (
    <LeafletMap
      sculptures={sculptures}
      endpoint={mapboxEndpoint}
      attribution={tileLayerAttribution}
    />
  )
}

export default Map
