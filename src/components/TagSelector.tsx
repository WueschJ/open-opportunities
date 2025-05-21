
import { Check, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TagSelectorProps {
  assignees: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
}

const TagSelector = ({ assignees, defaultValue, onSelect }: TagSelectorProps) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
          <Tag className="h-4 w-4" />
          {selected || "Assign"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        {assignees.map((assignee) => (
          <DropdownMenuItem
            key={assignee}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              selected === assignee && "bg-primary/10"
            )}
            onClick={() => handleSelect(assignee)}
          >
            {assignee}
            {selected === assignee && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
