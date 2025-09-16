// components/profile/DeveloperProfilePage.tsx
// Exemplo de uso da FreelancerSection

import React from 'react';
import { FreelancerSection } from './FreelancerSection';
import { mockFreelanceProfile } from '../../mocks/freelanceData';

export const DeveloperProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-db-dark-blue">
      {/* Outras seções do perfil (badges, info básica, etc.) */}
      
      {/* Seção de Freelancer */}
      <FreelancerSection profile={mockFreelanceProfile} />
      
      {/* Outras seções do perfil */}
    </div>
  );
};