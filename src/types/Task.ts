type PriorityTask = 'low' | 'normal' | 'high' | 'urgent';
export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: PriorityTask;
  dueDate: Date;
  storyPoints: number;
  assignedTo: string[];
};
