// components/ui/HirePage/HirePage.tsx
'use client';

import { useState, useEffect } from 'react';
import { Users, Award, Code, Star } from 'lucide-react';
import { DeveloperProfile } from '../../../types/hire';
import { getPlatformStats, availableSkills } from '../../../mocks/hireMocks';
import SearchFilters, { SearchFilters as SearchFiltersType } from '../../hire/SearchFilters';
import ResultsGrid from '../../hire/ResultsGrid';

export const HirePage: React.FC = () => {
  const [developers, setDevelopers] = useState<DeveloperProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType | null>(null);

  const platformStats = getPlatformStats();

  // Function to call the API
  const searchTalents = async (filters: SearchFiltersType) => {
    setIsLoading(true);
    setSearchFilters(filters);

    try {
      const searchParams = new URLSearchParams();
      
      if (filters.query) searchParams.append('query', filters.query);
      if (filters.skills.length > 0) searchParams.append('skills', filters.skills.join(','));
      if (filters.availability.length > 0) searchParams.append('availability', filters.availability.join(','));
      if (filters.sortBy) searchParams.append('sortBy', filters.sortBy);
      searchParams.append('minExperience', filters.experience.min.toString());
      searchParams.append('maxExperience', filters.experience.max.toString());

      const response = await fetch(`/api/search/search-talent?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to search talents');
      }

      const data = await response.json();
      setDevelopers(data.developers || []);
    } catch (error) {
      console.error('Error searching talents:', error);
      setDevelopers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    // Default search on component mount
    searchTalents({
      query: '',
      skills: [],
      availability: ['available'],
      experience: { min: 0, max: 10 },
      sortBy: 'relevance' as any
    });
  }, []);

  const handleContactDeveloper = (developer: DeveloperProfile) => {
    console.log('Contact developer:', developer.user_name);
    // Here you could implement a contact modal or redirect to a contact page
  };

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-db-dark-blue">
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-wider mb-2">HIRE TALENT</h1>
          <p className="text-gray-300 mb-6">
            Find and hire verified Web3 developers with proven on-chain reputation
          </p>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-4 text-center">
              <Users className="mx-auto mb-2 text-db-cyan" size={24} />
              <div className="text-2xl font-bold">{platformStats.totalDevelopers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Developers</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-4 text-center">
              <Award className="mx-auto mb-2 text-db-cyan" size={24} />
              <div className="text-2xl font-bold">{platformStats.totalBadges.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Badges Earned</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-4 text-center">
              <Code className="mx-auto mb-2 text-db-cyan" size={24} />
              <div className="text-2xl font-bold">{platformStats.totalHackathons}</div>
              <div className="text-sm text-gray-400">Hackathons</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-4 text-center">
              <Star className="mx-auto mb-2 text-db-cyan" size={24} />
              <div className="text-2xl font-bold">{platformStats.averageRating}</div>
              <div className="text-sm text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          onSearch={searchTalents}
          availableSkills={availableSkills}
          isLoading={isLoading}
        />

        {/* Results */}
        <ResultsGrid
          developers={developers}
          isLoading={isLoading}
          searchedSkills={searchFilters?.skills || []}
          onContactDeveloper={handleContactDeveloper}
        />
      </div>
    </div>
  );
};