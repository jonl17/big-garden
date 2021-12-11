export type MapEventType = {
  coordinates: {
    lat: number
    lng: number
  }
  work: {
    id: string
    slug: string
  }
  popupContent: {
    video?: {
      url: string
    }
    image?: {
      url: string
    }
  }
}

export const mapEventResolver = (
  doc: any
): MapEventType => ({
  coordinates: {
    lat: doc.data.coordinates.split(', ')[0],
    lng: doc.data.coordinates.split(', ')[1],
  },
  work: doc.data.work,
  popupContent: {
    image: doc.data.image,
    video: doc.data.video,
  },
})
