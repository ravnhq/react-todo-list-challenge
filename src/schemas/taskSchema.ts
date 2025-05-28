import { z } from "zod";

export const taskSchema = z.object({
  taskName: z.string().min(5, "Min.5 characters").max(30, "Max. 30 characters"),
  priority: z.enum(["Urgent", "High", "Normal", "Low"], {
    errorMap: () => ({ message: "Select a priority" }),
  }),
  storyPoints: z
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be an integer number")
    .min(1, "Must be at least 1")
    .max(20, "Max. 20 points"),
  assignee: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Letters and spaces only")
    .min(1, "Space required"),
  dueDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date > now;
    },
    { message: "Must be a valid future date" }
  ),
});

export type TaskFormData = z.infer<typeof taskSchema>;
