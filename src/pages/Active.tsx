import TaskList from "../components/ui/TaskList";
import type { Task } from "../utils/types";

export default function Active() {
  return (
    <TaskList
      title="Active Tasks"
      filterCondition={(task: Task) => !task.isCompleted}
    />
  );
}
