import { FieldError, UseFormRegister } from "react-hook-form";

export interface FormData {
  id: string;
  name: string;
  subName: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  storyPoints: number;
  assignee: string;
  dueDate: string;
}

export interface FormFieldProps {
  type: string;
  placeholder?: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  label?: string;
}

export type ValidFieldNames =
  | "name"
  | "subName"
  | "priority"
  | "storyPoints"
  | "assignee"
  | "dueDate";
