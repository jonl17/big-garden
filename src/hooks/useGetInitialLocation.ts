import { useState, useEffect } from 'react'

const useGetInitialPosition = () => {
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
      navigator.geolocation.getCurrentPosition((e) => {
        console.log(e.coords)
        setPosition(e.coords)
      }, errorHandler)
    }
  }, [])

  return { position }
}

export { useGetInitialPosition }
