import { z, ZodType } from "zod";
import { FormData } from "../../../interfaces/form.interface";

export const TodoSchema: ZodType<FormData> = z.object({
  id: z.string(),
  name: z
    .string()
    .min(5, { message: "Task Name must be at least 5 characters long." })
    .max(30, { message: "Task Name must not exceed 30 characters." })
    .nonempty({ message: "Task Name is required." }),
  subName: z
    .string()
    .min(5, { message: "Task Name must be at least 5 characters long." })
    .max(30, { message: "Task Name must not exceed 30 characters." })
    .nonempty({ message: "Task Name is required." }),

  priority: z.enum(["Urgent", "High", "Normal", "Low"], {
    message: "Priority must be one of: Urgent, High, Normal, or Low.",
  }),

  storyPoints: z
    .number({ invalid_type_error: "Story Points must be a number." })
    .int({ message: "Story Points must be an integer." })
    .min(1, { message: "Story Points must be at least 1." })
    .max(20, { message: "Story Points must not exceed 20." }),

  assignee: z
    .string()
    .regex(/^[A-Za-z\s]+$/, {
      message: "Assignee must contain only letters and spaces.",
    })
    .nonempty({ message: "Assignee is required." }),

  dueDate: z
    .string({ message: "Due Date must be a valid date." })
    .nonempty({ message: "Assignee is required." }),
});
