// components/freelancer/Portfolio.tsx

import React from 'react';
import { PortfolioProject } from '../../types/freelancer';
import { ProjectCard } from './ProjectCard';

interface PortfolioProps {
  projects: PortfolioProject[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Projetos em Destaque
        </h3>
        <p className="text-gray-400">
          Uma seleção dos meus trabalhos mais significativos e impactantes
        </p>
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Footer com Estatísticas */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-db-cyan">{projects.length}</p>
              <p className="text-sm text-gray-400">Projetos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-db-cyan">
                {projects.reduce((total, project) => total + project.relatedBadges.length, 0)}
              </p>
              <p className="text-sm text-gray-400">Badges Conquistados</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-db-cyan">100%</p>
              <p className="text-sm text-gray-400">Taxa de Sucesso</p>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-db-cyan/20 hover:bg-db-cyan/30 text-db-cyan border border-db-cyan/30 rounded-lg transition-all duration-200 hover:scale-105">
            Ver Todos os Projetos
          </button>
        </div>
      </div>
    </div>
  );
};