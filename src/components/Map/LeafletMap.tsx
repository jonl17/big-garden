import {
  MapContainer,
  TileLayer,
  MapContainerProps,
  Marker,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { places, starts } from './places'
import { Icon } from 'leaflet'
import UserAgent from './components/UserAgent'

const LeafletMap = (props: MapContainerProps) => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  return (
    <MapContainer
      className='h-screen w-full z-0'
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* places positions */}
      {places.map((place, key) => (
        <Marker
          key={key}
          position={place.position}
          title={place.title}
          icon={icon(place.icon)}
        >
          <Tooltip>{place.title}</Tooltip>
        </Marker>
      ))}
      {starts.map((start, key) => (
        <Marker
          key={key}
          position={start.position}
          icon={icon('/start.png')}
        >
          <Tooltip>{start.title}</Tooltip>
        </Marker>
      ))}
      <UserAgent />
    </MapContainer>
  )
}

export default LeafletMap
