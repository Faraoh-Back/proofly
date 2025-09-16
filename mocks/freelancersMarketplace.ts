// mocks/freelancersMarketplace.ts

import { FreelanceProfile } from '../types/freelancer';

export const mockFreelancersMarketplace: FreelanceProfile[] = [
  {
    id: '1',
    developerId: 'dev-001',
    developerName: 'Alex Chen',
    developerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    headline: 'Senior Smart Contract Developer',
    location: 'San Francisco, CA',
    availabilityStatus: 'Open to Work',
    hourlyRate: 150,
    rating: 4.9,
    completedProjects: 24,
    responseTime: '2 hours',
    services: [
      {
        id: '1',
        title: 'Smart Contract Auditing',
        description: 'Comprehensive security audits for Solidity smart contracts, including gas optimization and vulnerability assessment.'
      },
      {
        id: '2',
        title: 'DeFi Protocol Development',
        description: 'Full-stack development of decentralized finance protocols, including AMMs, lending platforms, and yield farming.'
      }
    ],
    topSkills: ['Solidity', 'Web3.js', 'DeFi', 'Security Auditing'],
    portfolio: [
      {
        id: '1',
        title: 'DeFiSwap Protocol',
        description: 'A decentralized exchange protocol with automated market making and liquidity mining features.',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
        projectUrl: 'https://github.com/defiswap-protocol',
        relatedBadges: []
      }
    ],
    testimonials: []
  },
  {
    id: '2',
    developerId: 'dev-002',
    developerName: 'Sarah Rodriguez',
    developerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
    headline: 'Full Stack Web3 Developer',
    location: 'Berlin, Germany',
    availabilityStatus: 'Open to Work',
    hourlyRate: 120,
    rating: 4.8,
    completedProjects: 18,
    responseTime: '1 hour',
    services: [
      {
        id: '3',
        title: 'NFT Marketplace Development',
        description: 'End-to-end NFT marketplace solutions with minting, trading, and royalty management capabilities.'
      },
      {
        id: '4',
        title: 'Web3 Frontend Integration',
        description: 'Modern React/Next.js applications with seamless Web3 wallet integration and blockchain interactions.'
      }
    ],
    topSkills: ['React', 'Next.js', 'NFTs', 'IPFS'],
    portfolio: [
      {
        id: '2',
        title: 'CryptoArt NFT Marketplace',
        description: 'A premium NFT marketplace focusing on digital art with advanced filtering and auctions.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
        projectUrl: 'https://cryptoart-marketplace.demo',
        relatedBadges: []
      }
    ],
    testimonials: []
  },
  {
    id: '3',
    developerId: 'dev-003',
    developerName: 'Marcus Johnson',
    developerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    headline: 'Blockchain Infrastructure Specialist',
    location: 'Toronto, Canada',
    availabilityStatus: 'Booked',
    hourlyRate: 180,
    rating: 5.0,
    completedProjects: 31,
    responseTime: '4 hours',
    services: [
      {
        id: '5',
        title: 'Cross-Chain Bridge Development',
        description: 'Secure cross-chain bridge protocols enabling asset transfers between different blockchains.'
      },
      {
        id: '6',
        title: 'Blockchain Node Setup',
        description: 'Professional setup and maintenance of blockchain nodes with monitoring and security.'
      }
    ],
    topSkills: ['Rust', 'Go', 'Cross-Chain', 'DevOps'],
    portfolio: [
      {
        id: '3',
        title: 'MultiChain Bridge Protocol',
        description: 'Cross-chain bridge enabling secure asset transfers between Ethereum, Polygon, and BSC.',
        imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
        projectUrl: 'https://multichain-bridge.xyz',
        relatedBadges: []
      }
    ],
    testimonials: []
  },
  {
    id: '4',
    developerId: 'dev-004',
    developerName: 'Elena Popov',
    developerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    headline: 'DApp Security Expert',
    location: 'Prague, Czech Republic',
    availabilityStatus: 'Open to Work',
    hourlyRate: 140,
    rating: 4.9,
    completedProjects: 22,
    responseTime: '3 hours',
    services: [
      {
        id: '7',
        title: 'Smart Contract Security Auditing',
        description: 'Comprehensive security audits using automated tools and manual review processes.'
      },
      {
        id: '8',
        title: 'Penetration Testing for DApps',
        description: 'Full security assessment of decentralized applications and their smart contracts.'
      }
    ],
    topSkills: ['Security', 'Solidity', 'Auditing', 'Testing'],
    portfolio: [],
    testimonials: []
  },
  {
    id: '5',
    developerId: 'dev-005',
    developerName: 'David Kim',
    developerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    headline: 'GameFi & Metaverse Developer',
    location: 'Seoul, South Korea',
    availabilityStatus: 'Not Available',
    hourlyRate: 160,
    rating: 4.7,
    completedProjects: 15,
    responseTime: '6 hours',
    services: [
      {
        id: '9',
        title: 'GameFi Development',
        description: 'Play-to-earn games with tokenomics, NFT integration, and blockchain mechanics.'
      },
      {
        id: '10',
        title: 'Metaverse Platform Development',
        description: 'Virtual worlds with land ownership, avatars, and economic systems.'
      }
    ],
    topSkills: ['Unity', 'GameFi', 'NFTs', 'Metaverse'],
    portfolio: [],
    testimonials: []
  }
];