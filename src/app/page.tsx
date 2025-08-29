'use client';

import { useState, useMemo } from 'react';
import type { Task } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';
import { AddTaskForm } from '@/components/neondo/AddTaskForm';
import { FilterControls } from '@/components/neondo/FilterControls';
import { TaskList } from '@/components/neondo/TaskList';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/neondo/Icons';

type FilterStatus = 'all' | 'active' | 'completed';

export default function Home() {
  const { 
    tasks, 
    addTask, 
    editTask, 
    deleteTask, 
    toggleTask, 
    updateTaskPriority 
  } = useTasks();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    }).sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
  }, [tasks, filter]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <header className="flex flex-col items-center justify-center gap-4 text-center mb-8">
          <div className="flex items-center gap-4">
            <Icons.Logo />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_8px_hsl(var(--primary))]">
              NeonDo
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">Your futuristic task manager.</p>
        </header>

        <Card className="w-full bg-card/50 backdrop-blur-lg border-primary/20 shadow-2xl shadow-primary/10">
          <CardContent className="p-6">
            <AddTaskForm addTask={addTask} />
            <div className="my-6">
              <FilterControls filter={filter} setFilter={setFilter} />
            </div>
            <TaskList
              tasks={filteredTasks}
              onEdit={editTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onUpdatePriority={updateTaskPriority}
            />
          </CardContent>
        </Card>
        <footer className="text-center mt-8 text-muted-foreground text-sm">
          <p>Built for the future. Ctrl+B to toggle sidebar is a myth here.</p>
        </footer>
      </div>
    </main>
  );
}
