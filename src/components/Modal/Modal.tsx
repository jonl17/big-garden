import Header from '@components/Header'
import ThreeDeeEngine from '@components/ThreeDeeEngine'
import React from 'react'
import { useModal } from 'src/store/modal'
import { useSculptures } from 'src/store/sculptures'
import cn from 'classnames'
import Image from 'next/image'
import Video from '@components/Video'

const Modal = () => {
  const { closeModal, sculptureId, isOpen } = useModal()
  const { sculptures } = useSculptures()

  const sculpture = sculptures.find(
    (sc) => sc.id === sculptureId
  )

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-full h-full lg:p-24 z-20',
        {
          'opacity-100 pointer-events-auto': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
          'bg-black': sculpture?.video,
          'bg-white/80': !sculpture?.video,
        }
      )}
    >
      <Header
        toggle={() => closeModal()}
        className={cn({
          'text-white fill-white': sculpture?.video,
        })}
      >
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
      <div className='h-full w-full absolute top-0 left-0 grid place-items-center'>
        {/* render 3d model */}
        {sculpture && sculpture.threeDeeModel && (
          <ThreeDeeEngine
            modelPath={
              sculpture
                ? sculpture.threeDeeModel
                : undefined
            }
          />
        )}

        {sculpture && sculpture.video && (
          <Video video={sculpture.video} />
        )}
      </div>
    </div>
  )
}

export default Modal
