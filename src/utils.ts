import { Coordinates, ISculpture } from '@types'
import { LatLng } from 'leaflet'

export const measureDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  // generally used geo measurement function
  var R = 6378.137 // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d * 1000 // meters
}

export const geoErrorHandler = (err: any) => {
  if (err.code == 1) {
    alert('Error: Access is denied!')
  } else if (err.code == 2) {
    alert('Error: Position is unavailable!')
  }
}

export const checkProximity = (
  from: Coordinates,
  to: Coordinates,
  proximity: number = 15
) => {
  const distance = measureDistance(
    from.lat,
    from.lng,
    to.lat,
    to.lng
  )
  return {
    isInProximity: distance <= proximity,
    meters: distance,
  }
}

export const resolveSculpture = (
  node: any
): ISculpture => ({
  id: node._id,
  title: node.title,
  coordinates: node.coordinates,
  mapIcon: {
    url: node.mapIcon.asset.url,
    alt: 'map icon',
  },
  video: node.video,
  threeDeeModel: node.threeDeeModel
    ? `/models/${node.threeDeeModel}`
    : undefined,
  proximity: node.proximity ?? 15,
  panorama: node.panorama
    ? {
        url: node.panorama.asset.url,
        alt: 'panorama',
      }
    : undefined,
})

export const sculptureGardenCenter = {
  lat: 64.140997,
  lng: -21.963806,
}
