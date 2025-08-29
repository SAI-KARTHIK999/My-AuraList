export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priorityScore?: number;
  reasoning?: string;
  suggestedAction?: string;
}
