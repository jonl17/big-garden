import React, { useEffect, useState } from 'react'
import { GeoPosition } from 'geo-position.ts'
import { falkagataCrossroadsArea } from '@/components/Map/places/testAreas'

type Props = {
  position: GeolocationCoordinates
}

const ControlPanel = ({ position }: Props) => {
  const geoposition = new GeoPosition(
    position.latitude,
    position.longitude
  )

  const [inArea, setInArea] = useState(false)

  useEffect(() => {
    if (geoposition.IsInsideArea(falkagataCrossroadsArea)) {
      setInArea(true)
    } else setInArea(false)
  }, [position])

  return (
    <div className='fixed top-5 right-5'>
      <p>lat: {position.latitude}</p>
      <p>lng: {position.longitude}</p>
      {inArea ? (
        <p className='text-red-600'>
          Þú ERT á Fálkagötu krossgötum
        </p>
      ) : (
        <p>Þú ert EKKI á Fálkagötu krossgötum</p>
      )}
    </div>
  )
}

export default ControlPanel
