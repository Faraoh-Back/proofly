'use client';

import React, { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Stars, Center } from "@react-three/drei";
import { EffectComposer, Bloom, N8AO } from "@react-three/postprocessing";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib"; // Importação correta para o loader

// --- MATERIAIS REUTILIZÁVEIS ---
// (Nenhuma mudança aqui, os materiais continuam os mesmos)
const materials = {
  chrome: new THREE.MeshPhysicalMaterial({
    metalness: 1.0,
    roughness: 0.05,
    color: 0xffffff,
    envMapIntensity: 2.5,
  }),
  gold: new THREE.MeshPhysicalMaterial({
    metalness: 0.95,
    roughness: 0.1,
    color: 0xffd700,
    emissive: 0x996600,
    emissiveIntensity: 0.2,
  }),
  gemstone: new THREE.MeshPhysicalMaterial({
    metalness: 0.5,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 1.5,
    ior: 1.7,
    color: 0xff1493,
    emissive: 0x991144,
  }),
  iridescent: new THREE.MeshPhysicalMaterial({
    metalness: 0.9,
    roughness: 0.0,
    color: 0x00ffaa,
    iridescence: 1.0,
    iridescenceIOR: 1.6,
    iridescenceThicknessRange: [100, 400],
  }),
  neon: new THREE.MeshPhysicalMaterial({
    metalness: 0.2,
    roughness: 0.2,
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1.5,
  }),
};


// --- COMPONENTES DAS BADGES ---
// (Componentes de 1 a 6 permanecem os mesmos)

// 1. Hackathon Badge (Octahedron)
function HackathonBadge() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.x += 0.005;
    ref.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
  });
  return <mesh ref={ref} geometry={new THREE.OctahedronGeometry(1, 0)} material={materials.chrome} />;
}

// 2. Project Badge (Icosahedron)
function ProjectBadge() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.008;
    ref.current.rotation.z += 0.003;
    const pulse = Math.pow(Math.sin(time * 2.5) * 0.5 + 0.5, 2);
    (ref.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse * 0.5 + 0.1;
  });
  return <mesh ref={ref} geometry={new THREE.IcosahedronGeometry(1.2, 0)} material={materials.gold} />;
}

// 3. Certification Badge (Torus)
function CertificationBadge() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.007;
    const hue = (time * 0.1) % 1;
    (ref.current.material as THREE.MeshPhysicalMaterial).color.setHSL(0.9 + hue * 0.1, 1.0, 0.6);
  });
  return <mesh ref={ref} geometry={new THREE.TorusKnotGeometry(0.8, 0.2, 128, 16)} material={materials.gemstone} />;
}

// 4. Contribution Badge (Dodecahedron)
function ContributionBadge() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.009;
    ref.current.rotation.x += 0.004;
    const thickness = 300 + Math.sin(time * 0.5) * 200;
    (ref.current.material as THREE.MeshPhysicalMaterial).iridescenceThicknessRange = [thickness, thickness + 200];
  });
  return <mesh ref={ref} geometry={new THREE.DodecahedronGeometry(1.1, 0)} material={materials.iridescent} />;
}

// 5. Neon Badge (Tetrahedron)
function NeonBadge() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.015;
    ref.current.rotation.x += 0.008;
    const pulse = Math.sin(time * 4) * 0.5 + 0.5;
    (ref.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse * 2.0 + 1.0;
    ref.current.scale.setScalar(1.2 + pulse * 0.05);
  });
  return <mesh ref={ref} geometry={new THREE.TetrahedronGeometry(1.2, 0)} material={materials.neon} />;
}

// 6. Stellar/Special Badge (GLTF Model)
function StellarBadge({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);
  const rainbowMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ metalness: 1.0, roughness: 0.0, envMapIntensity: 2.0 }), []);
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = rainbowMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, rainbowMaterial]);
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.005;
    const hue = (time * 0.1) % 1;
    (rainbowMaterial.color as THREE.Color).setHSL(hue, 0.8, 0.7);
  });
  return <primitive ref={ref} object={scene} scale={2} />;
}

// --- [CORRIGIDO] COMPONENTE PARA BADGE DE SVG 3D ---
function SvgBadge({ iconUrl, rarity }: { iconUrl: string; rarity: string }) {
  const ref = useRef<THREE.Group>(null);
  const [shapes, setShapes] = useState<THREE.Shape[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito para buscar e processar o SVG
  useEffect(() => {
    setLoading(true);
    const loader = new SVGLoader();
    
    fetch(iconUrl, {
      mode: 'cors',
      headers: {
        'Accept': 'image/svg+xml,text/xml,application/xml'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(text => {
        try {
          console.log(`Carregando SVG de: ${iconUrl}`);
          const { paths } = loader.parse(text);
          const svgShapes: THREE.Shape[] = [];
          
          paths.forEach(path => {
            const shapes = path.toShapes(true);
            svgShapes.push(...shapes);
          });
          
          console.log(`SVG parseado: ${svgShapes.length} formas encontradas`);
          
          if (svgShapes.length > 0) {
            setShapes(svgShapes);
          } else {
            console.warn(`Nenhuma forma encontrada no SVG: ${iconUrl}`);
            createFallbackShape();
          }
        } catch (parseError) {
          console.error(`Erro ao parsear SVG de ${iconUrl}:`, parseError);
          createFallbackShape();
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(`Falha ao carregar SVG de: ${iconUrl}`, err);
        createFallbackShape();
        setLoading(false);
      });

    function createFallbackShape() {
      // Criar uma forma de estrela simples como fallback
      const starShape = new THREE.Shape();
      const outerRadius = 50;
      const innerRadius = 25;
      const spikes = 5;
      
      for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) {
          starShape.moveTo(x, y);
        } else {
          starShape.lineTo(x, y);
        }
      }
      starShape.closePath();
      setShapes([starShape]);
    }
  }, [iconUrl]);

  // Cria a geometria 3D a partir das formas do SVG
  const geometry = useMemo(() => {
    if (!shapes || shapes.length === 0) return null;
    
    try {
      return new THREE.ExtrudeGeometry(shapes, {
        steps: 3,
        depth: 15, // Aumentado de 0.3 para 0.8 para mais profundidade
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3,
      });
    } catch (error) {
      console.error('Erro ao criar geometria:', error);
      return null;
    }
  }, [shapes]);
  
  // Seleciona o material com base na raridade
  const material = useMemo(() => {
    const baseConfig = {
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 2.0,
    };

    switch(rarity) {
      case 'legendary':
        return new THREE.MeshPhysicalMaterial({
          ...baseConfig,
          color: 0xffd700,
          emissive: 0x996600,
          emissiveIntensity: 0.3,
        });
      case 'epic':
        return new THREE.MeshPhysicalMaterial({
          ...baseConfig,
          color: 0x9d4edd,
          emissive: 0x5a189a,
          emissiveIntensity: 0.2,
          iridescence: 0.8,
          iridescenceIOR: 1.6,
          iridescenceThicknessRange: [100, 400],
        });
      case 'rare':
        return new THREE.MeshPhysicalMaterial({
          ...baseConfig,
          color: 0x00d4ff,
          emissive: 0x003d66,
          emissiveIntensity: 0.1,
        });
      default:
        return new THREE.MeshPhysicalMaterial({
          ...baseConfig,
          color: 0xcccccc,
          metalness: 0.5,
        });
    }
  }, [rarity]);

  // Animação de rotação e efeitos
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y += 0.012;
    ref.current.rotation.x = Math.sin(time * 0.5) * 0.08;
    
    if (rarity === 'legendary' || rarity === 'epic') {
      const pulse = Math.pow(Math.sin(time * 2.5) * 0.5 + 0.5, 2);
      (material as THREE.MeshPhysicalMaterial).emissiveIntensity = pulse * 0.4 + 0.1;
    }
  });

  // Mostrar loading ou fallback se necessário
  if (loading || !geometry) {
    return (
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshPhysicalMaterial color={0x444444} metalness={0.5} roughness={0.5} />
      </mesh>
    );
  }

  return (
    <group ref={ref}>
      <Center>
        <mesh
          geometry={geometry}
          material={material}
          scale={[0.008, -0.008, 0.008]} // Voltado ao tamanho padrão
          castShadow
          receiveShadow
        />
      </Center>
    </group>
  );
}


// --- COMPONENTE PRINCIPAL ---

interface BadgeProps {
  category: 'hackathon' | 'certification' | 'project' | 'contribution' | 'stellar' | 'neon' | 'custom';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  className?: string;
  size?: 'small' | 'medium' | 'large';
  iconUrl?: string; // Renomeado de imageUrl para mais clareza
  gltfUrl?: string; // Adicionada prop para modelo GLTF
}

export default function RotatingBadge({
  category,
  rarity,
  className = '',
  size = 'small',
  iconUrl,
  gltfUrl
}: BadgeProps) {
  const sizeConfig = useMemo(() => {
    switch (size) {
      case 'medium': return { height: 100, fov: 45 };
      case 'large': return { height: 140, fov: 50 };
      default: return { height: 80, fov: 40 }; // Aumentado de 60 para 80
    }
  }, [size]);

  const rarityConfig = useMemo(() => {
    switch (rarity) {
      case 'legendary': return { ambient: 0.5, directional: 3.0, bloom: 1.5, stars: 0 }; // Removido stars
      case 'epic': return { ambient: 0.4, directional: 2.5, bloom: 1.0, stars: 0 }; // Removido stars
      case 'rare': return { ambient: 0.3, directional: 2.0, bloom: 0.75, stars: 0 };
      default: return { ambient: 0.2, directional: 1.5, bloom: 0.5, stars: 0 };
    }
  }, [rarity]);

  const lightingColor = useMemo(() => { /* ...código sem alteração... */
    switch (category) {
      case 'hackathon': return 0xc0c0c0;
      case 'project': return 0xffd700;
      case 'certification': return 0xff1493;
      case 'contribution': return 0x00ffaa;
      case 'neon': return 0x00ffff;
      case 'stellar': return 0x00d4ff;
      case 'custom': return rarity === 'legendary' ? 0xffd700 : rarity === 'epic' ? 0x9d4edd : 0x00d4ff;
      default: return 0xffffff;
    }
  }, [category, rarity]);

  const renderBadge = () => {
    // Prioridade: se iconUrl for fornecido, renderiza o SVG 3D.
    if (category === 'custom' && iconUrl) {
      return <SvgBadge iconUrl={iconUrl} rarity={rarity} />;
    }
    
    // Se for 'stellar' e tiver um gltfUrl, renderiza o modelo 3D.
    if (category === 'stellar' && gltfUrl) {
        return <StellarBadge url={gltfUrl} />
    }

    // Fallback para as badges procedurais
    switch (category) {
      case 'hackathon': return <HackathonBadge />;
      case 'project': return <ProjectBadge />;
      case 'certification': return <CertificationBadge />;
      case 'contribution': return <ContributionBadge />;
      case 'neon': return <NeonBadge />;
      default: return <HackathonBadge />; // Badge padrão
    }
  };

  return (
    <div className={className} style={{ width: sizeConfig.height, height: sizeConfig.height }}>
      <Canvas shadows camera={{ position: [0, 0, 8], fov: sizeConfig.fov }} style={{ background: "transparent" }}>
        {/* Iluminação e Ambiente (sem alterações) */}
        <ambientLight intensity={rarityConfig.ambient} />
        <directionalLight
          color={lightingColor}
          intensity={rarityConfig.directional}
          position={[3, 3, 3]}
          castShadow
        />
        <directionalLight
          color={0xffffff}
          intensity={rarityConfig.directional * 0.5}
          position={[-3, 2, -3]}
        />
        <Environment preset="apartment" />
        {/* Removido as Stars para limpar o fundo */}

        <Suspense fallback={null}>
          {renderBadge()}
        </Suspense>

        {/* Pós-processamento (sem alterações) */}
        <EffectComposer>
          <Bloom
            intensity={rarityConfig.bloom}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <N8AO aoRadius={0.5} intensity={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}