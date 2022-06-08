import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import UserAgent from '../UserAgent'
import { ISculpture } from 'src/types'
import { sculptureGardenCenter } from 'src/utils'
import Loading from '@components/Loading'
import { usePosition } from 'src/store/position'
import { useRefMap } from 'src/store/map'
import { useGame } from 'src/store/game'

type Props = {
  sculptures: ISculpture[]
  endpoint: string
  attribution: string
}

const LeafletMap = ({
  sculptures,
  endpoint,
  attribution,
}: Props) => {
  const icon = (iconUrl: string) =>
    new Icon({ iconUrl, iconSize: [32, 32] })

  const { coordinates: position } = usePosition()
  const { setMap } = useRefMap()

  const { started } = useGame()

  if (!position) return <Loading text='Loading map...' />

  return (
    <MapContainer
      className='h-screen w-full z-0'
      zoom={16}
      center={
        started
          ? {
              lat: position.latitude,
              lng: position.longitude,
            }
          : sculptureGardenCenter
      }
      zoomControl={false}
      whenCreated={setMap}
    >
      <TileLayer attribution={attribution} url={endpoint} />
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
