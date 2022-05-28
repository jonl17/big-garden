import React, { Suspense } from 'react'
import {
  Canvas,
  extend,
  useLoader,
} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

extend({ OrbitControls })

type ModelProps = {
  model: {
    path: string
  }
}

const Model = ({ model }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, model.path)

  return <primitive object={gltf.scene} />
}

const ThreeDeeEngine = () => {
  const isBrowser = typeof window !== 'undefined'

  if (!isBrowser) return null

  return (
    <Canvas
      className='three-js-canvas'
      frameloop='demand'
      camera={{ position: [0, 1.1, 2.35], fov: 25 }}
    >
      <ambientLight intensity={0.75} />
      <spotLight
        position={[0, -2, 1]}
        penumbra={1}
        castShadow
      />
      <Suspense fallback={null}>
        <Model model={{ path: '/models/poly.glb' }} />
        <OrbitControls
          enableZoom={false}
          autoRotateSpeed={4}
          autoRotate={true}
        />
      </Suspense>
    </Canvas>
  )
}

export default ThreeDeeEngine