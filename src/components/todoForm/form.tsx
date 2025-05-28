import './form.css'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ToDoFormProps } from '../../types/types';

const todoSchema = z.object({
  todoName: z.string()
    .min(5, "Task name must be at least 5 characters")
    .max(30, "Task name must be at most 30 characters"),
  priority: z.enum(["Urgent", "High", "Normal", "Low"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
  storyPoints: z.number()
    .int("Must be an integer")
    .min(1, "Must be at least 1")
    .max(20, "Must be at most 20"),
  assignee: z.string()
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces allowed")
    .min(1, "Assignee is required"),
  dueDate: z.string()
    .refine(dateStr => {
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) && date > new Date();
    }, { message: "Due date must be a valid future date" }),
});

type ToDoFormData = z.infer<typeof todoSchema>;

export const ToDoForm = ({ onAddTask }: ToDoFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ToDoFormData>({ resolver: zodResolver(todoSchema)});
    const onSubmit = (data: ToDoFormData) => {
    onAddTask({
      name: data.todoName,
      priority: data.priority,
      storyPoints: data.storyPoints,
      assignee: data.assignee,
      dueDate: data.dueDate,
      completed: false
    });
  };
    return (
    <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
      <h2 className="form-title">Add a New Task</h2>
      <div className="form-group">
        <label>Task Name</label>
        <input {...register("todoName")} className="form-input" />
      </div>
      {errors.todoName && <p className="form-error">{errors.todoName.message}</p>}
      <div className="form-group">
        <label>Priority</label>
        <select {...register("priority")} className="form-select">
          <option value="">Select Priority</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {errors.priority && <p className="form-error">{errors.priority.message}</p>}
      <div className="form-group">
        <label>Story Points</label>
        <input type="number" {...register("storyPoints", { valueAsNumber: true })} className="form-input" />
      </div>
      {errors.storyPoints && <p className="form-error">{errors.storyPoints.message}</p>}
      <div className="form-group">
        <label>Assignee</label>
        <input {...register("assignee")} className="form-input" />
      </div>
      {errors.assignee && <p className="form-error">{errors.assignee.message}</p>}
      <div className="form-group">
        <label>Due Date</label>
        <input type="date" {...register("dueDate")} className="form-input" />
      </div>
      {errors.dueDate && <p className="form-error">{errors.dueDate.message}</p>}
      <button type="submit" className="form-submit-btn">Submit Task</button>
    </form>
  );
}