import React from 'react'
import { GeoPosition } from 'geo-position.ts'
import { sudurgata } from '@components/Map/places/testAreas'
import { useGetLocation } from '@hooks/useGetLocation'

const Data = ({
  position,
}: {
  position: GeolocationCoordinates
}) => {
  const geoposition = new GeoPosition(
    position.latitude,
    position.longitude
  )

  return (
    <div className='fixed top-5 right-5'>
      <p>lat: {position.latitude}</p>
      <p>lng: {position.longitude}</p>
      {geoposition.IsInsideArea(sudurgata.coords) ? (
        <p className='text-red-600'>
          Þú ERT á Fálkagötu krossgötum
        </p>
      ) : (
        <p>Þú ert EKKI á Fálkagötu krossgötum</p>
      )}
    </div>
  )
}

const ControlPanel = () => {
  const { position } = useGetLocation()

  if (!position) return <p>loading position</p>
  return <Data position={position} />
}

export default ControlPanel
