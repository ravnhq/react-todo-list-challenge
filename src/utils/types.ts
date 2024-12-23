import { UseFormRegister } from "react-hook-form";
import { FieldError } from "react-hook-form";

export interface FormFieldProps {
  label: string;
  id: string;
  type: "text" | "number" | "date" | "select";
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface Task {
  id: string;
  taskName: string;
  priority: string;
  storyPoints: number;
  asignee: string;
  dueDate: string;
  isCompleted: boolean;
}

export interface TaskBoxProps {
  id: string;
  name: string;
  priority: string;
  points: number;
  asignee: string;
  dueDate: string;
  isCompleted?: boolean;
}

export interface DialogProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface FormFieldProps {
  label: string;
  id: string;
  type: "text" | "number" | "date" | "select";
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface TaskListProps {
  title: string;
  filterCondition: (task: Task) => boolean;
}
