import React, { useRef, useState } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  video: {
    url: string
  }
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

  const enterFullScreen = () => {
    const { current } = videoRef
    if (current) {
      if (current.requestFullscreen) {
        current.requestFullscreen()
      } else if (current.webkitRequestFullscreen) {
        /* Safari */
        current.webkitRequestFullscreen()
      } else if (current.webkitEnterFullScreen) {
        // Toggle fullscreen in Safari for iPad
        current.webkitEnterFullScreen()
      }
    }
  }

  const pause = () => {
    const { current } = videoRef
    if (current) {
      current.pause()
      setPlaying(false)
    }
  }
  const play = () => {
    const { current } = videoRef
    if (current) {
      current.play()
      setPlaying(true)
    }
  }

  const TEST_VIDEO_URL =
    'https://prismic-io.s3.amazonaws.com/sculpture-hunt/15c38b5a-a969-45ea-95ec-1a66f6336a28_blombifast.mp4'

  return (
    <div className='grid place-content-center h-full pb-24'>
      <div className='absolute left-0 top-24 w-full'>
        <ReactPlayer
          width='100%'
          url='https://vimeo.com/718672009'
          config={{
            vimeo: { playerOptions: { autoplay: true } },
          }}
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
