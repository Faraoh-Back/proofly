// components/freelancer/FreelancerCard.tsx

import React from 'react';
import { FreelanceProfile } from '../../types/freelancer';
import Image from 'next/image';

interface FreelancerCardProps {
  freelancer: FreelanceProfile;
}

export const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  // Configurações visuais baseadas no status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Open to Work':
        return { color: 'bg-green-500', text: 'Disponível' };
      case 'Booked':
        return { color: 'bg-yellow-500', text: 'Ocupado' };
      case 'Not Available':
        return { color: 'bg-red-500', text: 'Indisponível' };
      default:
        return { color: 'bg-gray-500', text: 'N/A' };
    }
  };

  const statusConfig = getStatusConfig(freelancer.availabilityStatus);

  return (
    <div className="group bg-white/5 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-db-cyan/30 transition-all duration-300 hover:transform hover:scale-105">
      {/* Header do Card */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-db-cyan/30 group-hover:ring-db-cyan transition-colors flex-shrink-0">
          {freelancer.developerAvatar ? (
            <Image
              src={freelancer.developerAvatar}
              alt={freelancer.developerName || 'Freelancer'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-db-cyan/20 flex items-center justify-center text-2xl">
              👤
            </div>
          )}
        </div>

        {/* Info Principal */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-db-cyan transition-colors truncate">
            {freelancer.developerName || 'Freelancer'}
          </h3>
          <p className="text-sm text-gray-400 mb-2 truncate">
            {freelancer.headline || 'Desenvolvedor Web3'}
          </p>
          
          {/* Status e Localização */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${statusConfig.color}`}></div>
              <span className="text-gray-400">{statusConfig.text}</span>
            </div>
            {freelancer.location && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">{freelancer.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Avaliação */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-medium text-white">{freelancer.rating || 'N/A'}</span>
          </div>
          <p className="text-xs text-gray-400">Avaliação</p>
        </div>

        {/* Projetos */}
        <div className="text-center">
          <p className="text-sm font-medium text-white mb-1">{freelancer.completedProjects || 0}</p>
          <p className="text-xs text-gray-400">Projetos</p>
        </div>

        {/* Taxa */}
        <div className="text-center">
          <p className="text-sm font-medium text-db-cyan mb-1">
            ${freelancer.hourlyRate || '---'}/h
          </p>
          <p className="text-xs text-gray-400">Taxa</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">Principais Skills</p>
        <div className="flex flex-wrap gap-1">
          {(freelancer.topSkills || []).slice(0, 4).map(skill => (
            <span
              key={skill}
              className="px-2 py-1 bg-db-cyan/20 text-db-cyan text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {(freelancer.topSkills || []).length > 4 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
              +{(freelancer.topSkills || []).length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Serviços Principais */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Serviços</p>
        <div className="space-y-1">
          {freelancer.services.slice(0, 2).map(service => (
            <p key={service.id} className="text-sm text-gray-300 truncate">
              • {service.title}
            </p>
          ))}
          {freelancer.services.length > 2 && (
            <p className="text-xs text-gray-400">
              +{freelancer.services.length - 2} mais serviços
            </p>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-2">
        <button className="w-full py-2 bg-db-cyan text-db-dark-blue font-semibold rounded-lg hover:bg-db-cyan/90 transition-colors">
          Ver Perfil Completo
        </button>
        
        {freelancer.availabilityStatus === 'Open to Work' && (
          <button className="w-full py-2 border border-db-cyan text-db-cyan font-medium rounded-lg hover:bg-db-cyan/10 transition-colors">
            Enviar Proposta
          </button>
        )}
      </div>

      {/* Tempo de Resposta */}
      {freelancer.responseTime && (
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 text-center">
            Responde em ~{freelancer.responseTime}
          </p>
        </div>
      )}
    </div>
  );
};