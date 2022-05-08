import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import UserAgent from '../UserAgent'
import useGetCurrentPosition from '@hooks/useGetCurrentPosition'
import { ISculpture } from 'src/types'
import {
  tileLayerAttribution,
  tileLayerEndpoint,
} from './mapBoxConfig'

type Props = {
  sculptures: ISculpture[]
}

const LeafletMap = ({ sculptures }: Props) => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { position } = useGetCurrentPosition()

  if (!position) return <p>Loading map</p>

  return (
    <MapContainer
      className='h-screen w-full z-0'
      zoom={16}
      center={{
        lat: position.latitude,
        lng: position.longitude,
      }}
      zoomControl={false}
    >
      <TileLayer
        attribution={tileLayerAttribution}
        url={tileLayerEndpoint}
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

      <UserAgent />
    </MapContainer>
  )
}

export default LeafletMap
