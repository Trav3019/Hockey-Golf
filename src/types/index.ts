export type LeagueType = 'nhl' | 'ahl' | 'junior' | 'european' | 'international';

export interface League {
  id: string;
  name: string;
  abbreviation: string;
  country: string;
  type: LeagueType;
  color: string;
  textColor: string;
  bgClass: string;
  emoji: string;
  description: string;
}

export type Position = 'C' | 'LW' | 'RW' | 'D' | 'G';

export interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: Position;
  number: number;
  teamName: string;
  leagueId: string;
  nationality: string;
  nationalityFlag: string;
  birthYear: number;
  eliteProspectsId?: number;
}

export interface GolfRound {
  id: string;
  playerId: string;
  date: string;
  courseName: string;
  courseRating: number;
  slopeRating: number;
  grossScore: number;
  scoreDifferential: number;
  notes?: string;
  scorecardImage?: string;
}

export interface HandicapData {
  index: number | null;
  trend: 'improving' | 'declining' | 'stable';
  roundsCount: number;
  bestDifferential: number | null;
  lastUpdated: string | null;
  neededRounds: number;
}

export interface EPPlayer {
  id: number;
  firstName: string;
  lastName: string;
  position: { code: string };
  team?: {
    id: number;
    name: string;
    league?: { id: number; name: string; slug: string };
  };
  nationality?: { name: string; iso2: string };
  dateOfBirth?: string;
  imageUrl?: string;
  latestStats?: {
    league?: { id: number; name: string; slug: string };
    team?: { id: number; name: string };
  };
}

export interface EPLeague {
  id: number;
  name: string;
  slug: string;
  country?: { name: string; iso2: string };
}
