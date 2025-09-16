"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Award, MapPin, Users, Clock, Gift } from 'lucide-react';

// 1. Importe os tipos e a função de busca do seu novo arquivo de mocks
import { getEvents } from '../../../app/mocks/eventsMocks'; // Ajuste o caminho se necessário
import type { StellarEvent } from '../../../app/mocks/eventsMocks';

// O restante do seu componente permanece quase o mesmo, mas agora busca os dados
export default function EventsPage() {
  const [events, setEvents] = useState<StellarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 2. Lógica de busca de dados foi atualizada
    // Simula uma chamada de API usando a função importada
    setLoading(true);
    setTimeout(() => {
      const fetchedEvents = getEvents(); // <-- USA A FUNÇÃO IMPORTADA
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
                    // AQUI ESTÁ A MUDANÇA PRINCIPAL
                    <Link key={event.id} href={`/events/${event.id}`} passHref legacyBehavior>
                      <a className="block h-full"> {/* Usar <a> para garantir o comportamento correto do link */}
                        <div 
                          className="bg-white/5 backdrop-blur-md border border-db-blue-light/20 rounded-2xl flex flex-col group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 h-full"
                        >
                          <div className="relative mb-8">
                            <img src={event.image} className="w-full h-48 object-cover rounded-t-2xl" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                              <img 
                                src={event.organizer.logoUrl} 
                                className="w-20 h-20 rounded-full object-cover border-4 border-db-dark-blue bg-db-dark-blue"
                              />
                            </div>
                            <div className="absolute top-4 right-4 bg-db-dark-blue/80 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center">
                               <Clock size={14} className="mr-1.5" /> {event.daysLeft} DIAS RESTANTES
                            </div>
                          </div>
                          <div className="p-6 pt-0 flex flex-col flex-grow text-center">
                            <span className="text-db-cyan text-sm font-semibold mb-2">{event.type}</span>
                            <h3 className="text-xl font-bold mb-2 flex-grow">{event.title}</h3>
                            <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                            <div className="space-y-3 text-sm my-5 text-left">
                                {event.prize && (
                                    <div className="flex items-center text-gray-200"><Award size={16} className="mr-3 text-db-cyan flex-shrink-0" /> <span>Prêmio: <span className="font-bold">{event.prize}</span></span></div>
                                )}
                                <div className="flex items-center text-gray-200"><MapPin size={16} className="mr-3 text-db-cyan flex-shrink-0" /> <span>Local: <span className="font-bold">{event.location}</span></span></div>
                                <div className="flex items-center text-gray-200"><Users size={16} className="mr-3 text-db-cyan flex-shrink-0" /> <span>{event.participants} participantes | <span className="font-bold text-white">{event.spotsLeft} vagas</span></span></div>
                            </div>
                            <div className="mt-auto pt-4 border-t border-db-blue-light/10 flex items-center gap-4">
                               <img src={event.nftRewardImage} alt="NFT Badge" className="w-14 h-14 rounded-md object-contain bg-db-blue-dark/50 p-1" />
                               <div>
                                    <h4 className="font-semibold text-sm text-left flex items-center"><Gift size={14} className="mr-2 text-db-cyan"/> Badge de Participação</h4>
                                    <p className="text-xs text-gray-400 text-left">Garantido ao final do evento.</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
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