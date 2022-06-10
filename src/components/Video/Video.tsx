import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  video: string
}

const Video = ({ video }: Props) => {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<
    | (HTMLVideoElement & {
        webkitRequestFullscreen?: any
        webkitEnterFullScreen?: any
      })
    | null
  >(null)

  return (
    <div className='grid place-content-center h-full pb-24'>
      <div className='absolute left-0 top-24 w-full'>
        <ReactPlayer
          width='100%'
          url={video}
          config={{
            vimeo: {
              playerOptions: {
                autoplay: true,
              },
            },
          }}
          controls
          loop
        />
      </div>

      {/* <div className='h-full mt-10'>
        <button
          onClick={enterFullScreen}
          className='border-white border-2 px-3 py-2 rounded-lg float-right mr-8'
        >
          <h3 className='text-white text-base'>
            enter fullscreen mode
          </h3>
        </button>
        {!playing && (
          <button
            onClick={play}
            className='border-white border-2 px-3 py-2 rounded-lg float-right mr-8'
          >
            <h3 className='text-white text-base'>play</h3>
          </button>
        )}
        {playing && (
          <button
            onClick={pause}
            className='border-white border-2 px-3 py-2 rounded-lg float-right mr-8'
          >
            <h3 className='text-white text-base'>pause</h3>
          </button>
        )}
      </div> */}
    </div>
  )
}

export default Video
