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
  badgeRarity?: 'common' | 'rare' | 'epic' | 'legendary';
}
