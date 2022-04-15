import React from 'react'
import { useModal } from 'src/store/modal'

const Modal = () => {
  const { closeModal, sculpture } = useModal()

  return (
    <div className='fixed top-0 left-0 w-full h-full p-5 lg:p-24 bg-white'>
      <button
        onClick={() => closeModal()}
        className='border px-3'
      >
        <h1 className='text-2xl'>LOKA</h1>
      </button>
      {sculpture && (
        <div className='lg:p-10 h-full grid place-content-center'>
          <h1 className='text-5xl text-center mb-5'>
            {sculpture.title}
          </h1>
          {sculpture.video && (
            <video className='h-full w-full' autoPlay muted>
              <source src={sculpture.video.url} />
            </video>
          )}
        </div>
      )}
    </div>
  )
}

export default Modal
