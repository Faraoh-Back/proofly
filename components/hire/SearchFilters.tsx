'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { HireFilters, SortOption } from '../../types/hire';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  availableSkills: string[];
  isLoading?: boolean;
}

export interface SearchFilters {
  query: string;
  skills: string[];
  availability: string[];
  experience: { min: number; max: number };
  sortBy: SortOption;
}

export default function SearchFilters({ onSearch, availableSkills, isLoading }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['available']);
  const [experience, setExperience] = useState({ min: 0, max: 10 });
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RELEVANCE);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      skills: selectedSkills,
      availability: selectedAvailability,
      experience,
      sortBy
    });
  };

  const toggleSkillFilter = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
  };

  const toggleAvailabilityFilter = (availability: string) => {
    const newAvailability = selectedAvailability.includes(availability)
      ? selectedAvailability.filter(a => a !== availability)
      : [...selectedAvailability, availability];
    setSelectedAvailability(newAvailability);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'unavailable': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Auto-search quando filtros mudam
  React.useEffect(() => {
    handleSearch();
  }, [selectedSkills, selectedAvailability, experience, sortBy]);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, skills, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-db-cyan transition-colors"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-3 bg-db-cyan hover:bg-db-blue-light text-db-dark-blue font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-db-cyan transition-colors"
        >
          <option value={SortOption.RELEVANCE}>Most Relevant</option>
          <option value={SortOption.BADGES_COUNT}>Most Badges</option>
          <option value={SortOption.EXPERIENCE}>Most Experience</option>
          <option value={SortOption.RATING}>Highest Rated</option>
        </select>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg border transition-colors flex items-center gap-2 ${
            showFilters ? 'bg-db-cyan text-db-dark-blue border-db-cyan' : 'bg-white/5 border-gray-600 hover:border-db-cyan'
          }`}
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skills Filter */}
            <div>
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {availableSkills.slice(0, 12).map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkillFilter(skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-db-cyan text-db-dark-blue'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <div className="mt-2">
                  <button
                    onClick={() => setSelectedSkills([])}
                    className="text-sm text-db-cyan hover:underline"
                  >
                    Clear skills ({selectedSkills.length})
                  </button>
                </div>
              )}
            </div>

            {/* Availability Filter */}
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <div className="space-y-2">
                {(['available', 'busy', 'unavailable'] as const).map(status => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAvailability.includes(status)}
                      onChange={() => toggleAvailabilityFilter(status)}
                      className="rounded"
                    />
                    <span className={`capitalize ${getAvailabilityColor(status)}`}>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <h3 className="font-semibold mb-3">Experience (Years)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Min: {experience.min}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={experience.min}
                    onChange={(e) => setExperience(prev => ({
                      ...prev,
                      min: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Max: {experience.max}</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={experience.max}
                    onChange={(e) => setExperience(prev => ({
                      ...prev,
                      max: parseInt(e.target.value)
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {(selectedSkills.length > 0 || selectedAvailability.length < 3 || experience.min > 0 || experience.max < 10) && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-400">Active filters:</span>
          {selectedSkills.map(skill => (
            <span key={skill} className="px-2 py-1 bg-db-cyan/20 text-db-cyan rounded text-sm">
              {skill}
            </span>
          ))}
          {selectedAvailability.length < 3 && selectedAvailability.map(availability => (
            <span key={availability} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
              {availability}
            </span>
          ))}
          {(experience.min > 0 || experience.max < 10) && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">
              {experience.min}-{experience.max} years
            </span>
          )}
        </div>
      )}
    </div>
  );
}