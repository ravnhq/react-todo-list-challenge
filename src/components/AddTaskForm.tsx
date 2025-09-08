import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormData } from "../schemas/taskSchema";

type TaskFormProps = {
  onSubmit: (data: TaskFormData) => void;
};
export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      completed: false,
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="form"
    >
      <div className="form-group">
        <label>Task Name</label>
        <input {...register("name")} placeholder="Enter a task name" />

        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select {...register("priority")}>
          <option value="">Select priority</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        {errors.priority && <p className="error">{errors.priority.message}</p>}
      </div>

      <div className="form-group">
        <label>Story Points</label>
        <input
          type="number"
          {...register("storyPoints", { valueAsNumber: true })}
        />
        {errors.storyPoints && (
          <p className="error">{errors.storyPoints.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Assignee</label>
        <input {...register("assignee")} placeholder="Enter assignee name" />
        {errors.assignee && <p className="error">{errors.assignee.message}</p>}
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input type="date" {...register("dueDate")} />
        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}
      </div>

      <button type="submit">Save Task</button>
    </form>
  );
};
