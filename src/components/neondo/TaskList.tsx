'use client';

import type { Task } from '@/types/task';
import { TaskItem } from '@/components/neondo/TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onUpdatePriority: (id: string, priorityData: Partial<Pick<Task, 'priorityScore' | 'reasoning' | 'suggestedAction'>>) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onEdit, onUpdatePriority }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks in this dimension.</p>
        <p>Add a task to begin your mission.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdatePriority={onUpdatePriority}
        />
      ))}
    </div>
  );
}
