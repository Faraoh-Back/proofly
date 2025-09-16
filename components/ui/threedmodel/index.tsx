'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
// ALTERADO: Importando SelectiveBloom e Select
import { EffectComposer, SelectiveBloom, Select } from '@react-three/postprocessing';
import * as THREE from 'three';

// Componente Particles (sem alterações)
function Particles({ count = 200 }) {
  // ... código idêntico
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const radius = 5;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
    }
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
      <pointsMaterial 
        color="#00f0ff" 
        size={0.05} 
        sizeAttenuation 
        transparent 
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Componente Model (sem alterações)
function Model({ url }: { url: string }) {
    // ... código idêntico
    const { scene } = useGLTF(url);
    const ref = useRef<THREE.Group>(null);
  
    useEffect(() => {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x00f0ff,
            metalness: 0.9,
            roughness: 0.05,
            iridescence: 1,
            iridescenceIOR: 1.7,
            iridescenceThicknessRange: [100, 800],
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: 0x00f0ff, // A cor emissiva é crucial para o SelectiveBloom
            emissiveIntensity: 0.5, // Aumentamos um pouco a emissão para o efeito
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }, [scene]);
  
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.y += delta * 0.2;
      }
    });
  
    return <primitive ref={ref} object={scene} scale={5} />;
}


function Scene({ url }: { url: string }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight color={0x00f0ff} intensity={3} position={[5, 5, 5]} castShadow />

        {/* NOVO: Envolvemos o modelo com <Select> para marcá-lo para o brilho */}
        <Select enabled>
          <Model url={url} />
        </Select>
        <Environment preset="city" />

      <Particles count={150} />
    </>
  );
}

export default function StellarLogo({ url }: { url: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2, 10], fov: 60 }}
      gl={{ alpha: true }}
      style={{ 
        background: 'transparent', 
        height: 500,
        width: '100%',
      }}
    >
      <Scene url={url} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
      />
      
      {/* ALTERADO: Trocamos Bloom por SelectiveBloom */}
      <EffectComposer autoClear={false}>
        <SelectiveBloom
            intensity={2.0}
            luminanceThreshold={0.01}
            luminanceSmoothing={0.025}
            mipmapBlur
            radius={0.7}
        />
      </EffectComposer>
    </Canvas>
  );
}