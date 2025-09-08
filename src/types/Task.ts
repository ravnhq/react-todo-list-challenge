type PriorityTask = 'low' | 'normal' | 'high' | 'urgent';
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: PriorityTask;
  dueDate: string;
  storyPoints: number;
  assignedTo: string[];

  //for filter and history purspose
  createdAt: string;
  updatedAt: string;
};
