import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const PendingPage = () => {
  const router = useRouter()
  return (
    <section className='p-5 '>
      <p className='text-2xl mb-5 leading-normal'>
        Please accept location tracking, otherwise the app
        does not work.
      </p>
      <p className='text-2xl  mb-5 leading-normal'>
        You can open the app in another browser. Or clear
        the browser settings that is blocking the location
        tracking.
      </p>
    </section>
  )
}

export default PendingPage
