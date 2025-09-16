// components/freelancer/FreelancerProfile.tsx

import React from 'react';
import { FreelanceProfile } from '../../types/freelancer';
import { AvailabilityCard, ServicesOffered, Portfolio, Testimonials } from './';

interface FreelancerProfileProps {
  profile: FreelanceProfile;
  isEditable?: boolean;
}

export const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ 
  profile, 
  isEditable = false 
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Título da Seção */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          {isEditable ? 'Meu Perfil de Freelancer' : 'Perfil do Freelancer'}
        </h2>
        <p className="text-gray-400">
          {isEditable 
            ? 'Gerencie seus serviços, portfólio e disponibilidade'
            : 'Informações detalhadas sobre os serviços oferecidos'
          }
        </p>
      </div>

      {/* Botão de Edição (apenas para owner) */}
      {isEditable && (
        <div className="mb-6 flex justify-end">
          <button className="px-6 py-2 bg-db-cyan text-db-dark-blue font-semibold rounded-lg hover:bg-db-cyan/90 transition-colors">
            Editar Perfil
          </button>
        </div>
      )}

      {/* Layout Principal */}
      <div className="space-y-8">
        {/* Grid Superior - Disponibilidade e Serviços */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AvailabilityCard 
            status={profile.availabilityStatus} 
            rate={profile.hourlyRate}
          />
          <ServicesOffered 
            services={profile.services}
          />
        </div>

        {/* Portfólio - Largura Total */}
        <Portfolio 
          projects={profile.portfolio}
        />

        {/* Depoimentos - Largura Total */}
        <Testimonials 
          testimonials={profile.testimonials}
        />
      </div>

      {/* Call to Action para criar perfil (se vazio) */}
      {isEditable && profile.services.length === 0 && (
        <div className="mt-12 text-center bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-8">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Comece Seu Perfil de Freelancer
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Configure seus serviços, portfólio e disponibilidade para começar a receber propostas de projetos Web3 incríveis.
          </p>
          <button className="px-8 py-3 bg-db-cyan text-db-dark-blue font-semibold rounded-xl hover:bg-db-cyan/90 transition-all duration-200 transform hover:scale-105">
            Configurar Perfil
          </button>
        </div>
      )}
    </div>
  );
};