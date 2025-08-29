'use client';

import { useState, useMemo } from 'react';
import type { Task } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';
import { AddTaskForm } from '@/components/auralist/AddTaskForm';
import { FilterControls } from '@/components/auralist/FilterControls';
import { TaskList } from '@/components/auralist/TaskList';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/auralist/Icons';

type FilterStatus = 'all' | 'active' | 'completed';

export default function Home() {
  const { 
    tasks, 
    addTask, 
    editTask, 
    deleteTask, 
    toggleTask, 
  } = useTasks();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="flex items-center gap-2 md:gap-4">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_8px_hsl(var(--primary))]">
              Aura List
            </h1>
          </div>
        </header>

        <Card className="w-full bg-card/50 backdrop-blur-lg border-primary/20 shadow-2xl shadow-primary/10">
          <CardContent className="p-4 md:p-6">
            <AddTaskForm addTask={addTask} />
            <div className="my-4 md:my-6">
              <FilterControls filter={filter} setFilter={setFilter} />
            </div>
            <TaskList
              tasks={filteredTasks}
              onEdit={editTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          </CardContent>
        </Card>
        <footer className="text-center mt-8 text-muted-foreground text-xs md:text-sm">
        </footer>
      </div>
    </main>
  );
}
