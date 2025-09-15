'use client';


import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 50 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) pointsRef.current.rotation.y += 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={0x9f9f9f} size={0.1} sizeAttenuation />
    </points>
  );
}

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const ref = useRef<THREE.Group>(null);
  
    useEffect(() => {
      // Force all meshes to be white - more aggressive approach
      scene.traverse((child: any) => {
        if (child.isMesh) {
          // Create a completely new white material
          child.material = new THREE.MeshStandardMaterial({
            color: 0x3a7ca5,
            metalness: 0.8,
            roughness: 0.3,
            emissive: 0x1f1f1f,
          });
          
          // Remove any textures that might override the color
          child.material.map = null;
          child.material.normalMap = null;
          child.material.roughnessMap = null;
          child.material.metalnessMap = null;
          child.material.aoMap = null;
          child.material.emissiveMap = null;
          
          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [scene]);
  
    useFrame(() => {
      if (ref.current) ref.current.rotation.y += 0.01;
    });
  
    return <primitive ref={ref} object={scene} scale={5} />;
  }

export default function StellarLogo({ url }: { url: string }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 15], fov: 50 }}
      style={{ background: "#0a101e", height: 800, width: '100%' }}
    >
      {/* Lights */}
      <ambientLight intensity={1} />
      <directionalLight
        color={0xffffff} // cool divine tech light
        intensity={2}
        position={[5, 5, 5]}
        castShadow
      />
      <spotLight
        color={0x1a2c42}
        intensity={1.5}
        position={[-5, 5, -5]}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
      <pointLight color={0xdaa520} intensity={0.5} position={[0, 5, 0]} />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>

      <Particles count={100} />

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
