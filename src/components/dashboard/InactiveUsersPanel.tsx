
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import CopyButton from "@/components/CopyButton";
import TagSelector from "@/components/TagSelector";
import { InactiveUser } from "@/types/users";
import { Badge } from "@/components/ui/badge";

interface InactiveUsersPanelProps {
  users: InactiveUser[];
  assignees: string[];
  onUserTagged: (userId: string, assignee: string) => void;
  onUserNudged: (userId: string, isNudged: boolean) => void;
}

const InactiveUsersPanel = ({ 
  users, 
  assignees,
  onUserTagged,
  onUserNudged
}: InactiveUsersPanelProps) => {
  // Filter to show only non-nudged users or those that haven't faded out yet
  const [visibleUsers, setVisibleUsers] = useState<InactiveUser[]>(users);
  
  // Update visible users when the users prop changes
  useEffect(() => {
    setVisibleUsers(users.filter(user => !user.nudged));
  }, [users]);

  const handleUserNudged = (userId: string, isNudged: boolean) => {
    if (isNudged) {
      // Find the user to fade out
      const userToFade = visibleUsers.find(user => user.id === userId);
      if (userToFade) {
        // Mark the user to fade out
        setVisibleUsers(prev => 
          prev.map(user => user.id === userId ? { ...user, fading: true } : user)
        );
        
        // After the animation completes, remove the user from the visible list
        setTimeout(() => {
          setVisibleUsers(prev => prev.filter(user => user.id !== userId));
        }, 500); // 500ms to match the CSS transition
      }
    }
    
    // Call the original handler
    onUserNudged(userId, isNudged);
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Inactive Users (1+ Month)</CardTitle>
        <Badge variant="outline" className="bg-primary/10 ml-auto">
          {users.filter(user => !user.nudged).length}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium">
            <div className="col-span-4 md:col-span-3">Name</div>
            <div className="col-span-5 md:col-span-5">Email</div>
            <div className="hidden md:block md:col-span-2 text-center">Tag</div>
            <div className="hidden md:block md:col-span-2 text-center">Nudged</div>
          </div>
          <div className="divide-y">
            {visibleUsers.map((user) => (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-all duration-500 ${user.fading ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="col-span-4 md:col-span-3 font-medium">
                  <div className="truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.company}</div>
                </div>
                <div className="col-span-5 md:col-span-5 flex items-center gap-1 truncate">
                  <span className="truncate">{user.email}</span>
                  <CopyButton value={user.email} className="ml-auto md:ml-2" />
                </div>
                <div className="col-span-6 md:col-span-2 flex justify-center mt-2 md:mt-0">
                  <TagSelector
                    assignees={assignees}
                    defaultValue={user.assignedTo}
                    onSelect={(assignee) => onUserTagged(user.id, assignee)}
                  />
                </div>
                <div className="col-span-6 md:col-span-2 flex justify-center mt-2 md:mt-0">
                  <Checkbox
                    checked={user.nudged}
                    onCheckedChange={(checked) => 
                      handleUserNudged(user.id, checked as boolean)
                    }
                  />
                </div>
              </div>
            ))}
            
            {visibleUsers.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                No inactive users found
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InactiveUsersPanel;
