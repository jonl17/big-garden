import React from 'react'

const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const mode = 'directions'

export type MapProps = {
  cords: string
}

const dest = '64.138288, -21.959309'

const Map = ({ cords = '' }: MapProps) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/${mode}?key=${key}&origin=${cords}&destination=${dest}&mode=walking`

  return (
    <iframe
      className='h-screen w-full'
      style={{ border: 0 }}
      src={mapUrl}
      allowFullScreen
    ></iframe>
  )
}

export default Map
