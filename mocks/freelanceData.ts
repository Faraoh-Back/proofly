// mocks/freelanceData.ts

import { FreelanceProfile } from '../types/freelancer';

export const mockFreelanceProfile: FreelanceProfile = {
  availabilityStatus: 'Open to Work',
  hourlyRate: 150,
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
    },
    {
      id: '3',
      title: 'Web3 Frontend Integration',
      description: 'Modern React/Next.js applications with seamless Web3 wallet integration and blockchain interactions.'
    },
    {
      id: '4',
      title: 'NFT Marketplace Development',
      description: 'End-to-end NFT marketplace solutions with minting, trading, and royalty management capabilities.'
    }
  ],
  portfolio: [
    {
      id: '1',
      title: 'DeFiSwap Protocol',
      description: 'A decentralized exchange protocol with automated market making and liquidity mining features. Built with Solidity and integrated with multiple EVM chains.',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      projectUrl: 'https://github.com/defiswap-protocol',
      relatedBadges: [
        {
          id: '1',
          name: 'Solidity Expert',
          description: 'Advanced Solidity smart contract developer',
          rarity: 'legendary',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg',
          category: 'certification',
          issuedBy: 'Ethereum Foundation',
          earnedAt: '2023-08-15T00:00:00Z'
        },
        {
          id: '2',
          name: 'DeFi Pioneer',
          description: 'Early adopter and builder in DeFi space',
          rarity: 'epic',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg',
          category: 'project',
          issuedBy: 'DeFi Alliance',
          earnedAt: '2023-06-20T00:00:00Z'
        }
      ]
    },
    {
      id: '2',
      title: 'CryptoArt NFT Marketplace',
      description: 'A premium NFT marketplace focusing on digital art with advanced filtering, auctions, and creator royalties. Features include lazy minting and IPFS storage.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      projectUrl: 'https://cryptoart-marketplace.demo',
      relatedBadges: [
        {
          id: '3',
          name: 'NFT Developer',
          description: 'Specialized in NFT contract development',
          rarity: 'rare',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/OpenSea-Full-Logo_%28light%29.svg',
          category: 'project',
          issuedBy: 'OpenSea',
          earnedAt: '2023-09-10T00:00:00Z'
        },
        {
          id: '4',
          name: 'IPFS Integrator',
          description: 'Expert in decentralized storage solutions',
          rarity: 'rare',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png',
          category: 'certification',
          issuedBy: 'Protocol Labs',
          earnedAt: '2023-07-05T00:00:00Z'
        }
      ]
    },
    {
      id: '3',
      title: 'MultiChain Bridge Protocol',
      description: 'Cross-chain bridge enabling secure asset transfers between Ethereum, Polygon, and BSC. Includes automated relayers and fraud protection mechanisms.',
      imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop',
      projectUrl: 'https://multichain-bridge.xyz',
      relatedBadges: [
        {
          id: '5',
          name: 'Cross-Chain Expert',
          description: 'Specialist in multi-chain protocols',
          rarity: 'legendary',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg',
          category: 'certification',
          issuedBy: 'Polygon Academy',
          earnedAt: '2023-05-15T00:00:00Z'
        },
        {
          id: '6',
          name: 'Security Auditor',
          description: 'Certified smart contract security specialist',
          rarity: 'epic',
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Shield-check.svg',
          category: 'certification',
          issuedBy: 'ConsenSys Diligence',
          earnedAt: '2023-04-20T00:00:00Z'
        }
      ]
    }
  ],
  testimonials: [
    {
      id: '1',
      clientName: 'Sarah Chen',
      clientAvatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      clientCompany: 'DeFi Innovations Inc.',
      testimonial: 'Exceptional work on our DeFi protocol. The smart contracts were delivered on time, thoroughly tested, and optimized for gas efficiency. The security audit identified critical vulnerabilities that could have cost us millions.'
    },
    {
      id: '2',
      clientName: 'Marcus Rodriguez',
      clientAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      clientCompany: 'ArtBlock Studios',
      testimonial: 'Our NFT marketplace exceeded all expectations. The user experience is seamless, the smart contracts are rock solid, and the integration with IPFS works flawlessly. Highly recommend for any Web3 project.'
    }
  ]
};