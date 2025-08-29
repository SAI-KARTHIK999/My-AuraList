'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterStatus = 'all' | 'active' | 'completed';

interface FilterControlsProps {
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}

const filters: { label: string; value: FilterStatus }[] = [
  { label: 'All Tasks', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function FilterControls({ filter, setFilter }: FilterControlsProps) {
  return (
    <div className="flex justify-center items-center gap-2 p-1 rounded-lg bg-card/50 border border-primary/20">
      {filters.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => setFilter(value)}
          variant="ghost"
          className={cn(
            'flex-grow md:flex-none transition-all duration-300 ease-in-out',
            filter === value
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_10px_hsl(var(--secondary))]'
              : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/20'
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
