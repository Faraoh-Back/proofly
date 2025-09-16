// components/freelancer/ServicesOffered.tsx

import React from 'react';
import { FreelanceService } from '../../types/freelancer';

interface ServicesOfferedProps {
  services: FreelanceService[];
}

export const ServicesOffered: React.FC<ServicesOfferedProps> = ({ services }) => {
  // Ícones genéricos para diferentes tipos de serviços
  const getServiceIcon = (title: string) => {
    const iconMap: { [key: string]: string } = {
      'Smart Contract': '🔒',
      'DeFi': '💰',
      'Web3': '🌐',
      'NFT': '🎨',
      'Blockchain': '⛓️',
      'Frontend': '💻',
      'Backend': '⚙️',
      'Audit': '🔍'
    };

    // Procura por palavras-chave no título
    for (const [keyword, icon] of Object.entries(iconMap)) {
      if (title.includes(keyword)) {
        return icon;
      }
    }
    
    return '🚀'; // Ícone padrão
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Serviços Oferecidos
        </h3>
        <p className="text-gray-400 text-sm">
          Especialidades e áreas de atuação
        </p>
      </div>

      {/* Lista de Serviços */}
      <div className="space-y-4">
        {services.map((service) => (
          <div 
            key={service.id}
            className="group p-4 rounded-xl bg-white/5 border border-gray-700/50 hover:border-db-cyan/30 transition-all duration-200 hover:bg-white/10"
          >
            <div className="flex items-start space-x-3">
              {/* Ícone do Serviço */}
              <div className="flex-shrink-0 w-10 h-10 bg-db-cyan/20 rounded-lg flex items-center justify-center text-lg group-hover:bg-db-cyan/30 transition-colors">
                {getServiceIcon(service.title)}
              </div>
              
              {/* Conteúdo do Serviço */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-base mb-1 group-hover:text-db-cyan transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer com Estatísticas */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {services.length} serviços disponíveis
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
};