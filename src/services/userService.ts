
import { EnrichedUser, InactiveUser } from "@/types/users";

// Mock data for inactive users
const mockInactiveUsers: InactiveUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Tech Solutions Inc.",
    inactiveSince: "2023-04-15T10:30:00Z",
    assignedTo: "Alice",
    nudged: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.co",
    company: "Global Innovations",
    inactiveSince: "2023-04-01T08:15:00Z",
    assignedTo: undefined,
    nudged: false,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@techcorp.com",
    company: "TechCorp",
    inactiveSince: "2023-03-28T14:45:00Z",
    assignedTo: "Bob",
    nudged: false,
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    email: "e.rodriguez@startup.io",
    company: "StartUp.io",
    inactiveSince: "2023-04-10T09:20:00Z",
    assignedTo: undefined,
    nudged: false,
  },
  {
    id: "5",
    name: "James Wilson",
    email: "j.wilson@enterprise.com",
    company: "Enterprise Solutions",
    inactiveSince: "2023-03-22T11:05:00Z",
    assignedTo: "Charlie",
    nudged: true,
  },
];

// Mock data for enriched users
const mockEnrichedUsers: EnrichedUser[] = [
  {
    id: "101",
    name: "Olivia Davis",
    email: "o.davis@bigco.com",
    company: "BigCo Technologies",
    news: "Recently promoted to Senior Product Manager at BigCo. Has been featured in Tech Monthly magazine discussing industry trends.",
    enrichedAt: "2023-05-10T15:30:00Z",
    assignedTo: "Alice",
    dismissed: false,
  },
  {
    id: "102",
    name: "William Brown",
    email: "w.brown@newstartup.com",
    company: "InnovateTech",
    news: "Founded a new startup in the AI space that raised $2M in seed funding last month.",
    enrichedAt: "2023-05-08T09:45:00Z",
    assignedTo: undefined,
    dismissed: false,
  },
  {
    id: "103",
    name: "Sophia Martinez",
    email: "s.martinez@techgroup.org",
    company: "Tech Research Group",
    news: "Published a research paper on cloud computing security in the International Journal of Tech Security.",
    enrichedAt: "2023-05-12T13:15:00Z",
    assignedTo: "Bob",
    dismissed: true,
  },
];

// Available team members for assignment
const teamMembers = ["Alice", "Bob", "Charlie", "David", "Elena"];

// Get inactive users
export const getInactiveUsers = (): InactiveUser[] => {
  return [...mockInactiveUsers];
};

// Get enriched users
export const getEnrichedUsers = (): EnrichedUser[] => {
  return [...mockEnrichedUsers];
};

// Get team members
export const getTeamMembers = (): string[] => {
  return [...teamMembers];
};

// Get dashboard stats
export const getDashboardStats = () => {
  return {
    totalInactive: mockInactiveUsers.length,
    nudgedCount: mockInactiveUsers.filter(user => user.nudged).length,
    totalEnriched: mockEnrichedUsers.length,
    dismissedCount: mockEnrichedUsers.filter(user => user.dismissed).length,
  };
};

// Update functions would normally communicate with a backend API
// These are mock implementations that would be replaced in a real app

export const updateUserAssignment = (userId: string, assignee: string): void => {
  console.log(`Assigned user ${userId} to ${assignee}`);
  // In a real app: API call to update the user's assignment
};

export const updateUserNudged = (userId: string, nudged: boolean): void => {
  console.log(`Updated user ${userId} nudged status to ${nudged}`);
  // In a real app: API call to update the user's nudged status
};

export const updateUserDismissed = (userId: string, dismissed: boolean): void => {
  console.log(`Updated user ${userId} dismissed status to ${dismissed}`);
  // In a real app: API call to update the user's dismissed status
};
