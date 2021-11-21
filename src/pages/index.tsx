import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Map from '../components/Map'

const Header: React.FC = ({ children }) => {
  return <h1 className='absolute top-5 right-5'>{children}</h1>
}

const Home: NextPage = () => {
  const [userCords, setUserCords] = useState('')

  useEffect(() => {
    if ('geolocation' in navigator) {
      const updateCords = (position: GeolocationPosition) => {
        setUserCords(
          `${position.coords.latitude}, ${position.coords.longitude}`
        )
      }

      console.log('geolocation is available')

      navigator.geolocation.getCurrentPosition((position) => {
        updateCords(position)
        setInterval(() => {
          updateCords(position)
        }, 2000)
      })
    } else {
      console.log('geolocation is NOT available')
    }
  }, [])
  return (
    <div className='relative'>
      {userCords ? <Header>{userCords}</Header> : 'User cords not set'}
      {userCords && <Map cords={userCords} />}
    </div>
  )
}

export default Home
