import React, { Suspense } from 'react'
import {
  Canvas,
  extend,
  useLoader,
} from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import cn from 'classnames'
import * as THREE from 'three'

extend({ OrbitControls })

type PanoramaProps = {
  path: string
}

const Panorama = ({ path }: PanoramaProps) => {
  const map = useLoader(THREE.TextureLoader, path ?? '')
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereBufferGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={map}
        side={THREE.BackSide}
        opacity={1}
      />
    </mesh>
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
  panoramaPath,
}: IThreeDeeEngineProps) => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  console.log('loading canvas?')

  return (
    <Canvas
      className={cn('three-js-canvas', {
        // block: modelPath,
        // hidden: !modelPath,
      })}
      frameloop='demand'
      camera={{ position: [300, 300, -20], fov: 25 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.75} />
        {panoramaPath && <Panorama path={panoramaPath} />}
        {modelPath && <Model model={{ path: modelPath }} />}

        <OrbitControls
          enableZoom={false}
          autoRotateSpeed={4}
          autoRotate={false}
        />
      </Suspense>
    </Canvas>
  )
}

export default ThreeDeeEngine
