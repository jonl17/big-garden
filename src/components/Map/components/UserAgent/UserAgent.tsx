import React, { useEffect, useState } from 'react'
import { Marker, Tooltip, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { usePosition } from 'src/store/position'
import { getUserFromLocalStorage } from 'src/store/user'

const UserAgent = () => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { coordinates } = usePosition()
  const map = useMap()

  const [username, setUsername] = useState('')

  useEffect(() => {
    const user = getUserFromLocalStorage()
    setUsername(user ?? 'Art explorer')
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
        title={username}
      >
        <Tooltip permanent>{username}</Tooltip>
      </Marker>
    )
  } else return null
}

export default UserAgent
