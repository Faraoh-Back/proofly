// app/mocks/eventsMocks.ts

// Para uma melhor organização, estes tipos poderiam viver em um arquivo separado como 'app/types/events.ts'
export interface Organizer {
  name: string;
  logoUrl: string;
}

export interface StellarEvent {
  id: string;
  type: 'Hackathon' | 'Workshop' | 'Visita Técnica' | 'Meetup';
  title: string;
  description: string;
  image: string;
  prize: string | null;
  organizer: Organizer;
  participants: number;
  location: string;
  spotsLeft: number;
  daysLeft: number;
  tags: string[];
  nftRewardImage: string;
}

// Dados de Exemplo para Eventos
export const mockEvents: StellarEvent[] = [
  {
    id: 'soroban-defi-challenge',
    type: 'Hackathon',
    title: 'Soroban Smart Contract Challenge',
    description: 'Mergulhe no poder dos contratos inteligentes da Stellar e crie a próxima geração de aplicações DeFi.',
    image: '/events/soroban-challenge.jpg',
    prize: '50,000 USDC', // Este tem prêmio
    organizer: {
      name: 'Stellar Development Foundation',
      logoUrl: '/orgs/sdf.png'
    },
    participants: 1250,
    location: 'Online',
    spotsLeft: 150,
    daysLeft: 15,
    tags: ['DeFi', 'Smart Contracts', 'Soroban'],
    nftRewardImage: '/nfts/soroban-master-badge.png',
  },
  {
    id: 'workshop-intro-soroban',
    type: 'Workshop',
    title: 'Workshop: Introdução ao Soroban para Devs',
    description: 'Um workshop prático de 2 dias para desenvolvedores que querem começar a construir na Stellar.',
    image: '/events/workshop.jpg',
    prize: null, // Sem prêmio
    organizer: {
      name: 'Web3Dev',
      logoUrl: '/orgs/web3dev.png'
    },
    participants: 250,
    location: 'Online (Zoom)',
    spotsLeft: 30,
    daysLeft: 12,
    tags: ['Educacional', 'Soroban', 'Iniciante'],
    nftRewardImage: '/nfts/workshop-participant-badge.png',
  },
  {
    id: 'visita-coinbase-br',
    type: 'Visita Técnica',
    title: 'Visita Técnica à Sede da Coinbase Brasil',
    description: 'Uma oportunidade única para estudantes e desenvolvedores conhecerem a operação de uma grande exchange.',
    image: '/events/visita-tecnica.jpg',
    prize: null, // Sem prêmio
    organizer: {
      name: 'Coinbase',
      logoUrl: '/orgs/coinbase.png'
    },
    participants: 50,
    location: 'São Paulo, Brazil',
    spotsLeft: 5,
    daysLeft: 40,
    tags: ['Networking', 'Carreira', 'Exchange'],
    nftRewardImage: '/nfts/coinbase-visitor-badge.png',
  },
   {
    id: 'stellar-rio-meetup',
    type: 'Meetup',
    title: 'Stellar Community Meetup - Rio de Janeiro',
    description: 'Encontro presencial da comunidade para discutir as últimas novidades do ecossistema e fazer networking.',
    image: '/events/meetup-rio.jpg',
    prize: null, // Sem prêmio
    organizer: {
      name: 'Stellar Brasil',
      logoUrl: '/orgs/stellar-br.png'
    },
    participants: 120,
    location: 'Rio de Janeiro, Brazil',
    spotsLeft: 25,
    daysLeft: 18,
    tags: ['Comunidade', 'Networking'],
    nftRewardImage: '/nfts/rio-meetup-badge.png',
  }
];

// Função para buscar todos os eventos (simula uma chamada de API)
export const getEvents = (): StellarEvent[] => {
  // Ordena por "dias restantes" para mostrar os mais próximos primeiro
  return mockEvents.sort((a, b) => a.daysLeft - b.daysLeft);
};

// Função para buscar um evento específico pelo ID
export const getEventById = (id: string): StellarEvent | undefined => {
  return mockEvents.find(event => event.id === id);
};

// Função para buscar eventos por uma tag
export const getEventsByTag = (tag: string): StellarEvent[] => {
  return mockEvents.filter(event => 
    event.tags.some(eventTag => eventTag.toLowerCase().includes(tag.toLowerCase()))
  );
};