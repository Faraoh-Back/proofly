// components/freelancer/AvailabilityCard.tsx

import React from 'react';
import { AvailabilityStatus } from '../../types/freelancer';

interface AvailabilityCardProps {
  status: AvailabilityStatus;
  rate?: number;
}

export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ status, rate }) => {
  // Configurações visuais baseadas no status
  const getStatusConfig = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Open to Work':
        return {
          color: 'bg-green-500',
          text: 'Disponível para Projetos',
          description: 'Aceitando novos projetos e oportunidades',
          buttonText: 'Enviar Proposta',
          buttonStyle: 'bg-db-cyan hover:bg-db-cyan/80 text-db-dark-blue'
        };
      case 'Booked':
        return {
          color: 'bg-yellow-500',
          text: 'Ocupado',
          description: 'Trabalhando em projetos atuais',
          buttonText: 'Entrar na Fila',
          buttonStyle: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      case 'Not Available':
        return {
          color: 'bg-red-500',
          text: 'Indisponível',
          description: 'Não aceitando novos projetos no momento',
          buttonText: 'Notificar Disponibilidade',
          buttonStyle: 'bg-gray-600 hover:bg-gray-700 text-white'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-6 h-full">
      {/* Header do Card */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {/* Indicador de Status */}
          <div className={`w-4 h-4 rounded-full ${config.color} animate-pulse`}></div>
          <h3 className="text-xl font-semibold text-white">
            {config.text}
          </h3>
        </div>
      </div>

      {/* Descrição */}
      <p className="text-gray-300 mb-6 leading-relaxed">
        {config.description}
      </p>

      {/* Taxa por Hora */}
      {rate && (
        <div className="mb-6">
          <div className="bg-db-cyan/10 border border-db-cyan/30 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">Taxa por hora</p>
            <p className="text-2xl font-bold text-db-cyan">
              A partir de ${rate}
              <span className="text-base text-gray-400 ml-1">/hora</span>
            </p>
          </div>
        </div>
      )}

      {/* Botão de Ação */}
      <button 
        className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${config.buttonStyle}`}
      >
        {config.buttonText}
      </button>

      {/* Informações Adicionais */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Tempo de resposta</span>
          <span className="text-db-cyan">~2 horas</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Projetos concluídos</span>
          <span className="text-db-cyan">24+</span>
        </div>
      </div>
    </div>
  );
};