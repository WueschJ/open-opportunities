
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
import InactiveUsersPanel from "./InactiveUsersPanel";
import EnrichedUsersPanel from "./EnrichedUsersPanel";
import { toast } from "sonner";

const Dashboard = () => {
  const [inactiveUsers, setInactiveUsers] = useState<InactiveUser[]>([]);
  const [enrichedUsers, setEnrichedUsers] = useState<EnrichedUser[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);

  useEffect(() => {
    // Load initial data
    setInactiveUsers(getInactiveUsers());
    setEnrichedUsers(getEnrichedUsers());
    setAssignees(getTeamMembers());
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
    
    toast.success(dismissed ? "News dismissed" : "News restored");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Open Opportunities</h1>
      
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
