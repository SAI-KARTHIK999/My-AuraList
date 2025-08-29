'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  addTask: (text: string, isDaily: boolean) => void;
}

export function AddTaskForm({ addTask }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [isDaily, setIsDaily] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, isDaily);
      setText('');
      setIsDaily(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Launch a new task..."
          className="flex-grow bg-card/70 border-primary/30 text-base md:text-lg h-12 focus:ring-accent focus:ring-offset-background"
        />
        <Button
          type="submit"
          size="icon"
          className="h-12 w-full md:w-12 flex-shrink-0 bg-primary/80 text-primary-foreground hover:bg-primary transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_hsl(var(--primary))] active:scale-95"
          aria-label="Add Task"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center space-x-2 self-start md:self-end pt-1">
        <Checkbox 
          id="daily-task" 
          checked={isDaily}
          onCheckedChange={() => setIsDaily(!isDaily)}
          className="peer h-4 w-4 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        <Label
          htmlFor="daily-task"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
        >
          Make this a daily recurring task
        </Label>
      </div>
    </form>
  );
}
