'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin, DollarSign, Github, Linkedin, Twitter, Globe, Award } from 'lucide-react';
import { DeveloperProfile } from '../../types/hire';

// Dynamic import for RotatingBadge
const RotatingBadge = dynamic(() => import('../ui/RotatingBadge'), {
  ssr: false,
  loading: () => (
    <div className="w-12 h-12 rounded-lg flex items-center justify-center animate-pulse bg-gradient-to-br from-db-cyan/20 to-db-blue-light/20 border border-db-cyan/30">
      <Award size={20} className="text-db-cyan animate-spin" />
    </div>
  )
});

interface DeveloperCardProps {
  developer: DeveloperProfile;
  onContact?: (developer: DeveloperProfile) => void;
}

export default function DeveloperCard({ developer, onContact }: DeveloperCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'unavailable': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityBgColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'unavailable': return 'bg-red-400';
      default: return 'bg-gray-400';
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

  const handleContactClick = () => {
    if (onContact) {
      onContact(developer);
    } else {
      // Default contact behavior - you can customize this
      console.log('Contact developer:', developer.user_name);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-lg p-6 hover:border-db-cyan transition-colors">
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
                {developer.hourlyRate && (
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    ${developer.hourlyRate}/hr
                  </span>
                )}
                <span className={`flex items-center gap-1 ${getAvailabilityColor(developer.availability)}`}>
                  <div className={`w-2 h-2 rounded-full ${getAvailabilityBgColor(developer.availability)}`}></div>
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

          {/* Top Badges - Horizontal Layout */}
          <div className="mb-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Award className="text-db-cyan" size={16} />
              Top Badges ({developer.totalBadges} total)
            </h4>
            <div className="flex flex-wrap gap-3">
              {developer.topBadges.slice(0, 3).map((badge) => (
                <div key={badge.id} className={`p-3 rounded-lg border ${getRarityColor(badge.rarity)} flex-shrink-0`}>
                  <div className="flex items-center gap-3">
                    {/* Rotating 3D Badge */}
                    <div className="w-12 h-12 flex items-center justify-center">
                      <RotatingBadge 
                        category="custom"
                        rarity={badge.rarity}
                        size="small"
                        iconUrl={badge.iconUrl}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{badge.name}</div>
                      <div className="text-xs text-gray-400 truncate">{badge.issuedBy}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {developer.socialLinks.github && (
              <a 
                href={developer.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {developer.socialLinks.linkedin && (
              <a 
                href={developer.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {developer.socialLinks.twitter && (
              <a 
                href={developer.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter size={20} />
              </a>
            )}
            {developer.socialLinks.portfolio && (
              <a 
                href={developer.socialLinks.portfolio} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Portfolio"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="lg:w-80">
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

          {/* Experience Info */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Experience</h4>
            <p className="text-sm text-gray-400">
              {developer.yearsOfExperience} year{developer.yearsOfExperience !== 1 ? 's' : ''} of experience
            </p>
          </div>

          {/* Contact Button */}
          <button 
            onClick={handleContactClick}
            className="w-full bg-db-cyan hover:bg-db-blue-light text-db-dark-blue font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Contact Developer
          </button>
        </div>
      </div>
    </div>
  );
}