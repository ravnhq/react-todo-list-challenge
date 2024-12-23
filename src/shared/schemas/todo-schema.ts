import { z } from "zod";
import { UserSchema } from "./user-schema";
import { PriorityEnum } from "./priority-schema";
import { v4 as uuid4 } from "uuid";
import { STATUS, StatusEnum } from "./status-schema";

export const TodoSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string()
      .trim()
      .min(5, "Task Name must be at least 5 characters long.")
      .max(30, "Task Name must be at most 30 characters long.")
      .nonempty("Task Name is required."),
    priority: PriorityEnum,
    storyPoints: z.coerce
      .number()
      .int("Story points must be an integer")
      .min(1, "Story points must be at least 1")
      .max(20, "Story points must not exceed 20"),
    assignee: UserSchema.shape.name,
    dueDate: z.string().refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
    }, "Due Date must be a valid future date."),
    status: StatusEnum.default(STATUS[0]),
  })
  .transform((data) => {
    return {
      ...data,
      id: data.id || uuid4(),
    };
  });

export type Todo = z.infer<typeof TodoSchema>;
