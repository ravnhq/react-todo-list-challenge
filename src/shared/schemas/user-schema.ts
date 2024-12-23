import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Assignee must contain only letters and spaces.")
    .nonempty("Assignee is required."),
});

export type User = z.infer<typeof UserSchema>;
