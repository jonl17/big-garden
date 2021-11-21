import React from 'react'
import {
  Marker,
  Tooltip,
  Polyline,
  useMap,
} from 'react-leaflet'
import { Icon } from 'leaflet'
import { useGetLocation } from '@/hooks/useGetLocation'
import { starts } from '@/components/Map/places'

const UserAgent = () => {
  const { position } = useGetLocation()

  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const map = useMap()

  if (position) {
    map.setView(position, 16)
    return (
      <>
        <Marker
          position={{
            lat: position?.lat,
            lng: position?.lng,
          }}
          icon={icon('/person.png')}
        >
          <Tooltip>You are here!</Tooltip>
        </Marker>
        <Polyline
          positions={[position, starts[0].position]}
        />
      </>
    )
  } else return null
}

export default UserAgent
