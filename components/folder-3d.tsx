"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function Folder() {
  const folderRef = useRef<THREE.Group>(null)
  const documentsRef = useRef<THREE.Group>(null)
  const magnifierRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle floating animation for the entire folder
    if (folderRef.current) {
      folderRef.current.position.y = Math.sin(time * 0.5) * 0.2
      folderRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
    }

    // Subtle document animation
    if (documentsRef.current) {
      documentsRef.current.rotation.z = Math.sin(time * 0.8) * 0.05
    }

    // Magnifier animation
    if (magnifierRef.current) {
      magnifierRef.current.position.y = Math.sin(time * 1.2) * 0.1
      magnifierRef.current.rotation.z = Math.sin(time * 0.6) * 0.1
    }
  })

  return (
    <group ref={folderRef} position={[0, 0, 0]}>
      {/* Main Folder Body */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 2.5]} />
        <meshStandardMaterial color="#2196F3" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Folder Tab */}
      <mesh position={[-0.8, 0.5, 0.5]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.5]} />
        <meshStandardMaterial color="#1976D2" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Documents Group */}
      <group ref={documentsRef} position={[0.3, 0.2, 1]}>
        {/* Document 1 - Teal */}
        <mesh position={[-0.3, 0, 0.2]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[1.2, 1.6, 0.05]} />
          <meshStandardMaterial color="#4DD0E1" roughness={0.4} />
        </mesh>

        {/* Document 2 - Light Blue with lines */}
        <mesh position={[0.2, 0.1, 0.3]} rotation={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[1.2, 1.6, 0.05]} />
          <meshStandardMaterial color="#E3F2FD" roughness={0.4} />
        </mesh>

        {/* Document lines decoration */}
        <mesh position={[0.2, 0.3, 0.32]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshStandardMaterial color="#90CAF9" />
        </mesh>
        <mesh position={[0.2, 0.15, 0.32]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshStandardMaterial color="#90CAF9" />
        </mesh>
        <mesh position={[0.2, 0, 0.32]}>
          <boxGeometry args={[0.8, 0.05, 0.01]} />
          <meshStandardMaterial color="#90CAF9" />
        </mesh>

        {/* Small image placeholder on document */}
        <mesh position={[0.2, 0.7, 0.32]}>
          <boxGeometry args={[0.5, 0.4, 0.01]} />
          <meshStandardMaterial color="#FF7474" />
        </mesh>
      </group>

      {/* Magnifying Glass */}
      <group ref={magnifierRef} position={[1.2, -0.8, 1.5]}>
        {/* Handle */}
        <mesh position={[0.3, -0.5, 0]} rotation={[0, 0, -0.5]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
          <meshStandardMaterial color="#FFC107" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Glass rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.4, 0.08, 16, 32]} />
          <meshStandardMaterial color="#9C27B0" roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Glass lens */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial color="#E1F5FE" transparent opacity={0.3} roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Heart icon on folder */}
      <mesh position={[-0.5, 0, 1.3]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF5252" roughness={0.3} />
      </mesh>
      <mesh position={[-0.2, 0, 1.3]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF5252" roughness={0.3} />
      </mesh>
      <mesh position={[-0.35, -0.2, 1.3]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color="#FF5252" roughness={0.3} />
      </mesh>
    </group>
  )
}

export function Folder3D() {
  return (
    <div className="w-full h-[400px] lg:h-[500px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#fa7275" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#6295f2" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* 3D Folder */}
        <Folder />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
