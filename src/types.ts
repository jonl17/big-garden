import { LatLng, LatLngTuple } from 'leaflet'

export type ImageType = {
  alt: string
  url: string
}

export type MapEventType = {
  coordinates: {
    lat: number
    lng: number
  }
  image: ImageType
}

export type Coordinates = {
  lat: number
  lng: number
}

export interface ISculpture {
  id: string
  title: string
  coordinates: Coordinates
  mapIcon: ImageType
  video?: {
    url: string
  }
  threeDeeModel?: string
  description?: string
  proximity?: number
}
