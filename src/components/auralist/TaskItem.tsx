'use client';

import { useState } from 'react';
import type { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Check, Edit, Save, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-2 md:gap-4 p-3 md:p-4 rounded-lg bg-card/50 border border-primary/10 transition-all duration-300 hover:border-primary/40 hover:bg-card/70',
        task.completed && 'bg-card/20'
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="peer h-5 w-5 md:h-6 md:w-6 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary"
      >
        <Check className="h-3 w-3 md:h-4 md:w-4 transition-all duration-500 ease-out-back scale-0 peer-data-[state=checked]:scale-100 peer-data-[state=checked]:animate-glow" />
      </Checkbox>

      {isEditing ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          className="flex-grow bg-background/50 text-sm md:text-base"
          autoFocus
        />
      ) : (
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            'flex-grow cursor-pointer text-foreground/90 transition-colors text-sm md:text-base break-words',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.text}
        </label>
      )}

      <div className="flex items-center gap-0 md:gap-1">
        {isEditing ? (
          <>
            <Button aria-label="Save task" size="icon" variant="ghost" onClick={handleEdit} className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-accent/10">
              <Save className="h-4 w-4" />
            </Button>
            <Button aria-label="Cancel editing" size="icon" variant="ghost" onClick={() => setIsEditing(false)} className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-accent/10">
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button aria-label="Edit task" size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-accent/10 transition-colors opacity-0 group-hover:opacity-100">
              <Edit className="h-4 w-4" />
            </Button>
            <Button aria-label="Delete task" size="icon" variant="ghost" onClick={() => onDelete(task.id)} className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
