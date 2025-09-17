import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormData } from "../schemas/taskSchema";

type TaskFormProps = {
  onSubmit: (data: TaskFormData) => void;
};

const priorities = [
  { value: "", label: "Select priority" },
  { value: "High", label: "High" },
  { value: "Normal", label: "Normal" },
  { value: "Low", label: "Low" },
];
export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
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
          {priorities.map((i) => {
            return <option value={i.value}>{i.label}</option>;
          })}
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
