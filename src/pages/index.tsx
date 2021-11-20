import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Map from '../components/Map';

const Home: NextPage = () => {
  const [userCords, setUserCords] = useState('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation is available');
      navigator.geolocation.getCurrentPosition((position) => {
        setInterval(() => {
          setUserCords(
            `${position.coords.latitude}, ${position.coords.longitude}`
          );
        }, 5000);
      });
    } else {
      console.log('geolocation is NOT available');
    }
  }, []);
  return <div>{userCords && <Map cords={userCords} />}</div>;
};

export default Home;
