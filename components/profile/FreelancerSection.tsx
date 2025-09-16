// components/profile/FreelancerSection.tsx

import React from 'react';
import { FreelanceProfile } from '../../types/freelancer';
import { AvailabilityCard, ServicesOffered, Portfolio, Testimonials } from '../freelancer';

interface FreelancerSectionProps {
  profile: FreelanceProfile;
}

export const FreelancerSection: React.FC<FreelancerSectionProps> = ({ profile }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Título da Seção */}
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Painel de Freelancer
      </h2>

      {/* Layout Principal */}
      <div className="space-y-8">
        {/* Grid Superior - Disponibilidade e Serviços */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AvailabilityCard 
            status={profile.availabilityStatus} 
            rate={profile.hourlyRate} 
          />
          <ServicesOffered services={profile.services} />
        </div>

        {/* Portfólio - Largura Total */}
        <Portfolio projects={profile.portfolio} />

        {/* Depoimentos - Largura Total */}
        <Testimonials testimonials={profile.testimonials} />
      </div>
    </div>
  );
};