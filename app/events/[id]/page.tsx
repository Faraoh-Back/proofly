"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowLeft, Twitter, Send, Users, MapPin, Award, Clock, Calendar, Trophy, GitMerge, Star,
  BookOpen, Briefcase, Shuffle, Code, UserCheck
} from 'lucide-react';

import { getEventById } from '../../mocks/eventsMocks'; // Ajuste o caminho se necessário
import type { StellarEvent } from '../../mocks/eventsMocks'; // Ajuste o caminho se necessário

// --- Lógica de Abas e Ícones (sem alterações) ---
const tabsConfig: Record<StellarEvent['type'], string[]> = {
    'Hackathon': ['Overview', 'Timeline', 'Categories', 'Workshops', 'Sponsors', 'Judges', 'Projects', 'Participants', 'Matchmaking'],
    'Workshop': ['Overview', 'Timeline', 'Sponsors', 'Participants'],
    'Visita Técnica': ['Overview', 'Timeline', 'Participants'],
    'Meetup': ['Overview', 'Timeline', 'Sponsors', 'Participants']
};
const TabIcon = ({ tabName }: { tabName: string }) => {
    const iconProps = { size: 16, className: "mr-2" };
    const iconMap: Record<string, React.ReactNode> = {
      'Overview': <Star {...iconProps} />,
      'Timeline': <Calendar {...iconProps} />,
      'Categories': <GitMerge {...iconProps} />,
      'Workshops': <BookOpen {...iconProps} />,
      'Sponsors': <Briefcase {...iconProps} />,
      'Matchmaking': <Shuffle {...iconProps} />,
      'Projects': <Code {...iconProps} />,
      'Participants': <Users {...iconProps} />,
      'Judges': <UserCheck {...iconProps} />,
    };
    return iconMap[tabName] || null;
};
const OverviewTab = ({ event }: { event: StellarEvent }) => (
    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
      <h2>Bem-vindo ao {event.title}!</h2>
      <p>Junte-se a nós neste evento incrível focado em {event.tags.join(', ')}.</p>
      <p>{event.description}</p>
      <h3>Organizado por {event.organizer.name}</h3>
      <p>Este evento é orgulhosamente apresentado por {event.organizer.name}.</p>
      {event.prize && (
        <><h3>Prêmios e Recompensas</h3><p>Os participantes competirão por um prêmio total de <strong>{event.prize}</strong>!</p></>
      )}
    </div>
);
// --- Fim da Lógica de Abas e Ícones ---


export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<StellarEvent | null>(null);
  const [tabs, setTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const eventData = getEventById(id as string);
    if (eventData) {
      setEvent(eventData);
      const eventTabs = tabsConfig[eventData.type] || ['Overview'];
      setTabs(eventTabs);
      if (eventTabs.length > 0) {
        setActiveTab(eventTabs[0]);
      }
    }
  }, [id]);

  const handleSubmission = () => setIsSubmitted(true);

  if (!event) {
    return (
      <div className="min-h-screen bg-db-dark-blue text-white flex items-center justify-center">
        <p>Carregando evento...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title} | Proofly</title>
      </Head>

      <div className="min-h-screen bg-db-dark-blue text-white font-sans">
        <div className="container mx-auto px-6 py-8">
          
          <div className="mb-8">
            <Link 
              href="/events"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Voltar para lista de eventos
            </Link>
          </div>
          
          {/* Banner */}
          <div className="relative rounded-2xl">
            <img src={event.image} className="w-full h-48 md:h-64 object-cover rounded-2xl" />
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <img src={event.organizer.logoUrl} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-db-dark-blue bg-db-dark-blue" />
            </div>
          </div>

          {/* Layout de Duas Colunas */}
          <main className="mt-20 md:mt-24 flex flex-col lg:flex-row gap-12">
            
            {/* === SIDEBAR ESQUERDA (Informações do Evento) === */}
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

            {/* === CONTEÚDO DA DIREITA (Com Abas na Horizontal) === */}
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
                      <TabIcon tabName={tab} />
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-4">
                {activeTab === 'Overview' && <OverviewTab event={event} />}
                {activeTab === 'Timeline' && <p>Conteúdo do Timeline (cronograma) aqui.</p>}
                {activeTab === 'Categories' && <p>Conteúdo das Categorias e Desafios aqui.</p>}
                {activeTab === 'Workshops' && <p>Lista de Workshops disponíveis aqui.</p>}
                {activeTab === 'Sponsors' && <p>Conteúdo dos Patrocinadores aqui.</p>}
                {activeTab === 'Judges' && <p>Informações sobre os Jurados aqui.</p>}
                {activeTab === 'Projects' && <p>Galeria de projetos submetidos aqui.</p>}
                {activeTab === 'Participants' && <p>Lista de Participantes aqui.</p>}
                {activeTab === 'Matchmaking' && <p>Ferramenta de Matchmaking para equipes aqui.</p>}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}