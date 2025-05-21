
export interface InactiveUser {
  id: string;
  name: string;
  email: string;
  inactiveSince: string; // ISO date string
  assignedTo?: string;
  nudged: boolean;
}

export interface EnrichedUser {
  id: string;
  name: string;
  email: string;
  news: string;
  enrichedAt: string; // ISO date string
  assignedTo?: string;
  dismissed: boolean;
}
