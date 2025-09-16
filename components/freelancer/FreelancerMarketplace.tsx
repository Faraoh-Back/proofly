// components/freelancer/FreelancerMarketplace.tsx

'use client';

import React, { useState } from 'react';
import { FreelanceProfile } from '../../types/freelancer';
import { FreelancerCard } from './';

interface FreelancerMarketplaceProps {
  freelancers: FreelanceProfile[];
}

export const FreelancerMarketplace: React.FC<FreelancerMarketplaceProps> = ({ freelancers }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'rate' | 'projects'>('rating');

  // Extrair todas as skills únicas
  const allSkills = Array.from(
    new Set(freelancers.flatMap(f => f.topSkills || []))
  ).slice(0, 10); // Limitar a 10 skills mais comuns

  // Filtrar freelancers
  const filteredFreelancers = freelancers.filter(freelancer => {
    const skillMatch = selectedSkills.length === 0 || 
      selectedSkills.some(skill => freelancer.topSkills?.includes(skill));
    
    const availabilityMatch = availabilityFilter === 'all' || 
      freelancer.availabilityStatus === availabilityFilter;

    return skillMatch && availabilityMatch;
  });

  // Ordenar freelancers
  const sortedFreelancers = [...filteredFreelancers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'rate':
        return (a.hourlyRate || 0) - (b.hourlyRate || 0);
      case 'projects':
        return (b.completedProjects || 0) - (a.completedProjects || 0);
      default:
        return 0;
    }
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Marketplace de Freelancers
        </h1>
        <p className="text-gray-400">
          Encontre desenvolvedores Web3 especializados para seu projeto
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white/5 backdrop-blur-md border border-db-cyan/20 rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filtro por Skills */}
          <div>
            <h3 className="text-white font-medium mb-3">Habilidades</h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-db-cyan text-db-dark-blue'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Disponibilidade */}
          <div>
            <h3 className="text-white font-medium mb-3">Disponibilidade</h3>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todos</option>
              <option value="Open to Work">Disponível</option>
              <option value="Booked">Ocupado</option>
              <option value="Not Available">Indisponível</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <h3 className="text-white font-medium mb-3">Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'rate' | 'projects')}
              className="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="rating">Maior Avaliação</option>
              <option value="rate">Menor Taxa</option>
              <option value="projects">Mais Projetos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mb-6">
        <p className="text-gray-400">
          {sortedFreelancers.length} freelancers encontrados
          {selectedSkills.length > 0 && (
            <span className="ml-2">
              • Filtrado por: {selectedSkills.join(', ')}
            </span>
          )}
        </p>
      </div>

      {/* Grid de Freelancers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFreelancers.map(freelancer => (
          <FreelancerCard key={freelancer.id} freelancer={freelancer} />
        ))}
      </div>

      {/* Empty State */}
      {sortedFreelancers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum freelancer encontrado
          </h3>
          <p className="text-gray-400">
            Tente ajustar os filtros para encontrar mais resultados
          </p>
          <button
            onClick={() => {
              setSelectedSkills([]);
              setAvailabilityFilter('all');
            }}
            className="mt-4 px-6 py-2 bg-db-cyan text-db-dark-blue rounded-lg hover:bg-db-cyan/90 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};