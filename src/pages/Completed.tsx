import TaskList from "../components/ui/TaskList";
import type { Task } from "../utils/types";

export default function Completed() {
  return (
    <TaskList
      title="Completed Tasks"
      filterCondition={(task: Task) => task.isCompleted}
    />
  );
}
