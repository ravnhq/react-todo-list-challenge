import { z } from "zod";

export const priorityEnum = ["Urgent", "High", "Normal", "Low"] as const;

export const todoSchema = z.object({
 taskName: z.string()
   .min(5, "Task name must be at least 5 characters")
   .max(30, "Task name must not exceed 30 characters"),
 priority: z.enum(priorityEnum),
 storyPoints: z.number()
   .int()
   .min(1, "Story points must be at least 1")
   .max(20, "Story points must not exceed 20"),
 assignee: z.string()
   .regex(/^[A-Za-z\s]+$/, "Assignee must contain only letters and spaces"),
 dueDate: z.date()
   .min(new Date(), "Due date must be in the future")
});