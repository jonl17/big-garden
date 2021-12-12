import React from 'react'

type Props = {
  position: GeolocationCoordinates
}

const ControlPanel = ({ position }: Props) => {
  return (
    <div className='fixed top-5 right-5'>
      <p>lat: {position.latitude}</p>
      <p>lng: {position.longitude}</p>
    </div>
  )
}

export default ControlPanel
