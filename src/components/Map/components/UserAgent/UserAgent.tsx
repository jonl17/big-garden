import React, { useEffect } from 'react'
import { Marker, Tooltip, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { usePosition } from 'src/store/position'

const UserAgent = () => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { coordinates } = usePosition()
  const map = useMap()

  useEffect(() => {
    if (coordinates && map) {
      setTimeout(
        () =>
          map.flyTo({
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          }),
        3000
      )
    }
  }, [coordinates, map])

  if (coordinates) {
    return (
      <Marker
        position={{
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        }}
        icon={icon('/kall-icon.png')}
        title='bob'
      >
        <Tooltip permanent>You are here!</Tooltip>
      </Marker>
    )
  } else return null
}

export default UserAgent
