import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Task name must be at least 5 characters" })
    .max(30, { message: "Task name must be at most 30 characters" }),

  priority: z
    .enum(["Urgent", "High", "Normal", "Low"])
    .refine((val) => !!val, { message: "Priority is required" }),

  storyPoints: z
    .number({ message: "Must be a number" })
    .int()
    .min(1, { message: "Minimum 1" })
    .max(20, { message: "Maximum 20" }),

  assignee: z
    .string()
    .regex(/^[A-Za-z\s]+$/, { message: "Only letters and spaces" })
    .min(1, { message: "Assignee is required" }),

  dueDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Must be a future date",
  }),

  completed: z.boolean().default(false),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export type Task = TaskFormData & { id: string };
