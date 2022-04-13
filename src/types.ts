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

export interface ISculpture {
  title: string
  coordinates: {
    lat: number
    lng: number
  }
  mapIcon: ImageType
  video?: {
    url: string
  }
  threeDeeModel?: string
  description?: string
}
