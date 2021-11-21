import React from 'react'
import { Marker, Tooltip, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useGetLocation } from '@/hooks/useGetLocation'
import { starts } from '@/components/Map/places'

const UserAgent = () => {
  const { position } = useGetLocation()

  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  if (position) {
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
