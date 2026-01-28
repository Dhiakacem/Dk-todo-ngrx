export type TaskPriority = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string; 
  completed: boolean;
  createdAt: string; 
}

