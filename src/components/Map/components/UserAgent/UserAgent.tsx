import React, { useState } from 'react'
import {
  Marker,
  Tooltip,
  Polyline,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { Icon, LatLng } from 'leaflet'
import { starts } from '@components/Map/places'
import { usePosition } from 'src/store/position'

const UserAgent = () => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { coordinates } = usePosition()

  if (coordinates) {
    return (
      <Marker
        position={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        icon={icon('/person.png')}
      >
        <Tooltip>You are here!</Tooltip>
      </Marker>
    )
  } else return null
}

export default UserAgent
