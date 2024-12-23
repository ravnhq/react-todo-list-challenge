import { z } from "zod";

export const STATUS = ["active", "completed"] as const;
export const StatusEnum = z.enum(STATUS).optional();
export type Status = z.infer<typeof StatusEnum>;
