import { Button } from "@/components/ui/button";
import { entityCopy } from "../constants";
import type { EntityType } from "../types";

interface EntityToggleProps {
  value: EntityType;
  onChange: (next: EntityType) => void;
}

const toggleOptions: { value: EntityType; label: string }[] = [
  { value: "post", label: entityCopy.post.label },
  { value: "user", label: entityCopy.user.label },
];

export const EntityToggle = ({ value, onChange }: EntityToggleProps) => {
  return (
    <div className="flex w-fit rounded-full border bg-muted/30 p-1">
      {toggleOptions.map((option) => {
        const isActive = option.value === value;
        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "primary" : "ghost"}
            size="sm"
            className="rounded-full px-5"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

