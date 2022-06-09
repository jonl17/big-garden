import React, { useRef, useState } from 'react'

type Props = {
  video: {
    url: string
  }
}

const Video = ({ video }: Props) => {
  const [playing, setPlaying] = useState(true)
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

  const clickHandler = () => {
    if (playing) pause()
    else play()
  }

  return (
    <div className='grid place-content-center h-full pb-24'>
      <button onClick={clickHandler}>
        <video
          className='w-full lg:h-full'
          autoPlay
          muted
          loop
          ref={videoRef}
          playsInline
        >
          <source type='video/mp4' src={video.url} />
        </video>
      </button>
      <div className='h-full mt-10'>
        <button
          onClick={enterFullScreen}
          className='border-white border-2 px-3 py-2 rounded-lg float-right mr-8'
        >
          <h3 className='text-white text-base'>
            enter fullscreen mode
          </h3>
        </button>
      </div>
    </div>
  )
}

export default Video
