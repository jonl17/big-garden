import { ISculpture } from '@types'
import { useEffect, useMemo } from 'react'
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
      sculptures.map((sc) => {
        const id = sc.id
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
          id,
          isInProximity,
          name,
          collected: !!findItem(id),
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
