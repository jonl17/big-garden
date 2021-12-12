import React from 'react'

type Props = {
  position: GeolocationCoordinates
}

const ControlPanel = ({ position }: Props) => {
  return (
    <div className='absolute bottom-5 left-5'>
      <p>lat: {position.latitude}</p>
      <p>lng: {position.longitude}</p>
    </div>
  )
}

export default ControlPanel
