'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  addTask: (text: string) => void;
}

export function AddTaskForm({ addTask }: AddTaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Launch a new task into the void..."
        className="flex-grow bg-card/70 border-primary/30 text-lg h-12 focus:ring-accent focus:ring-offset-background"
      />
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 flex-shrink-0 bg-primary/80 text-primary-foreground hover:bg-primary transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_hsl(var(--primary))] active:scale-95"
        aria-label="Add Task"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </form>
  );
}
