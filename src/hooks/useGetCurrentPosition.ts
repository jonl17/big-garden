import { useState, useEffect } from 'react'
import { geoErrorHandler } from 'src/utils'

const useGetCurrentPosition = () => {
  const [position, setPosition] =
    useState<GeolocationCoordinates>()

  useEffect(() => {
    const geo = navigator.geolocation
    if (geo) {
      geo.getCurrentPosition((e) => {
        setPosition(e.coords)
      }, geoErrorHandler)
    }
  }, [])

  return { position }
}

export default useGetCurrentPosition
