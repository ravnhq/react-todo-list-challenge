export type Task = {
  id: string;
  name: string;
  priority: "urgent" | "high" | "normal" | "low";
  storyPoints: number;
  assignee: string;
  dueDate: string;
  completed: boolean;
};
