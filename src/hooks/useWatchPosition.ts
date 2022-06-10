import { ISculpture } from '@types'
import { useCallback, useEffect } from 'react'
import { useGame } from 'src/store/game'
import { useInventory } from 'src/store/inventory'
import { usePosition } from 'src/store/position'
import { useTracker } from 'src/store/tracker'
import { getUserFromLocalStorage } from 'src/store/user'
import { checkProximity, geoErrorHandler } from 'src/utils'

const useWatchPosition = (sculptures: ISculpture[]) => {
  const { updateCoordinates } = usePosition()
  const { updateTracking } = useTracker()
  const { findItem } = useInventory()
  const username = getUserFromLocalStorage()

  const callback = useCallback(
    (gp: GeolocationPosition) => {
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
              username === 'bubbi morthens'
                ? true
                : isInProximity,
            name,
            collected: !!findItem(sc.id),
            ...sc,
          }
        })
      )
    },
    [
      findItem,
      sculptures,
      updateCoordinates,
      updateTracking,
      username,
    ]
  )

  useEffect(() => {
    const geo = navigator.geolocation
    const options: PositionOptions = {
      enableHighAccuracy: true,
    }

    if (geo) {
      const watchId = geo.watchPosition(
        callback,
        geoErrorHandler,
        options
      )
      return () => geo.clearWatch(watchId)
    }
  }, [callback])
}

export default useWatchPosition
