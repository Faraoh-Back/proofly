// mocks/hireMocks.ts
import { DeveloperProfile, Badge, ProjectHighlight, PlatformStats } from '../types/hire';

// Mock badges
const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Google Certified Developer',
    description: 'Google Cloud Platform certified developer',
    issuedBy: 'Google',
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    category: 'custom',
    rarity: 'epic',
    earnedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Meta Engineer',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description: 'Senior engineer at Meta Platforms',
    issuedBy: 'Meta',
    category: 'hackathon',
    rarity: 'rare',
    earnedAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Amazon AWS Expert',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'AWS cloud platform and infrastructure expert',
    issuedBy: 'Amazon',
    category: 'project',
    rarity: 'legendary',
    earnedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'Twitter Developer',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
    description: 'Twitter API and platform specialist',
    issuedBy: 'Twitter',
    category: 'hackathon',
    rarity: 'rare',
    earnedAt: '2023-12-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Microsoft Azure Expert',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description: 'Microsoft Azure cloud platform expertise',
    issuedBy: 'Microsoft',
    category: 'certification',
    rarity: 'epic',
    earnedAt: '2023-11-15T00:00:00Z'
  },
  // Badges com URLs de empresas famosas
  {
    id: '6',
    name: 'Amazon AWS Expert',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Amazon Web Services certified solutions architect',
    issuedBy: 'Amazon',
    category: 'certification',
    rarity: 'legendary',
    earnedAt: '2023-10-20T00:00:00Z'
  },
  {
    id: '7',
    name: 'Netflix Tech Lead',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    description: 'Senior technical leadership at Netflix',
    issuedBy: 'Netflix',
    category: 'project',
    rarity: 'epic',
    earnedAt: '2023-09-15T00:00:00Z'
  },
  {
    id: '8',
    name: 'Spotify Engineer',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg',
    description: 'Music streaming platform engineering expert',
    issuedBy: 'Spotify',
    category: 'hackathon',
    rarity: 'rare',
    earnedAt: '2023-08-10T00:00:00Z'
  },
  {
    id: '9',
    name: 'Ethereum Builder',
    iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    description: 'Built innovative solutions on Ethereum',
    issuedBy: 'Ethereum Foundation',
    category: 'project',
    rarity: 'epic',
    earnedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '10',
    name: 'Polygon Hackathon Winner',
    iconUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    description: 'First place in Polygon hackathon',
    issuedBy: 'Polygon Labs',
    category: 'hackathon',
    rarity: 'legendary',
    earnedAt: '2024-01-20T00:00:00Z'
  }
];

// Mock project highlights
const mockProjects: ProjectHighlight[] = [
  {
    id: '1',
    name: 'DeFi Yield Aggregator',
    description: 'Built a cross-chain yield farming aggregator with 50M+ TVL',
    techStack: ['Solidity', 'React', 'Node.js', 'Web3.js'],
    projectUrl: 'https://defi-aggregator.com',
    githubUrl: 'https://github.com/dev/defi-aggregator',
    completedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    description: 'Created gas-optimized NFT marketplace with advanced filtering',
    techStack: ['Solidity', 'Next.js', 'IPFS', 'Ethers.js'],
    projectUrl: 'https://nft-marketplace.io',
    githubUrl: 'https://github.com/dev/nft-marketplace',
    completedAt: '2024-01-15T00:00:00Z'
  }
];

// Mock developer profiles
export const mockDevelopers: DeveloperProfile[] = [
  {
    user_id: '1',
    user_name: 'Alex Chen',
    avatarUrl: '/profile-photo.jpg',
    headline: 'Senior Smart Contract Developer | DeFi & NFT Expert',
    bio: 'Passionate blockchain developer with 4+ years building scalable DeFi protocols. Led development of multiple successful projects with millions in TVL.',
    skills: ['Solidity', 'Rust', 'Web3.js', 'DeFi', 'Smart Contracts', 'Gas Optimization'],
    topBadges: [mockBadges[0], mockBadges[2], mockBadges[4]],
    totalBadges: 12,
    yearsOfExperience: 4,
    location: 'San Francisco, CA',
    availability: 'available',
    hourlyRate: 150,
    attributes: {
      problemSolving: 9,
      collaboration: 8,
      innovation: 9,
      leadership: 7
    },
    socialLinks: {
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      twitter: 'https://twitter.com/alexchen',
      portfolio: 'https://alexchen.dev'
    },
    recentProjects: mockProjects
  },
  {
    user_id: '2',
    user_name: 'Maria Santos',
    avatarUrl: '/profile-photo.jpg',
    headline: 'Full-Stack Web3 Developer | React & Solidity',
    bio: 'Frontend-focused Web3 developer specializing in user-friendly dApp interfaces. Expert in connecting complex smart contracts to intuitive UIs.',
    skills: ['React', 'TypeScript', 'Solidity', 'Web3.js', 'UI/UX', 'DApp Development'],
    topBadges: [mockBadges[1], mockBadges[3]],
    totalBadges: 8,
    yearsOfExperience: 3,
    location: 'Remote',
    availability: 'available',
    hourlyRate: 120,
    attributes: {
      problemSolving: 8,
      collaboration: 9,
      innovation: 8,
      leadership: 8
    },
    socialLinks: {
      github: 'https://github.com/mariasantos',
      linkedin: 'https://linkedin.com/in/mariasantos',
      portfolio: 'https://mariasantos.dev'
    },
    recentProjects: [mockProjects[1]]
  },
  {
    user_id: '3',
    user_name: 'David Kim',
    avatarUrl: '/profile-photo.jpg',
    headline: 'Blockchain Security Auditor | Smart Contract Expert',
    bio: 'Security-first blockchain developer with expertise in smart contract auditing and protocol security. Found and fixed 50+ critical vulnerabilities.',
    skills: ['Solidity', 'Security Auditing', 'Foundry', 'Hardhat', 'Mythril', 'Slither'],
    topBadges: [mockBadges[4], mockBadges[1]],
    totalBadges: 10,
    yearsOfExperience: 5,
    location: 'Seoul, South Korea',
    availability: 'busy',
    hourlyRate: 200,
    attributes: {
      problemSolving: 10,
      collaboration: 7,
      innovation: 8,
      leadership: 6
    },
    socialLinks: {
      github: 'https://github.com/davidkim',
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim'
    },
    recentProjects: []
  },
  {
    user_id: '4',
    user_name: 'Sarah Johnson',
    avatarUrl: '/profile-photo.jpg',
    headline: 'DeFi Protocol Architect | Rust & Solana Expert',
    bio: 'Experienced protocol architect specializing in high-performance DeFi on Solana. Built multiple protocols handling millions in daily volume.',
    skills: ['Rust', 'Solana', 'Anchor', 'DeFi', 'Protocol Design', 'MEV Protection'],
    topBadges: [mockBadges[2], mockBadges[0]],
    totalBadges: 15,
    yearsOfExperience: 6,
    location: 'Austin, TX',
    availability: 'available',
    hourlyRate: 180,
    attributes: {
      problemSolving: 9,
      collaboration: 8,
      innovation: 10,
      leadership: 9
    },
    socialLinks: {
      github: 'https://github.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      portfolio: 'https://sarahjohnson.dev'
    },
    recentProjects: mockProjects
  }
];

// Platform statistics
export const mockPlatformStats: PlatformStats = {
  totalDevelopers: 1248,
  totalBadges: 8945,
  totalHackathons: 156,
  averageRating: 4.8
};

// Available skills for filtering
export const availableSkills = [
  'Solidity', 'Rust', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Web3.js', 'Ethers.js', 'DeFi', 'NFT', 'Smart Contracts', 'Hardhat', 'Foundry',
  'IPFS', 'GraphQL', 'Subgraph', 'Chainlink', 'OpenZeppelin', 'Security Auditing',
  'Gas Optimization', 'Layer 2', 'Cross-chain', 'Governance', 'DAO', 'Tokenomics'
];

// Available badge categories for filtering
export const availableBadgeCategories = [
  'hackathon', 'certification', 'project', 'contribution'
];

export function getDevelopers(): DeveloperProfile[] {
  return mockDevelopers;
}

export function getDeveloperById(id: string): DeveloperProfile | undefined {
  return mockDevelopers.find(dev => dev.user_id === id);
}

export function getPlatformStats(): PlatformStats {
  return mockPlatformStats;
}