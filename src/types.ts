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
