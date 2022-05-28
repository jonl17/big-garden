import React from 'react'
import { usePosition } from 'src/store/position'
import { useTracker } from 'src/store/tracker'

type DataProps = {
  coordinates: GeolocationCoordinates
  children?: React.ReactNode
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

  const treasureMapPosition = [64.141182, -21.963409]

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
