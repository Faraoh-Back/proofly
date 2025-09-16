// types/freelancer.ts

import { Badge } from './hire'; // Reutiliza o tipo Badge já existente

export type AvailabilityStatus = 'Open to Work' | 'Booked' | 'Not Available';

export interface FreelanceService {
  id: string;
  title: string; // Ex: "Smart Contract Auditing"
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // URL da imagem de capa do projeto
  projectUrl: string; // Link para o projeto ao vivo ou repositório
  relatedBadges: Badge[]; // Badges da plataforma que foram relevantes para este projeto
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientAvatarUrl: string;
  clientCompany: string;
  testimonial: string;
}

export interface FreelanceProfile {
  id?: string; // Para marketplace
  developerId?: string; // ID do desenvolvedor
  developerName?: string; // Nome do desenvolvedor 
  developerAvatar?: string; // Avatar do desenvolvedor
  headline?: string; // Título profissional
  location?: string; // Localização
  rating?: number; // Avaliação média
  completedProjects?: number; // Projetos completados
  responseTime?: string; // Tempo de resposta
  topSkills?: string[]; // Principais habilidades
  availabilityStatus: AvailabilityStatus;
  hourlyRate?: number; // Opcional
  services: FreelanceService[];
  portfolio: PortfolioProject[];
  testimonials: ClientTestimonial[];
}