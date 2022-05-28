import Close from '@components/Close'
import Header from '@components/Header'
import ThreeDeeEngine from '@components/ThreeDeeEngine'
import Image from 'next/image'
import React from 'react'
import { useModal } from 'src/store/modal'
import { useSculptures } from 'src/store/sculptures'

const Modal = () => {
  const { closeModal, sculptureId } = useModal()
  const { sculptures } = useSculptures()

  const sculpture = sculptures.find(
    (sc) => sc.id === sculptureId
  )

  if (!sculpture) return null

  return (
    <div className='fixed top-0 left-0 w-full h-full lg:p-24 bg-white z-20'>
      <Header toggle={() => closeModal()}>
        <div className='relative h-16 w-16'>
          <Image
            className='h-full w-full'
            objectFit='cover'
            layout='fill'
            src={sculpture.mapIcon.url}
            alt={sculpture.title}
          />
        </div>
      </Header>
      {sculpture && (
        <div className='h-full'>
          {/* render 3d model */}
          {sculpture.threeDeeModel && (
            <ThreeDeeEngine
              modelPath={sculpture.threeDeeModel}
            />
          )}

          {sculpture.video && (
            <video
              className='w-full lg:h-full'
              autoPlay
              muted
              loop
            >
              <source src={sculpture.video.url} />
            </video>
          )}
        </div>
      )}
    </div>
  )
}

export default Modal
