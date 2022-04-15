import React, { useEffect } from 'react'
import { GeoPosition } from 'geo-position.ts'
import { sudurgata } from '@components/Map/places/testAreas'
import { usePosition } from 'src/store/position'
import { checkProximity, measureDistance } from 'src/utils'
import { ISculpture } from '@types'
import { useTracker } from 'src/store/tracker'

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

const ControlPanel = () => {
  const { coordinates: userAgentCoordinates } =
    usePosition()
  const { tracked } = useTracker()

  if (!userAgentCoordinates) return <p>loading position</p>

  const inProximity = tracked.find((t) => t.isInProximity)

  return (
    <Data coordinates={userAgentCoordinates}>
      {inProximity ? (
        <p>you are in area: {inProximity.name}</p>
      ) : (
        <p>you are not in any area</p>
      )}
      <div>
        distance from:
        {tracked.map((d, key) => (
          <p key={key}> {`${d.name}: ${d.distance}`}</p>
        ))}
      </div>
    </Data>
  )
}

export default ControlPanel
