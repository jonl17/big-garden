import React, { useState } from 'react'
import {
  Marker,
  Tooltip,
  Polyline,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { Icon, LatLng } from 'leaflet'
import { useGetLocation } from '@/hooks/useGetLocation'
import { starts } from '@/components/Map/places'

const UserAgent = () => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { position } = useGetLocation()

  console.log(position)

  if (position) {
    return (
      <>
        <Marker
          position={{
            lat: position.latitude,
            lng: position.longitude,
          }}
          icon={icon('/person.png')}
        >
          <Tooltip>You are here!</Tooltip>
        </Marker>
        <Polyline
          positions={[
            {
              lat: position.latitude,
              lng: position.longitude,
            },
            starts[0].position,
          ]}
        />
      </>
    )
  } else return null
}

export default UserAgent
