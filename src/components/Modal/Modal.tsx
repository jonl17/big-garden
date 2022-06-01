import Header from '@components/Header'
import ThreeDeeEngine from '@components/ThreeDeeEngine'
import React from 'react'
import { useModal } from 'src/store/modal'
import { useSculptures } from 'src/store/sculptures'
import cn from 'classnames'
import Image from 'next/image'

const Modal = () => {
  const { closeModal, sculptureId, isOpen } = useModal()
  const { sculptures } = useSculptures()

  const sculpture = sculptures.find(
    (sc) => sc.id === sculptureId
  )

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-full h-full lg:p-24 bg-white z-20',
        {
          'opacity-100 pointer-events-auto': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
        }
      )}
    >
      <Header toggle={() => closeModal()}>
        {sculpture && (
          <div className='relative h-16 w-16'>
            <Image
              className='h-full w-full'
              src={sculpture.mapIcon.url}
              alt={sculpture.title}
              layout='fill'
            />
          </div>
        )}
      </Header>
      <div className='h-full w-full absolute top-0'>
        {/* render 3d model */}
        <ThreeDeeEngine
          modelPath={
            sculpture ? sculpture.threeDeeModel : undefined
          }
          panoramaPath={
            sculpture && sculpture.panorama
              ? sculpture.panorama.url
              : undefined
          }
        />

        {sculpture && sculpture.video && (
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
    </div>
  )
}

export default Modal
