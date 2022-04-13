import React from 'react'
import { GeoPosition } from 'geo-position.ts'
import { sudurgata } from '@components/Map/places/testAreas'
import { usePosition } from 'src/store/position'
import { measureDistance } from 'src/utils'
import { ISculpture } from '@types'

type DataProps = {
  coordinates: GeolocationCoordinates
}

const Data: React.FC<DataProps> = ({
  children,
  coordinates,
}) => {
  return (
    <div className='fixed top-5 right-5'>
      <p>lat: {coordinates.latitude}</p>
      <p>lng: {coordinates.longitude}</p>
      <div>{children}</div>
    </div>
  )
}

type Props = {
  sculptures: ISculpture[]
}

const ControlPanel = ({ sculptures }: Props) => {
  const { coordinates } = usePosition()

  if (!coordinates) return <p>loading position</p>

  const distances = sculptures.map((sculpture) => ({
    distance: measureDistance(
      sculpture.coordinates.lat,
      sculpture.coordinates.lng,
      coordinates.latitude,
      coordinates.longitude
    ),
    ...sculpture,
  }))

  const coordInRange = distances.find(
    (dist) => dist.distance <= 5
  )

  return (
    <Data coordinates={coordinates}>
      {coordInRange ? (
        <p>you are in area: {coordInRange.title}</p>
      ) : (
        <p>you are not in any area</p>
      )}
      <div>
        distance from:
        {distances.map((d, key) => (
          <p key={key}> {`${d.title}: ${d.distance}`}</p>
        ))}
      </div>
    </Data>
  )
}

export default ControlPanel
