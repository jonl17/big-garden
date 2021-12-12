import { GeoPosition } from 'geo-position.ts'

export const falkagataCrossroadsArea = {
  label: 'Fálkagata krossgötur',
  coords: [
    new GeoPosition(64.137763, -21.956841),
    new GeoPosition(64.137742, -21.956722),
    new GeoPosition(64.137719, -21.956912),
    new GeoPosition(64.137694, -21.956786),
  ],
}

const lat = 64.137209
const lng = -21.954401
const size = 0.000085

export const sudurgata = {
  label: 'Suðurgata',
  coords: [
    new GeoPosition(lat - size, lng - size),
    new GeoPosition(lat - size, lng + size),
    new GeoPosition(lat + size, lng + size),
    new GeoPosition(lat + size, lng - size),
  ],
}
