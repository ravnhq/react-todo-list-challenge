import z from 'zod';

export type TodoFormData = z.infer<typeof todoNewTaskSchema>;
export const todoNewTaskSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(20, 'Title must be at most 20 characters'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  storyPoints: z
    .number()
    .min(1, 'Story points must be at least 1')
    .max(20, 'Story points must be at most 20'),
  assignedTo: z.array(z.string()).min(1, 'At least one assignee is required'),
  dueDate: z.string().refine(date => {
    const selectedDate = new Date(date);
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    return selectedDate >= today && selectedDate <= sixMonthsFromNow;
  }, 'Due date must be between today and 6 months from now'),
});
