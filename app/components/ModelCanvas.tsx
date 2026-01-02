"use client"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from './Model'

export default function ModelViewer() {
  return (
    <Canvas
      camera={{ position: [3, 2, 5] }}
      style={{ width: '100%', height: '100vh', marginTop: '30em' }}
    >
      {/* lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* model */}
      <Model />

      {/* helper */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        enableDamping
        dampingFactor={0.08}
      />
      <Environment preset="sunset" />
    </Canvas>
  )
}
