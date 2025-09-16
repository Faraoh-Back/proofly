'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Award, MapPin, Users, Clock, Gift } from 'lucide-react';
import type { StellarEvent } from '../../../types/events';

// Dynamic import do RotatingBadge
const RotatingBadge = dynamic(() => import('../RotatingBadge'), {
  ssr: false,
  loading: () => (
    <div className="w-14 h-14 rounded-md bg-gradient-to-br from-db-cyan/20 to-db-blue-light/20 border border-db-cyan/30 flex items-center justify-center animate-pulse">
      <Award size={20} className="text-db-cyan animate-spin" />
    </div>
  )
});

interface EventCardProps {
  event: StellarEvent;
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'border-yellow-400 shadow-yellow-400/20';
    case 'epic': return 'border-purple-400 shadow-purple-400/20';
    case 'rare': return 'border-blue-400 shadow-blue-400/20';
    default: return 'border-gray-400 shadow-gray-400/20';
  }
};

const getRarityGlow = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'shadow-lg shadow-yellow-400/30';
    case 'epic': return 'shadow-lg shadow-purple-400/30';
    case 'rare': return 'shadow-lg shadow-blue-400/30';
    default: return 'shadow-lg shadow-gray-400/20';
  }
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div 
        className={`group bg-gradient-to-br from-db-blue-dark to-black border ${getRarityColor(event.badgeRarity || 'common')} rounded-2xl ${getRarityGlow(event.badgeRarity || 'common')} hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col`}
      >
        <div className="relative mb-8">
          <img src={event.image} className="w-full h-48 object-cover rounded-t-2xl" alt={event.title} />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <img 
              src={event.organizer.logoUrl} 
              className="w-20 h-20 rounded-full object-cover border-4 border-db-dark-blue bg-white p-2"
              alt={event.organizer.name}
            />
          </div>
          <div className="absolute top-4 right-4 bg-db-dark-blue/80 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center">
             <Clock size={14} className="mr-1.5" /> {event.daysLeft} DIAS RESTANTES
          </div>
          {event.prize && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center">
              <Gift size={14} className="mr-1.5" /> {event.prize}
            </div>
          )}
        </div>
        
        <div className="p-6 pt-0 flex flex-col flex-grow text-center">
          <span className="text-db-cyan text-sm font-semibold mb-2">{event.type}</span>
          <h3 className="text-xl font-bold mb-2 flex-grow group-hover:text-db-cyan transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>
          
          <div className="space-y-3 text-sm my-5 text-left">
            <div className="flex items-center text-gray-200">
              <MapPin size={16} className="mr-3 text-db-cyan flex-shrink-0" /> 
              <span>Local: <span className="font-bold">{event.location}</span></span>
            </div>
            <div className="flex items-center text-gray-200">
              <Users size={16} className="mr-3 text-db-cyan flex-shrink-0" /> 
              <span>{event.participants} participantes | <span className="font-bold text-white">{event.spotsLeft} vagas</span></span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-db-blue-light/10 flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center">
              <RotatingBadge 
                category="custom"
                rarity={event.badgeRarity || 'common'}
                size="small"
                iconUrl={event.nftRewardImage}
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-left flex items-center">
                <Gift size={14} className="mr-2 text-db-cyan"/> 
                Badge de Participação
              </h4>
              <p className="text-xs text-gray-400 text-left">
                Rarity: <span className={`font-semibold ${
                  event.badgeRarity === 'legendary' ? 'text-yellow-400' :
                  event.badgeRarity === 'epic' ? 'text-purple-400' :
                  event.badgeRarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {event.badgeRarity || 'common'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}