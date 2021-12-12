import React from 'react'

type Props = {
  position: GeolocationCoordinates
}

const ControlPanel = ({ position }: Props) => {
  return (
    <div className='fixed top-0 right-0'>
      <p>lat: {position.latitude}</p>
      <p>lng: {position.longitude}</p>
    </div>
  )
}

export default ControlPanel
