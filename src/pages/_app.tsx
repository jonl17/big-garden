import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LocationProvider } from '@/context/locationContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <Component {...pageProps} />
    </LocationProvider>
  )
}

export default MyApp
