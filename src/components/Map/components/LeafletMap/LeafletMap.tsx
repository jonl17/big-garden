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
import { useGetInitialPosition } from '@hooks/useGetInitialLocation'
import { sudurgata } from '@components/Map/places/testAreas'
import { ISculpture, MapEventType } from 'src/types'
import { useModal } from 'src/store/modal'

type Props = {
  sculptures: ISculpture[]
}

const LeafletMap = ({ sculptures }: Props) => {
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
      {sculptures.map((item, key) => (
        <Marker
          key={key}
          position={{
            lat: item.coordinates.lat,
            lng: item.coordinates.lng,
          }}
          icon={icon(item.mapIcon.url)}
        >
          <Tooltip>{item.title}</Tooltip>
        </Marker>
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
