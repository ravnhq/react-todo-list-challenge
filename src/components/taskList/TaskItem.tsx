import type { TaskItemProps } from "../../types/types";
import "./taskItem.css";

const TaskItem = ({ task, onToggleComplete }: TaskItemProps) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <h3 className="task-title">{task.name}</h3>
        <p className="task-meta">Priority: {task.priority}</p>
        <p className="task-due">Due: {task.dueDate}</p>
        <p className="task-points">Story Points: {task.storyPoints}</p>
        <p className="task-assignee">Assignee: {task.assignee}</p>
      </div>
      <button
        className="task-complete"
        onClick={() => onToggleComplete(task.id)}
        title={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        ✔
      </button>
    </div>
  );
};

export default TaskItem;
