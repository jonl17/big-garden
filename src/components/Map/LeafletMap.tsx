import {
  MapContainer,
  TileLayer,
  MapContainerProps,
  Marker,
  Tooltip,
  Polyline,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { places, starts } from './places'
import { Icon, LatLngExpression } from 'leaflet'

const LeafletMap = (props: MapContainerProps) => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { position: firstStart } = starts[0]
  const lines: LatLngExpression[] = props.center
    ? [{ ...props.center }, firstStart]
    : []

  return (
    <MapContainer
      className='h-screen w-full z-0'
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {props.center && (
        <Marker
          position={props.center}
          title='Ég'
          icon={icon('/person.png')}
        >
          <Tooltip>Ég</Tooltip>
        </Marker>
      )}
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
      <Polyline positions={lines} />
    </MapContainer>
  )
}

export default LeafletMap
