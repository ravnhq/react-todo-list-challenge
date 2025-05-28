export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export type Task = {
  id: string;
  name: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  storyPoints: number;
  assignee: string;
  dueDate: string;
  completed: boolean;
};

export type ToDoFormProps = {
  onAddTask: (task: Omit<Task, "id">) => void;
};

export type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
};

export type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
};

export type TaskSearchProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export type SidebarProps = {
  onChangeView: (view: "tasks" | "create") => void;
  activeView: "tasks" | "create";
};