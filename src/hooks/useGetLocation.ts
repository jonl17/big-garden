import { useState, useEffect } from 'react'

const useGetLocation = () => {
  const [position, setPosition] =
    useState<{ lat: number; lng: number }>()

  useEffect(() => {
    if ('geolocation' in navigator) {
      const update = (position: GeolocationPosition) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          update(position)
        }
      )
    } else {
      console.log('geolocation is NOT available')
    }
  }, [])

  return { position }
}

export { useGetLocation }
