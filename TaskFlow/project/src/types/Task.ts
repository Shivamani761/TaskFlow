export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending';