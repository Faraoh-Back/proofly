"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Award, MapPin, Users, Clock, Gift } from 'lucide-react';

// Import dos tipos e função de busca
import { getEvents } from '../../../app/mocks/eventsMocks';
import type { StellarEvent } from '../../../types/events';
import EventCard from './EventCard';

// O restante do seu componente permanece quase o mesmo, mas agora busca os dados
export default function EventsPage() {
  const [events, setEvents] = useState<StellarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simula uma chamada de API usando a função importada
    setLoading(true);
    setTimeout(() => {
      const fetchedEvents = getEvents();
      setEvents(fetchedEvents);
      setLoading(false);
    }, 1000); // Mantém um delay para simular o carregamento da rede
  }, []);
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Head>
        <title>Eventos Stellar | Proofly</title>
      </Head>
      
      <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-db-dark-blue">
        <div className="relative z-10 container mx-auto px-6 py-8">
          <header className="flex justify-between items-center mb-12">
            <div className="text-2xl font-bold tracking-wider">PROOFLY</div>
            <a href="#" className="bg-db-blue-dark hover:bg-db-blue-light text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Launch App
            </a>
          </header>

          <main>
            <section className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Eventos na Stellar</h1>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Participe de hackathons, workshops e mais. Aprenda, construa e conecte-se com a comunidade.
              </p>
              <div className="max-w-xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Buscar por nome ou tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-db-blue-light/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-db-cyan focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </section>

            <section>
              {loading ? (
                 <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-db-cyan mx-auto"></div>
                    <p className="mt-4">Carregando eventos...</p>
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}