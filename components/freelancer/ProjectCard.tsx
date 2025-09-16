// components/freelancer/ProjectCard.tsx

import React from 'react';
import { PortfolioProject } from '../../types/freelancer';
import Image from 'next/image';

interface ProjectCardProps {
  project: PortfolioProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Função para obter cor baseada na raridade do badge
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'border-yellow-400 bg-yellow-400/10';
      case 'epic':
        return 'border-purple-400 bg-purple-400/10';
      case 'rare':
        return 'border-blue-400 bg-blue-400/10';
      default:
        return 'border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden hover:border-db-cyan/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
      {/* Imagem do Projeto */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay com Link */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-db-cyan text-db-dark-blue font-semibold rounded-lg hover:bg-db-cyan/90 transition-colors"
          >
            Ver Projeto
          </a>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        {/* Título */}
        <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-db-cyan transition-colors">
          {project.title}
        </h4>

        {/* Descrição */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Seção de Badges */}
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-300 mb-3">
            Badges Conquistados Neste Projeto
          </h5>
          
          <div className="flex flex-wrap gap-2">
            {project.relatedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`group/badge relative flex items-center space-x-2 px-3 py-2 rounded-lg border ${getRarityColor(badge.rarity)} hover:scale-105 transition-all duration-200`}
              >
                {/* Ícone do Badge */}
                <div className="w-6 h-6 relative">
                  <Image
                    src={badge.iconUrl}
                    alt={badge.name}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Nome do Badge */}
                <span className="text-xs font-medium text-white">
                  {badge.name}
                </span>

                {/* Tooltip com descrição */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {badge.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer do Card */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Projeto Concluído</span>
          </div>
          
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-db-cyan hover:text-db-cyan/80 text-sm font-medium transition-colors"
          >
            Ver Detalhes →
          </a>
        </div>
      </div>
    </div>
  );
};