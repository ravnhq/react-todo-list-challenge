import { z } from "zod";

const taskSchema = z
  .object({
    taskName: z
      .string()
      .min(5, { message: "Task name must be at least 5 characters long" })
      .max(30, { message: "Task name must be at most 30 characters long" }),
    priority: z.enum(["Urgent", "High", "Medium", "Low"], {
      message: "Priority is required",
    }),
    storyPoints: z
      .string()
      .transform((val) => parseInt(val))
      .pipe(
        z
          .number()
          .int()
          .min(1, { message: "Must be equal or greater than 1" })
          .max(10, {
            message: "Story points must be at most 10",
          }),
      ),
    asignee: z.string().regex(/^[a-zA-Z\s]*$/, {
      message: "Only letters and spaces are allowed",
    }),
    dueDate: z
      .string()
      .transform((val) => new Date(val))
      .pipe(
        z.date().min(new Date(), { message: "Due date must be in the future" }),
      ),
    isCompleted: z.boolean().default(false),
  })
  .required();

export default taskSchema;
