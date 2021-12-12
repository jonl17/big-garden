import {
  MapContainer,
  TileLayer,
  MapContainerProps,
  Marker,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { places, starts } from '../../places'
import { Icon } from 'leaflet'
import UserAgent from '../UserAgent'
import { MapEventType } from '@/prismic/utils/resolvers'
import { useEffect } from 'react'
import { useGetInitialPosition } from '@/hooks/useGetInitialLocation'

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
