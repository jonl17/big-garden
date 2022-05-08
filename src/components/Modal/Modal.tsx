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
    <div className='fixed top-0 left-0 w-full h-full p-5 lg:p-24 bg-white z-20'>
      <button
        onClick={() => closeModal()}
        className='border px-3'
      >
        <h1 className='text-2xl'>LOKA</h1>
      </button>
      {sculpture && (
        <div className='lg:p-10 h-full'>
          <h1 className='text-5xl text-center mb-5'>
            {sculpture.title}
          </h1>
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
