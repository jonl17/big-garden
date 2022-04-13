import { useState, useEffect } from 'react'
import { usePosition } from 'src/store/position'

const useInitLocationTracker = () => {
  const { updateCoordinates } = usePosition()

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
          updateCoordinates(e.coords)
        },
        errorHandler,
        {
          enableHighAccuracy: true,
        }
      )
    }
  }, [])
}

export { useInitLocationTracker }
