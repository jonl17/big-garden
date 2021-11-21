import type { NextPage } from 'next'
import Map from '@/components/Map'
import { useGetLocation } from '@/hooks/useGetLocation'

const Header: React.FC = ({ children }) => {
  return (
    <h1 className='absolute top-5 right-5 z-10'>
      {children}
    </h1>
  )
}

const Home: NextPage = () => {
  const { position } = useGetLocation()

  return (
    <div className='relative'>
      {position ? (
        <Header>{`${position.lat}, ${position.lng}`}</Header>
      ) : (
        'User cords not set'
      )}
      {position && (
        <Map center={{ ...position }} zoom={18} />
      )}
    </div>
  )
}

export default Home
