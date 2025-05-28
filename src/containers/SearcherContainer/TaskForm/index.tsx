import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.scss";
import { ModalComponent } from "../../../components";
import { taskSchema, type TaskFormData } from "../../../schemas/taskSchema";
import { v4 as uuidv4 } from "uuid";
import { useTaskStore } from "../../../stores/taskStore";

type TaskFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TaskForm = ({ isOpen, onClose }: TaskFormProps) => {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    addTask({ ...data, id: uuidv4() });
    onClose();
    reset();
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new Task</h2>

        <label>Task Name:</label>
        <input type="text" {...register("taskName")} />
        {errors.taskName && <p className="error">{errors.taskName.message}</p>}

        <label>Priority:</label>
        <select {...register("priority")}>
          <option value="">Select One</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        {errors.priority && <p className="error">{errors.priority.message}</p>}

        <label>Story Points:</label>
        <input
          type="number"
          {...register("storyPoints", { valueAsNumber: true })}
        />
        {errors.storyPoints && (
          <p className="error">{errors.storyPoints.message}</p>
        )}

        <label>Assignee:</label>
        <input type="text" {...register("assignee")} />
        {errors.assignee && <p className="error">{errors.assignee.message}</p>}

        <label>Due Date:</label>
        <input type="date" {...register("dueDate")} />
        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}

        <button type="submit">Save Task</button>
      </form>
    </ModalComponent>
  );
};
