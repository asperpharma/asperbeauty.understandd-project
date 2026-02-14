import { SKIN_CONCERNS } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

interface ConcernFilterProps {
  selected: string | null;
  onSelect: (concern: string | null) => void;
}

export function ConcernFilter({ selected, onSelect }: ConcernFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        className="rounded-full text-xs"
      >
        All
      </Button>
      {SKIN_CONCERNS.map((c) => (
        <Button
          key={c.value}
          variant={selected === c.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(selected === c.value ? null : c.value)}
          className="rounded-full text-xs"
        >
          {c.label}
        </Button>
      ))}
    </div>
  );
}
