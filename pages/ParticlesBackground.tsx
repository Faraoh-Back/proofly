// components/ParticlesBackground.tsx
"use client"; // Necessário para interatividade do lado do cliente

import React from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Importa a versão slim

const ParticlesBackground = () => {
  const [ init, setInit ] = React.useState(false);

  // Inicia o motor de partículas uma única vez
  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log("Particles loaded", container);
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: '#0a101e', // Cor de fundo do canvas (nosso azul escuro)
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse', // Efeito ao passar o mouse
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#00f0ff', // Cor das partículas (nosso ciano)
          },
          links: {
            color: '#ffffff', // Cor das linhas que conectam as partículas
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 0.5, // Velocidade sutil
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80, // Quantidade de partículas
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 }, // Tamanhos variados
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;