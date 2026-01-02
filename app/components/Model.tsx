import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { JSX, useRef } from 'react'
import * as THREE from 'three'

export default function Model(
  props: JSX.IntrinsicElements['group']
) {
  const groupRef = useRef<THREE.Group>(null!)
  const { scene } = useGLTF('/models/avatar_safety_uniform.glb')

  // contoh animasi rotasi
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} scale={0.018}/>
    </group>
  )
}

useGLTF.preload('/models/avatar_safety_uniform.glb')