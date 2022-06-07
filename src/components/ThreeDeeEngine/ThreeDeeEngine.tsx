import React, { Suspense } from 'react'
import {
  Canvas,
  extend,
  useLoader,
} from '@react-three/fiber'
import {
  Html,
  OrbitControls,
  useProgress,
} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import cn from 'classnames'
import * as THREE from 'three'

extend({ OrbitControls })

const Loading = () => {
  const prog = useProgress()

  return (
    <Html className='text-center'>
      <p className='text-5xl text-center'>{`${prog.progress}%`}</p>
    </Html>
  )
}

type ModelProps = {
  model: {
    path: string
  }
}

const Model = ({ model }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, model.path)

  return <primitive object={gltf.scene} />
}

interface IThreeDeeEngineProps {
  modelPath?: string
  panoramaPath?: string
}

const ThreeDeeEngine = ({
  modelPath,
}: IThreeDeeEngineProps) => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  return (
    <Canvas
      className={cn('three-js-canvas', {
        block: modelPath,
        hidden: !modelPath,
      })}
      frameloop='demand'
      camera={{ position: [5, 5, 0], fov: 25 }}
    >
      <Suspense fallback={<Loading />}>
        <ambientLight intensity={1} />
        {modelPath && <Model model={{ path: modelPath }} />}

        <OrbitControls
          enableZoom={false}
          autoRotateSpeed={4}
          autoRotate={true}
          maxPolarAngle={1.1}
        />
      </Suspense>
    </Canvas>
  )
}

export default ThreeDeeEngine
