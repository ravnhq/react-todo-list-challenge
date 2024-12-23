import { z } from "zod";
import { todoSchema } from "../schemas/todoSchema";

export type Todo = z.infer<typeof todoSchema>;
