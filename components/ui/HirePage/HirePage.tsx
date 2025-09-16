// components/ui/HirePage/HirePage.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Users, Award, Code, MapPin, DollarSign, Star, ExternalLink, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { DeveloperProfile, HireFilters, SortOption } from '../../../types/hire';
import { getDevelopers, getPlatformStats, availableSkills } from '../../../mocks/hireMocks';

export const HirePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.RELEVANCE);
  const [filters, setFilters] = useState<Partial<HireFilters>>({
    skills: [],
    availability: ['available'],
    experience: { min: 0, max: 10 }
  });
  const [showFilters, setShowFilters] = useState(false);

  const developers = getDevelopers();
  const platformStats = getPlatformStats();

  // Filter and search logic
  const filteredDevelopers = useMemo(() => {
    let result = developers;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(dev => 
        dev.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dev.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      result = result.filter(dev =>
        filters.skills!.some(skill => dev.skills.includes(skill))
      );
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      result = result.filter(dev => filters.availability!.includes(dev.availability));
    }

    // Filter by experience
    if (filters.experience) {
      result = result.filter(dev => 
        dev.yearsOfExperience >= filters.experience!.min && 
        dev.yearsOfExperience <= filters.experience!.max
      );
    }

    // Sort results
    switch (sortBy) {
      case SortOption.BADGES_COUNT:
        result.sort((a, b) => b.totalBadges - a.totalBadges);
        break;
      case SortOption.EXPERIENCE:
        result.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
        break;
      case SortOption.RATING:
        result.sort((a, b) => (b.attributes.problemSolving + b.attributes.collaboration) - (a.attributes.problemSolving + a.attributes.collaboration));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return result;
  }, [developers, searchQuery, filters, sortBy]);

  const toggleSkillFilter = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const toggleAvailabilityFilter = (availability: 'available' | 'busy' | 'unavailable') => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability?.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...(prev.availability || []), availability]
    }));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'unavailable': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 bg-yellow-400/10';
      case 'epic': return 'border-purple-400 bg-purple-400/10';
      case 'rare': return 'border-blue-400 bg-blue-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
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
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:border-db-cyan transition-colors"
              />
            </div>

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
                          filters.skills?.includes(skill)
                            ? 'bg-db-cyan text-db-dark-blue'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    {(['available', 'busy', 'unavailable'] as const).map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.availability?.includes(status) || false}
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
                      <label className="block text-sm text-gray-400 mb-1">Min: {filters.experience?.min || 0}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={filters.experience?.min || 0}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          experience: { ...prev.experience, min: parseInt(e.target.value), max: prev.experience?.max || 10 }
                        }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Max: {filters.experience?.max || 10}</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={filters.experience?.max || 10}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          experience: { ...prev.experience, min: prev.experience?.min || 0, max: parseInt(e.target.value) }
                        }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {filteredDevelopers.length} Developer{filteredDevelopers.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Developer Cards */}
        <div className="grid gap-6">
          {filteredDevelopers.map((developer) => (
            <div key={developer.user_id} className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-6 hover:border-db-cyan transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={developer.avatarUrl}
                      alt={developer.user_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{developer.user_name}</h3>
                      <p className="text-db-cyan mb-2">{developer.headline}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {developer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          ${developer.hourlyRate}/hr
                        </span>
                        <span className={`flex items-center gap-1 ${getAvailabilityColor(developer.availability)}`}>
                          <div className={`w-2 h-2 rounded-full ${developer.availability === 'available' ? 'bg-green-400' : developer.availability === 'busy' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                          {developer.availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">{developer.bio}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {developer.skills.slice(0, 8).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-db-blue-dark/50 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                      {developer.skills.length > 8 && (
                        <span className="px-2 py-1 bg-gray-600/50 rounded text-sm">
                          +{developer.skills.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    {developer.socialLinks.github && (
                      <a href={developer.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {developer.socialLinks.linkedin && (
                      <a href={developer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={20} />
                      </a>
                    )}
                    {developer.socialLinks.twitter && (
                      <a href={developer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                    {developer.socialLinks.portfolio && (
                      <a href={developer.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Globe size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column - Badges & Stats */}
                <div className="lg:w-80">
                  {/* Top Badges */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="text-db-cyan" size={16} />
                      Top Badges ({developer.totalBadges} total)
                    </h4>
                    <div className="space-y-2">
                      {developer.topBadges.slice(0, 3).map(badge => (
                        <div key={badge.id} className={`p-3 rounded-lg border ${getRarityColor(badge.rarity)}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-db-cyan/20 rounded-full flex items-center justify-center">
                              <Award size={16} className="text-db-cyan" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{badge.name}</div>
                              <div className="text-xs text-gray-400">{badge.issuedBy}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3">Attributes</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Problem Solving</span>
                        <span className="text-db-cyan">{developer.attributes.problemSolving}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collaboration</span>
                        <span className="text-db-cyan">{developer.attributes.collaboration}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Innovation</span>
                        <span className="text-db-cyan">{developer.attributes.innovation}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Leadership</span>
                        <span className="text-db-cyan">{developer.attributes.leadership}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button className="w-full bg-db-cyan hover:bg-db-blue-light text-db-dark-blue font-bold py-3 px-6 rounded-lg transition-colors">
                    Contact Developer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">No developers found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};