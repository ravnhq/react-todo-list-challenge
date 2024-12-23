import { z } from "zod";

export const PRIORITIES = ["urgent", "high", "normal", "low"] as const;

export const PriorityEnum = z.enum(PRIORITIES, {
  errorMap: () => ({
    message: "Priority enum must be Urgent, High, Normal or Low",
  }),
});
export type PriorityEnum = z.infer<typeof PriorityEnum>;
