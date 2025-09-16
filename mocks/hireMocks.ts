// mocks/hireMocks.ts
import { DeveloperProfile, Badge, ProjectHighlight, PlatformStats } from '../types/hire';

// Mock badges
const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'ETH Global Finalist',
    iconUrl: '/badge/eth-global.svg',
    description: 'Reached finals in ETH Global hackathon',
    issuedBy: 'ETH Global',
    category: 'hackathon',
    rarity: 'epic',
    earnedAt: '2024-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smart Contract Expert',
    iconUrl: '/badge/smart-contract.svg',
    description: 'Demonstrated advanced smart contract development skills',
    issuedBy: 'Chainlink Hackathon',
    category: 'hackathon',
    rarity: 'rare',
    earnedAt: '2024-02-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'DeFi Pioneer',
    iconUrl: '/badge/defi.svg',
    description: 'Built innovative DeFi solutions',
    issuedBy: 'DeFi Alliance',
    category: 'project',
    rarity: 'legendary',
    earnedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'NFT Creator',
    iconUrl: '/badge/nft.svg',
    description: 'Created successful NFT collections',
    issuedBy: 'OpenSea Hackathon',
    category: 'hackathon',
    rarity: 'rare',
    earnedAt: '2023-12-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Web3 Security',
    iconUrl: '/badge/security.svg',
    description: 'Expertise in Web3 security auditing',
    issuedBy: 'ConsenSys Diligence',
    category: 'certification',
    rarity: 'epic',
    earnedAt: '2023-11-15T00:00:00Z'
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