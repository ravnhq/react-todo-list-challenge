export interface Todo {
  id: string;
  name: string;
  subName: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  storyPoints: number;
  assignee: string;
  dueDate: string;
  completed?: boolean;
}
