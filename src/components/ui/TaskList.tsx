import TaskBox from "./TaskBox";
import type { Task } from "../../utils/types";
import { getFromLocalStorage } from "../../utils/localStorage";
import { TaskListProps } from "../../utils/types";
import TableHeader from "./TableHeader";

export default function TaskList({ title, filterCondition }: TaskListProps) {
  const localStorageTasks =
    getFromLocalStorage("tasks").filter(filterCondition);

  return (
    <main className="bg-whiteDefault flex flex-col items-center">
      <div className="border-accent mb-4 flex h-20 w-3/4 items-center justify-between border-b">
        <h2 className="text-blueDefault flex cursor-default items-center text-4xl">
          {title}
        </h2>
      </div>
      <ul className="flex w-full flex-col items-center">
        <TableHeader />
        {localStorageTasks
          .sort((a: Task, _: Task) => (a.priority === "Urgent" ? -1 : 1))
          .map((task: Task) => (
            <TaskBox
              key={task.id}
              id={task.id}
              name={task.taskName}
              priority={task.priority}
              points={task.storyPoints}
              asignee={task.asignee}
              dueDate={task.dueDate}
              isCompleted={task.isCompleted}
            />
          ))}
      </ul>
    </main>
  );
}
