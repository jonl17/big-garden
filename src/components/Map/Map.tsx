import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { ISculpture } from 'src/types'

type Props = {
  sculptures: ISculpture[]
}

const Map = ({ sculptures }: Props) => {
  const LeafletMap: any = useMemo(
    () =>
      dynamic(() => import('./components/LeafletMap'), {
        ssr: false,
        loading: () => <p>Loading map...</p>,
      }),
    []
  )
  return <LeafletMap sculptures={sculptures} />
}

export default Map
