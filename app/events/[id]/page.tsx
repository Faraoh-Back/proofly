"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Twitter, Send, Users, MapPin, Award, Clock, Calendar, Trophy, GitMerge, Star } from 'lucide-react';

// Importe os tipos e a função de busca dos seus mocks
import { getEvents, getEventById } from '../../mocks/eventsMocks'; // Ajuste o caminho se necessário
import type { StellarEvent } from '../../mocks/eventsMocks';

// Componente para o conteúdo da aba "Overview"
const OverviewTab = ({ event }: { event: StellarEvent }) => (
  <div className="prose prose-invert prose-lg max-w-none text-gray-300">
    <h2>Bem-vindo ao {event.title}!</h2>
    <p>
      Junte-se a nós neste evento incrível focado em {event.tags.join(', ')}. 
      Esta é uma oportunidade fantástica para aprender, construir e se conectar com outros desenvolvedores e entusiastas do ecossistema Stellar.
    </p>
    <p>{event.description}</p>
    
    <h3>Organizado por {event.organizer.name}</h3>
    <p>
      Este evento é orgulhosamente apresentado por {event.organizer.name}, uma empresa líder e apoiadora da inovação na rede Stellar.
    </p>

    {event.prize && (
      <>
        <h3>Prêmios e Recompensas</h3>
        <p>
          Os participantes competirão por um prêmio total de <strong>{event.prize}</strong>! Além disso, todos os participantes que concluírem o evento receberão um badge exclusivo em NFT.
        </p>
      </>
    )}
  </div>
);


export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<StellarEvent | null>(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado do botão de submissão

  useEffect(() => {
    // Busca o evento específico usando o ID da URL
    const eventData = getEventById(id as string);
    if (eventData) {
      setEvent(eventData);
    }
  }, [id]);

  const handleSubmission = () => {
    // Em um app real, aqui você faria uma chamada de API para submeter o perfil.
    // Por enquanto, apenas mudamos o estado local.
    setIsSubmitted(true);
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-db-dark-blue text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Evento não encontrado</h1>
          <Link href="/events" className="text-db-cyan hover:underline">
            Voltar para a lista de eventos
          </Link>
        </div>
      </div>
    );
  }

  const tabs = ['Overview', 'Timeline', 'Categories', 'Sponsors', 'Projects'];

  return (
    <>
      <Head>
        <title>{event.title} | Proofly</title>
      </Head>

      <div className="min-h-screen bg-db-dark-blue text-white font-sans">
        <div className="container mx-auto px-6 py-8">
          <Link href="/events" className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            VOLTAR PARA A LISTA DE EVENTOS
          </Link>

          {/* Seção do Banner */}
          <div className="relative rounded-2xl">
            <img src={event.image} alt={`${event.title} banner`} className="w-full h-48 md:h-64 object-cover rounded-2xl" />
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <img src={event.organizer.logoUrl} alt={`${event.organizer.name} logo`} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-db-dark-blue bg-db-dark-blue" />
            </div>
          </div>

          {/* Conteúdo Principal */}
          <main className="mt-20 md:mt-24 flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Esquerda */}
            <aside className="w-full lg:w-1/3 flex-shrink-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{event.title}</h1>
              <p className="text-gray-400 mb-6">{event.organizer.name}</p>

              <div className="flex items-center gap-4 mb-8">
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white flex-1 text-center py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                  <Twitter size={18} /> Twitter
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="bg-indigo-500 text-white flex-1 text-center py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors">
                  <Send size={18} /> Discord
                </a>
              </div>

              {/* Botão de Submissão */}
              <button
                onClick={handleSubmission}
                disabled={isSubmitted}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300
                  ${isSubmitted 
                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed' 
                    : 'bg-db-cyan text-db-dark-blue hover:bg-opacity-80'
                  }`}
              >
                {isSubmitted ? 'Submetido! Aguarde o contato' : 'Submeter Perfil para Análise'}
              </button>

              <div className="mt-8 border-t border-db-blue-light/20 pt-6 space-y-4">
                <div className="flex items-center text-gray-200"><Users size={18} className="mr-4 text-db-cyan" /> <span><strong>{event.participants}</strong> Participantes</span></div>
                <div className="flex items-center text-gray-200"><MapPin size={18} className="mr-4 text-db-cyan" /> <span>{event.location}</span></div>
                {event.prize && <div className="flex items-center text-gray-200"><Award size={18} className="mr-4 text-db-cyan" /> <span>Prêmio de <strong>{event.prize}</strong></span></div>}
                <div className="flex items-center text-gray-200"><Clock size={18} className="mr-4 text-db-cyan" /> <span>Encerra em <strong>{event.daysLeft} dias</strong></span></div>
              </div>
            </aside>

            {/* Conteúdo da Direita (com abas) */}
            <div className="w-full lg:flex-1">
              <div className="border-b border-db-blue-light/20 mb-8 overflow-x-auto">
                <nav className="flex space-x-8 -mb-px">
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 inline-flex items-center text-sm font-medium border-b-2 whitespace-nowrap
                        ${activeTab === tab
                          ? 'border-db-cyan text-db-cyan'
                          : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                        }`}
                    >
                      {tab === 'Overview' && <Star size={16} className="mr-2"/>}
                      {tab === 'Timeline' && <Calendar size={16} className="mr-2"/>}
                      {tab === 'Categories' && <GitMerge size={16} className="mr-2"/>}
                      {tab === 'Sponsors' && <Trophy size={16} className="mr-2"/>}
                      {tab === 'Projects' && <Users size={16} className="mr-2"/>}
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Conteúdo das Abas */}
              <div className="py-4">
                {activeTab === 'Overview' && <OverviewTab event={event} />}
                {activeTab === 'Timeline' && <p className="text-gray-300">Conteúdo do Timeline (cronograma do evento) aqui.</p>}
                {activeTab === 'Categories' && <p className="text-gray-300">Conteúdo das Categorias e Desafios aqui.</p>}
                {activeTab === 'Sponsors' && <p className="text-gray-300">Conteúdo dos Patrocinadores aqui.</p>}
                {activeTab === 'Projects' && <p className="text-gray-300">Galeria de projetos submetidos aqui.</p>}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}