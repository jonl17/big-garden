import { ISculpture } from '@types'
import { useEffect } from 'react'
import { useInventory } from 'src/store/inventory'
import { usePosition } from 'src/store/position'
import { useTracker } from 'src/store/tracker'
import { checkProximity, geoErrorHandler } from 'src/utils'

const useWatchPosition = (sculptures: ISculpture[]) => {
  const { updateCoordinates } = usePosition()
  const { updateTracking } = useTracker()
  const { findItem } = useInventory()

  const callback = (gp: GeolocationPosition) => {
    updateCoordinates(gp.coords)
    // check distance to sculptures
    updateTracking(
      sculptures.map((sc, idx) => {
        const name = sc.title
        const { isInProximity, meters } = checkProximity(
          {
            lat: gp.coords.latitude,
            lng: gp.coords.longitude,
          },
          sc.coordinates
        )
        return {
          distance: meters,
          isInProximity:
            sc.title === 'Rolling Sphere'
              ? true
              : isInProximity,
          name,
          collected: !!findItem(sc.id),
          ...sc,
        }
      })
    )
  }

  const options: PositionOptions = {
    enableHighAccuracy: true,
  }

  useEffect(() => {
    const geo = navigator.geolocation
    if (geo) {
      const watchId = geo.watchPosition(
        callback,
        geoErrorHandler,
        options
      )
      return () => geo.clearWatch(watchId)
    }
  }, [])
}

export default useWatchPosition
