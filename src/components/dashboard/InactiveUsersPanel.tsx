
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import CopyButton from "@/components/CopyButton";
import TagSelector from "@/components/TagSelector";
import { InactiveUser } from "@/types/users";

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
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Inactive Users (1+ Month): {users.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium">
            <div className="col-span-4 md:col-span-4">Name</div>
            <div className="col-span-5 md:col-span-4">Email</div>
            <div className="hidden md:block md:col-span-2 text-center">Tag</div>
            <div className="hidden md:block md:col-span-2 text-center">Nudged</div>
          </div>
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                <div className="col-span-4 md:col-span-4 font-medium truncate">
                  {user.name}
                </div>
                <div className="col-span-5 md:col-span-4 flex items-center gap-1 truncate">
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
                      onUserNudged(user.id, checked as boolean)
                    }
                  />
                </div>
              </div>
            ))}
            
            {users.length === 0 && (
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
