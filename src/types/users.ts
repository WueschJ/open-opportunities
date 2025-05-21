
export interface InactiveUser {
  id: string;
  name: string;
  email: string;
  inactiveSince: string; // ISO date string
  assignedTo?: string;
  nudged: boolean;
  fading?: boolean; // For animation when removing
}

export interface EnrichedUser {
  id: string;
  name: string;
  email: string;
  news: string;
  enrichedAt: string; // ISO date string
  assignedTo?: string;
  dismissed: boolean;
  fading?: boolean; // For animation when removing
}
