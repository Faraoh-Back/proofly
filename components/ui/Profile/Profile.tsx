"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { User, Award, Calendar, Link as LinkIcon, ExternalLink } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  image: string;
  eventLink: string;
  issuedDate?: string;
}

interface ApiResponse {
  message: string;
  timestamp: string;
  badges?: Badge[];
}

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/badges');
      const result: ApiResponse = await response.json();

      if (result.badges) {
        setBadges(result.badges);
      }
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Stellar Profile | Proofly</title>
      </Head>
      
      <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-db-dark-blue">
        <div className="relative z-10 container mx-auto px-6 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold tracking-wider">PROOFLY</div>
            <a href="#" className="bg-db-blue-dark hover:bg-db-blue-light text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Launch App
            </a>
          </header>

          <main>
            {/* Profile Section */}
            <section className="mb-16">
              <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="Profile" 
                    className="w-40 h-40 rounded-full object-cover border-4 border-db-cyan/30"
                  />
                </div>
                
                {/* Profile Info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">Alex Johnson</h1>
                  <div className="inline-flex items-center bg-db-blue-dark/40 text-db-cyan px-4 py-1 rounded-full mb-4">
                    <User size={16} className="mr-2" />
                    <span>Web3 Developer</span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Passionate about blockchain technology and decentralized applications. 
                    Currently building on Stellar and exploring the world of DeFi. 
                    Participated in 5+ hackathons and earned multiple achievement badges.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-db-blue-dark/30 px-4 py-2 rounded-lg flex items-center">
                      <Award size={18} className="mr-2 text-db-cyan" />
                      <span>{badges.length} Badges</span>
                    </div>
                    <div className="bg-db-blue-dark/30 px-4 py-2 rounded-lg flex items-center">
                      <Calendar size={18} className="mr-2 text-db-cyan" />
                      <span>Member since 2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Badges Section */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center">
                  <Award className="mr-3 text-db-cyan" size={28} />
                  Earned Badges
                </h2>
                <button 
                  onClick={fetchBadges} 
                  disabled={loading}
                  className="bg-db-blue-dark hover:bg-db-blue-light text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center"
                >
                  {loading ? 'Loading...' : 'Refresh Badges'}
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-db-cyan"></div>
                    <span className="ml-3">Loading badges...</span>
                  </div>
                </div>
              ) : badges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-6 transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open(badge.eventLink, '_blank')}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <img 
                          src={badge.image} 
                          alt={badge.name}
                          className="w-32 h-32 object-contain rounded-lg"
                        />
                        <div className="bg-db-blue-dark/20 text-db-cyan p-2 rounded-lg">
                          <ExternalLink size={16} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                      <div className="flex items-center text-gray-400 text-sm mb-4">
                        <span className="bg-db-blue-dark/30 px-2 py-1 rounded">
                          ID: {badge.id}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-db-blue-light/10">
                        <span className="text-db-cyan text-sm flex items-center">
                          <LinkIcon size={14} className="mr-1" />
                          Event Link
                        </span>
                        {badge.issuedDate && (
                          <span className="text-gray-400 text-sm">
                            {new Date(badge.issuedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl p-12 text-center">
                  <Award size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">No badges yet</h3>
                  <p className="text-gray-400">Participate in hackathons and events to earn your first badges!</p>
                </div>
              )}
            </section>

          </main>
        </div>
      </div>
    </>
  );
}