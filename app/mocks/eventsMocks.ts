// app/mocks/eventsMocks.ts

// Para uma melhor organização, estes tipos poderiam viver em um arquivo separado como 'app/types/events.ts'
import { StellarEvent, Organizer} from '../../types/events';

// Dados de Exemplo para Eventos com SVGs válidos das empresas
export const mockEvents: StellarEvent[] = [
  {
    id: 'soroban-defi-challenge',
    type: 'Hackathon',
    title: 'Soroban Smart Contract Challenge',
    description: 'Mergulhe no poder dos contratos inteligentes da Stellar e crie a próxima geração de aplicações DeFi.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    prize: '50,000 USDC',
    organizer: {
      name: 'Stellar Development Foundation',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.svg'
    },
    participants: 1250,
    location: 'Online',
    spotsLeft: 150,
    daysLeft: 15,
    tags: ['DeFi', 'Smart Contracts', 'Soroban'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.svg',
    badgeRarity: 'legendary',
  },
  {
    id: 'workshop-intro-soroban',
    type: 'Workshop',
    title: 'Workshop: Introdução ao Soroban para Devs',
    description: 'Um workshop prático de 2 dias para desenvolvedores que querem começar a construir na Stellar.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    prize: null,
    organizer: {
      name: 'Microsoft',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    },
    participants: 250,
    location: 'Online (Zoom)',
    spotsLeft: 30,
    daysLeft: 12,
    tags: ['Educacional', 'Soroban', 'Iniciante'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    badgeRarity: 'epic',
  },
  {
    id: 'visita-coinbase-br',
    type: 'Visita Técnica',
    title: 'Visita Técnica à Sede da Coinbase Brasil',
    description: 'Uma oportunidade única para estudantes e desenvolvedores conhecerem a operação de uma grande exchange.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    prize: null,
    organizer: {
      name: 'Coinbase',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase_Logo.svg'
    },
    participants: 50,
    location: 'São Paulo, Brazil',
    spotsLeft: 5,
    daysLeft: 40,
    tags: ['Networking', 'Carreira', 'Exchange'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase_Logo.svg',
    badgeRarity: 'rare',
  },
  {
    id: 'stellar-rio-meetup',
    type: 'Meetup',
    title: 'Stellar Community Meetup - Rio de Janeiro',
    description: 'Encontro presencial da comunidade para discutir as últimas novidades do ecossistema e fazer networking.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop',
    prize: null,
    organizer: {
      name: 'Stellar Brasil',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.svg'
    },
    participants: 120,
    location: 'Rio de Janeiro, Brazil',
    spotsLeft: 25,
    daysLeft: 18,
    tags: ['Comunidade', 'Networking'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Stellar_Symbol.svg',
    badgeRarity: 'common',
  },
  {
    id: 'polygon-scaling-workshop',
    type: 'Workshop',
    title: 'Polygon zkEVM Scaling Solutions',
    description: 'Aprenda sobre soluções de escalabilidade Layer 2 com Polygon e zkEVM para otimizar suas dApps.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    prize: '10,000 MATIC',
    organizer: {
      name: 'Polygon',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Polygon_blockchain_logo.svg'
    },
    participants: 400,
    location: 'Online',
    spotsLeft: 75,
    daysLeft: 8,
    tags: ['Layer2', 'Scaling', 'zkEVM'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Polygon_blockchain_logo.svg',
    badgeRarity: 'epic',
  },
  {
    id: 'ethereum-hackathon-sp',
    type: 'Hackathon',
    title: 'Ethereum São Paulo Hackathon 2024',
    description: 'O maior hackathon de Ethereum no Brasil. Desenvolva soluções inovadoras para o futuro da Web3.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    prize: '100,000 ETH',
    organizer: {
      name: 'Ethereum Foundation',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg'
    },
    participants: 800,
    location: 'São Paulo, Brazil',
    spotsLeft: 200,
    daysLeft: 25,
    tags: ['Ethereum', 'DeFi', 'NFT'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg',
    badgeRarity: 'legendary',
  },
  {
    id: 'google-cloud-web3',
    type: 'Workshop',
    title: 'Google Cloud Web3 Infrastructure Workshop',
    description: 'Aprenda a construir infraestrutura Web3 escalável usando Google Cloud Platform e suas ferramentas.',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=400&fit=crop',
    prize: null,
    organizer: {
      name: 'Google',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
    },
    participants: 300,
    location: 'Online',
    spotsLeft: 50,
    daysLeft: 20,
    tags: ['Cloud', 'Infrastructure', 'GCP'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    badgeRarity: 'epic',
  },
  {
    id: 'amazon-aws-blockchain',
    type: 'Hackathon',
    title: 'AWS Blockchain Builder Challenge',
    description: 'Construa aplicações blockchain usando Amazon Managed Blockchain e outros serviços AWS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    prize: '25,000 USD',
    organizer: {
      name: 'Amazon',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    },
    participants: 600,
    location: 'São Paulo, Brazil',
    spotsLeft: 100,
    daysLeft: 35,
    tags: ['AWS', 'Blockchain', 'Cloud'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    badgeRarity: 'epic',
  },
  {
    id: 'meta-vr-metaverse',
    type: 'Hackathon',
    title: 'Meta VR Metaverse Development Challenge',
    description: 'Crie experiências imersivas no metaverso usando tecnologias de VR/AR da Meta.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&h=400&fit=crop',
    prize: '75,000 USD',
    organizer: {
      name: 'Meta',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg'
    },
    participants: 900,
    location: 'Online',
    spotsLeft: 300,
    daysLeft: 45,
    tags: ['VR', 'AR', 'Metaverse'],
    nftRewardImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    badgeRarity: 'legendary',
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

export type { StellarEvent };
