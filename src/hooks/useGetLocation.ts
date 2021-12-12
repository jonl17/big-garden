import { useState, useEffect } from 'react'

const useGetLocation = () => {
  const [position, setPosition] =
    useState<GeolocationCoordinates>()

  const errorHandler = (err: any) => {
    if (err.code == 1) {
      alert('Error: Access is denied!')
    } else if (err.code == 2) {
      alert('Error: Position is unavailable!')
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (e) => {
          console.log(e.coords)
          setPosition(e.coords)
        },
        errorHandler,
        {
          enableHighAccuracy: true,
        }
      )
    }
  }, [])

  return { position }
}

export { useGetLocation }
