import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Map from '../components/Map'

const Header: React.FC = ({ children }) => {
  return (
    <h1 className='absolute top-5 right-5 z-10'>
      {children}
    </h1>
  )
}

const Home: NextPage = () => {
  const [userCords, setUserCords] =
    useState<{ lat: number; lng: number }>()

  useEffect(() => {
    if ('geolocation' in navigator) {
      const updateCords = (
        position: GeolocationPosition
      ) => {
        setUserCords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      }

      console.log('geolocation is available')

      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateCords(position)
          setInterval(() => {
            updateCords(position)
          }, 2000)
        }
      )
    } else {
      console.log('geolocation is NOT available')
    }
  }, [])
  return (
    <div className='relative'>
      {userCords ? (
        <Header>{`${userCords.lat}, ${userCords.lng}`}</Header>
      ) : (
        'User cords not set'
      )}
      {userCords && (
        <Map center={{ ...userCords }} zoom={18} />
      )}
    </div>
  )
}

export default Home
