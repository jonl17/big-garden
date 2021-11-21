import { LatLngExpression } from 'leaflet'

export interface Place {
  position: LatLngExpression
  title: string
  icon: string
  id?: string
  picture?: string
  description?: string
  seeMoreLink?: string
}

export interface Start extends Omit<Place, 'icon'> {}

const places: Place[] = [
  {
    position: {
      lat: 64.140716,
      lng: -21.963404,
    },
    title: 'Skór.is',
    icon: '/shoes.png',
  },
  {
    position: {
      lat: 64.140906,
      lng: -21.963868,
    },
    title: 'Tumbleplant',
    icon: '/plant.png',
  },
  {
    position: {
      lat: 64.142431,
      lng: -21.964624,
    },
    title: 'Dós',
    icon: '/can.png',
  },
]

const starts: Start[] = [
  {
    position: {
      lat: 64.140259,
      lng: -21.96247,
    },
    title: 'Byrjunarreitur #1',
  },
]

export { places, starts }
