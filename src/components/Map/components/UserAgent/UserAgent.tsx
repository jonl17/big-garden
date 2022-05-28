import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
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
        icon={icon('/kall-icon.png')}
      >
        <Tooltip>You are here!</Tooltip>
      </Marker>
    )
  } else return null
}

export default UserAgent
