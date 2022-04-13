import {
  MapContainer,
  TileLayer,
  MapContainerProps,
  Marker,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { starts } from '../../places'
import { Icon } from 'leaflet'
import UserAgent from '../UserAgent'
import { useGetInitialPosition } from '@/hooks/useGetInitialLocation'
import { sudurgata } from '@/components/Map/places/testAreas'
import { MapEventType } from 'src/types'

type Props = {
  mapEvents: MapEventType[]
}

const LeafletMap = ({ mapEvents }: Props) => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { position } = useGetInitialPosition()

  if (!position) return <p>Loading map</p>

  return (
    <MapContainer
      className='h-screen w-full z-0'
      zoom={16}
      center={{
        lat: position.latitude,
        lng: position.longitude,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* events */}
      {mapEvents.map((event, key) => (
        <Marker
          key={key}
          position={{
            lat: event.coordinates.lat,
            lng: event.coordinates.lng,
          }}
          icon={icon('/can.png')}
        ></Marker>
      ))}

      {sudurgata.coords.map((pos, key) => (
        <Marker
          key={key}
          position={{
            lat: pos.Latitude,
            lng: pos.Longitude,
          }}
          icon={icon('/plant.png')}
        ></Marker>
      ))}
      <UserAgent />
    </MapContainer>
  )
}

export default LeafletMap
