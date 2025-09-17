import { CalendarIcon, PersonIcon, StarIcon } from "@radix-ui/react-icons";
import { type Task } from "../schemas/taskSchema";
import { useTaskStore } from "../store/taskStore";

interface TaskCardProps {
  task: Task;
}
export const TaskCard = ({ task }: TaskCardProps) => {
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card__main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-card__checkbox"
        />
        <div className="task-card__content">
          <div className="task-card__header">
            <h3 className="task-card__title">{task.name}</h3>
            <span
              className={`task-card__priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>
          <div className="task-card__meta">
            <span className="meta-item">
              <PersonIcon />
              {task.assignee}
            </span>
            <span className="meta-item">
              <StarIcon />
              {task.storyPoints}
            </span>
            <span className="meta-item">
              <CalendarIcon />
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
