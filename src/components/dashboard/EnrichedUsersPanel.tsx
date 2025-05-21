
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import CopyButton from "@/components/CopyButton";
import TagSelector from "@/components/TagSelector";
import { EnrichedUser } from "@/types/users";
import { Badge } from "@/components/ui/badge";

interface EnrichedUsersPanelProps {
  users: EnrichedUser[];
  assignees: string[];
  onUserTagged: (userId: string, assignee: string) => void;
  onUserDismissed: (userId: string, isDismissed: boolean) => void;
}

const EnrichedUsersPanel = ({ 
  users, 
  assignees,
  onUserTagged,
  onUserDismissed
}: EnrichedUsersPanelProps) => {
  // Filter to show only non-dismissed users or those that haven't faded out yet
  const [visibleUsers, setVisibleUsers] = useState<EnrichedUser[]>(users);
  
  // Update visible users when the users prop changes
  useEffect(() => {
    setVisibleUsers(users.filter(user => !user.dismissed));
  }, [users]);

  const handleUserDismissed = (userId: string, isDismissed: boolean) => {
    if (isDismissed) {
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
    onUserDismissed(userId, isDismissed);
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recently Enriched Users</CardTitle>
        <Badge variant="outline" className="bg-primary/10 ml-auto">
          {users.filter(user => !user.dismissed).length}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="p-4 bg-muted/50 font-medium">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 md:col-span-3">Name</div>
              <div className="hidden md:block md:col-span-2">Company</div>
              <div className="col-span-5 md:col-span-3">Email</div>
              <div className="hidden md:block md:col-span-2 text-center">Tag</div>
              <div className="hidden md:block md:col-span-2 text-center">Dismiss</div>
            </div>
          </div>
          <div className="divide-y">
            {visibleUsers.map((user) => (
              <div 
                key={user.id} 
                className={`p-4 transition-all duration-500 ${user.fading ? 'opacity-0' : 'opacity-100'}`}
              >
                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                  <div className="col-span-4 md:col-span-3 font-medium truncate">
                    {user.name}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground truncate">
                    {user.company}
                  </div>
                  <div className="col-span-5 md:col-span-3 flex items-center gap-1">
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
                      checked={user.dismissed}
                      onCheckedChange={(checked) => 
                        handleUserDismissed(user.id, checked as boolean)
                      }
                    />
                  </div>
                </div>
                <div className="bg-muted/20 p-3 rounded-md mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-primary/10">News</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.enrichedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{user.news}</p>
                </div>
              </div>
            ))}
            
            {visibleUsers.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">
                No enriched users found
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrichedUsersPanel;
