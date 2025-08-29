'use client';

import { useState } from 'react';
import type { Task } from '@/types/task';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiTaskPrioritizer } from '@/ai/flows/ai-task-prioritizer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit, Loader2, Wand2 } from 'lucide-react';

interface AiPrioritizerDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdatePriority: (id: string, priorityData: Partial<Pick<Task, 'priorityScore' | 'reasoning' | 'suggestedAction'>>) => void;
}

const prioritySchema = z.object({
  deadline: z.string().optional(),
  importance: z.enum(['High', 'Medium', 'Low']).optional(),
  urgency: z.enum(['Immediate', 'Soon', 'Later']).optional(),
  context: z.string().max(500, 'Context is too long').optional(),
});

type PriorityFormData = z.infer<typeof prioritySchema>;

export function AiPrioritizerDialog({ task, open, onOpenChange, onUpdatePriority }: AiPrioritizerDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<PriorityFormData>({
    resolver: zodResolver(prioritySchema),
  });

  const onSubmit = async (data: PriorityFormData) => {
    setIsPending(true);
    try {
      const result = await aiTaskPrioritizer({
        taskName: task.text,
        ...data,
      });
      onUpdatePriority(task.id, result);
      toast({
        title: "✨ AI Analysis Complete",
        description: `Task "${task.text}" has been assigned a priority of ${result.priorityScore}.`,
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('AI prioritization failed', error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'Failed to get priority from AI. Please try again.',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-popover/80 backdrop-blur-sm border-accent/50 text-popover-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-accent">
            <BrainCircuit className="h-6 w-6" />
            AI Task Prioritizer
          </DialogTitle>
          <DialogDescription>
            Provide more context for "{task.text}" to get an AI-powered priority score.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="importance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select importance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Immediate">Immediate</SelectItem>
                        <SelectItem value="Soon">Soon</SelectItem>
                        <SelectItem value="Later">Later</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Context</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., This is for a critical client project..." {...field} className="bg-background/50"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="bg-accent text-background hover:bg-accent/90">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Analyze Priority
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
