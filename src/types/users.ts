
export interface InactiveUser {
  id: string;
  name: string;
  email: string;
  company: string; // Added company field
  inactiveSince: string; // ISO date string
  assignedTo?: string;
  nudged: boolean;
  fading?: boolean; // For animation when removing
}

export interface EnrichedUser {
  id: string;
  name: string;
  email: string;
  company: string; // Added company field
  news: string;
  enrichedAt: string; // ISO date string
  assignedTo?: string;
  dismissed: boolean;
  fading?: boolean; // For animation when removing
}
