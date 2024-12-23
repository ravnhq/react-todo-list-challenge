import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import type { TaskBoxProps, Task } from "../../utils/types";
import { FaRegSquare, FaRegSquareCheck } from "react-icons/fa6";
import { useState } from "react";

export default function TaskBox({
  name,
  priority,
  points,
  asignee,
  dueDate,
  isCompleted,
  id,
}: TaskBoxProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const formattedDate = new Date(dueDate).toLocaleDateString();

  const handleToggleComplete = () => {
    setCompleted((prev) => {
      const tasks = getFromLocalStorage("tasks");
      // Use strict ID comparison
      const updatedTasks = tasks.map((task: Task) =>
        task.id === id ? { ...task, isCompleted: !prev } : task,
      );
      saveToLocalStorage("tasks", updatedTasks);
      return !prev;
    });
  };

  return (
    <li
      className={`border-accent mb-3 flex h-9 w-3/4 items-center justify-between rounded-lg border px-2 ${
        priority === "Low"
          ? "bg-low hover:bg-[#bfebb2]"
          : priority === "Medium"
            ? "bg-mid hover:bg-[#ffed9c]"
            : priority === "High"
              ? "bg-high hover:bg-[#ffb3b3]"
              : priority === "Urgent"
                ? "text-#B91C1C border-black bg-[#a62a3f]"
                : ""
      } ${completed ? "opacity-25 hover:bg-none" : ""}`}
    >
      <div className="flex w-1/4 items-center">
        <button className="cursor-pointer" onClick={handleToggleComplete}>
          {completed ? <FaRegSquareCheck /> : <FaRegSquare />}
        </button>
        <h3 className="ml-2 text-left font-bold">{name}</h3>
      </div>
      <p className="w-1/4 text-center"> {points}</p>
      <p className="w-1/4 text-center"> {asignee}</p>
      <p className="w-1/4 text-right"> {formattedDate}</p>
    </li>
  );
}
