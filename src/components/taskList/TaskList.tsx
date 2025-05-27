import "./TaskList.css";
import type { TaskListProps } from "../../types/types";
import TaskItem from "./TaskItem";


export const TaskList = ({ tasks, onToggleComplete }: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TaskList;
