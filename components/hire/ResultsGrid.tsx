'use client';

import React from 'react';
import { Users, Search } from 'lucide-react';
import { DeveloperProfile } from '../../types/hire';
import DeveloperCard from './DeveloperCard';

interface ResultsGridProps {
  developers: DeveloperProfile[];
  isLoading: boolean;
  searchedSkills?: string[];
  totalCount?: number;
  onContactDeveloper?: (developer: DeveloperProfile) => void;
}

export default function ResultsGrid({ 
  developers, 
  isLoading, 
  searchedSkills = [], 
  totalCount,
  onContactDeveloper 
}: ResultsGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-600/50 rounded animate-pulse w-48"></div>
        </div>
        
        {/* Loading skeleton cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-6 animate-pulse">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-600/50"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-600/50 rounded w-48"></div>
                    <div className="h-4 bg-gray-600/50 rounded w-64"></div>
                    <div className="h-4 bg-gray-600/50 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-600/50 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-6 bg-gray-600/50 rounded w-16"></div>
                  ))}
                </div>
              </div>
              <div className="lg:w-80">
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-16 bg-gray-600/50 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!isLoading && developers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <Search className="mx-auto mb-4 text-gray-500" size={64} />
          <h3 className="text-2xl font-semibold mb-3">No developers found</h3>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            {searchedSkills.length > 0 
              ? `No developers found with skills: ${searchedSkills.join(', ')}`
              : 'Try adjusting your search criteria or filters to find more developers'
            }
          </p>
          
          {searchedSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Searched skills:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {searchedSkills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-db-cyan/20 text-db-cyan rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-6 max-w-md mx-auto">
          <h4 className="font-semibold mb-2">Suggestions:</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Try different skill combinations</li>
            <li>• Broaden your availability filters</li>
            <li>• Adjust experience requirements</li>
            <li>• Use more general search terms</li>
          </ul>
        </div>
      </div>
    );
  }

  // Results display
  const displayCount = totalCount ?? developers.length;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="text-db-cyan" size={24} />
            {displayCount} Developer{displayCount !== 1 ? 's' : ''} Found
          </h2>
          
          {searchedSkills.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-400 mb-2">Filtered by skills:</p>
              <div className="flex flex-wrap gap-2">
                {searchedSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-db-cyan/20 text-db-cyan rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results count badge */}
        <div className="bg-db-cyan/10 border border-db-cyan/30 rounded-lg px-4 py-2">
          <span className="text-db-cyan font-semibold">{developers.length} results</span>
        </div>
      </div>

      {/* Developer Cards Grid */}
      <div className="space-y-6">
        {developers.map((developer) => (
          <DeveloperCard
            key={developer.user_id}
            developer={developer}
            onContact={onContactDeveloper}
          />
        ))}
      </div>

      {/* Results footer */}
      {developers.length > 0 && (
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-4">
            Showing {developers.length} of {displayCount} developers
          </p>
          
          <div className="bg-gradient-to-r from-db-blue-dark to-black border border-db-cyan/20 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2 text-db-cyan">
              💡 Ready to hire talent?
            </h3>
            <p className="text-sm text-gray-400">
              Contact developers directly through their social profiles or reach out to discuss your project requirements.
              All badges are blockchain-verified and represent real achievements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}