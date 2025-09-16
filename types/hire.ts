// types/hire.ts

// Supondo que já temos uma interface de usuário base
export interface BaseUser {
  user_id: string;
  user_name: string;
  avatarUrl: string;
}

// Interface para um Badge/NFT de reputação
export interface Badge {
  id: string;
  name: string;
  iconUrl: string; // URL para a imagem do badge
  description: string;
  issuedBy: string; // Ex: "ETHSamba Hackathon"
  category: 'hackathon' | 'certification' | 'project' | 'contribution'; // Categoria do badge
  rarity: 'common' | 'rare' | 'epic' | 'legendary'; // Raridade do badge
  earnedAt: string; // ISO 8601 format
}

// A interface completa do perfil do desenvolvedor para a página de contratação
export interface DeveloperProfile extends BaseUser {
  headline: string; // Ex: "Smart Contract Developer | Solidity & Rust"
  bio: string;
  skills: string[]; // Lista de hard skills, ex: ["NFT", "SmartContracts", "Tokenization", "Web3"]
  topBadges: Badge[]; // As 3 badges mais importantes do usuário
  totalBadges: number; // Total de badges conquistados
  yearsOfExperience: number;
  location: string;
  availability: 'available' | 'busy' | 'unavailable';
  hourlyRate?: number; // Taxa por hora (opcional)
  // Atributos futuros para a busca com IA
  attributes: {
    problemSolving: number; // score de 1 a 10
    collaboration: number; // score de 1 a 10
    innovation: number; // score de 1 a 10
    leadership: number; // score de 1 a 10
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  recentProjects: ProjectHighlight[];
}

// Interface para destacar projetos recentes
export interface ProjectHighlight {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  projectUrl?: string;
  githubUrl?: string;
  completedAt: string; // ISO 8601 format
}

// Interface para filtros de busca
export interface HireFilters {
  skills: string[];
  badges: string[];
  experience: {
    min: number;
    max: number;
  };
  availability: ('available' | 'busy' | 'unavailable')[];
  location: string[];
  hourlyRate?: {
    min: number;
    max: number;
  };
  attributes?: {
    problemSolving?: { min: number; max: number };
    collaboration?: { min: number; max: number };
    innovation?: { min: number; max: number };
    leadership?: { min: number; max: number };
  };
}

// Interface para resultado da busca
export interface SearchResult {
  developers: DeveloperProfile[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  appliedFilters: HireFilters;
}

// Interface para estatísticas da plataforma (para exibir na página)
export interface PlatformStats {
  totalDevelopers: number;
  totalBadges: number;
  totalHackathons: number;
  averageRating: number;
}

// Enum para ordenação dos resultados
export enum SortOption {
  RELEVANCE = 'relevance',
  BADGES_COUNT = 'badges_count',
  EXPERIENCE = 'experience',
  RATING = 'rating',
  RECENT_ACTIVITY = 'recent_activity'
}

// Interface para configuração de busca
export interface SearchConfig {
  query: string;
  filters: Partial<HireFilters>;
  sortBy: SortOption;
  page: number;
  limit: number;
}