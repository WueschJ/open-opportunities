
import { useState, useEffect } from "react";
import { 
  getInactiveUsers, 
  getEnrichedUsers, 
  getTeamMembers, 
  getDashboardStats,
  updateUserAssignment,
  updateUserNudged,
  updateUserDismissed
} from "@/services/userService";
import { InactiveUser, EnrichedUser } from "@/types/users";
import DashboardHeader from "./DashboardHeader";
import InactiveUsersPanel from "./InactiveUsersPanel";
import EnrichedUsersPanel from "./EnrichedUsersPanel";
import { toast } from "sonner";

const Dashboard = () => {
  const [inactiveUsers, setInactiveUsers] = useState<InactiveUser[]>([]);
  const [enrichedUsers, setEnrichedUsers] = useState<EnrichedUser[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalInactive: 0,
    nudgedCount: 0,
    totalEnriched: 0,
    dismissedCount: 0
  });

  useEffect(() => {
    // Load initial data
    setInactiveUsers(getInactiveUsers());
    setEnrichedUsers(getEnrichedUsers());
    setAssignees(getTeamMembers());
    setStats(getDashboardStats());
  }, []);

  const handleInactiveUserTagged = (userId: string, assignee: string) => {
    updateUserAssignment(userId, assignee);
    
    // Update local state
    setInactiveUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, assignedTo: assignee } : user
      )
    );
    
    toast.success(`Assigned ${assignee} to inactive user`);
  };

  const handleInactiveUserNudged = (userId: string, nudged: boolean) => {
    updateUserNudged(userId, nudged);
    
    // Update local state
    setInactiveUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, nudged } : user
      )
    );
    
    // Update stats
    setStats(prev => ({
      ...prev,
      nudgedCount: nudged 
        ? prev.nudgedCount + 1 
        : prev.nudgedCount - 1
    }));
    
    toast.success(nudged ? "User marked as nudged" : "User marked as not nudged");
  };

  const handleEnrichedUserTagged = (userId: string, assignee: string) => {
    updateUserAssignment(userId, assignee);
    
    // Update local state
    setEnrichedUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, assignedTo: assignee } : user
      )
    );
    
    toast.success(`Assigned ${assignee} to enriched user`);
  };

  const handleEnrichedUserDismissed = (userId: string, dismissed: boolean) => {
    updateUserDismissed(userId, dismissed);
    
    // Update local state
    setEnrichedUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, dismissed } : user
      )
    );
    
    // Update stats
    setStats(prev => ({
      ...prev,
      dismissedCount: dismissed 
        ? prev.dismissedCount + 1 
        : prev.dismissedCount - 1
    }));
    
    toast.success(dismissed ? "News dismissed" : "News restored");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      
      <DashboardHeader stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InactiveUsersPanel 
          users={inactiveUsers}
          assignees={assignees}
          onUserTagged={handleInactiveUserTagged}
          onUserNudged={handleInactiveUserNudged}
        />
        
        <EnrichedUsersPanel 
          users={enrichedUsers}
          assignees={assignees}
          onUserTagged={handleEnrichedUserTagged}
          onUserDismissed={handleEnrichedUserDismissed}
        />
      </div>
    </div>
  );
};

export default Dashboard;
