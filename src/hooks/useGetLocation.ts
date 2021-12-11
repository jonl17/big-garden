import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'

const useGetLocation = () => {
  const [position, setPosition] =
    useState<{ lat: number; lng: number }>()

  const map = useMap()

  useEffect(() => {
    map
      .locate({ watch: true })
      .on('locationfound', function (e) {
        setPosition((prev) => {
          if (!prev) {
            map.setView(e.latlng)
          }
          return e.latlng
        })
      })
  }, [map])

  return { position }
}

export { useGetLocation }
