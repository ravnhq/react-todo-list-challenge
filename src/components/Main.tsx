import Dialog from "./ui/Dialog";
import Form from "./Form";
import { useState } from "react";
import { getFromLocalStorage } from "../utils/localStorage";
import TaskBox from "./ui/TaskBox";
import type { Task } from "../utils/types";
import TableHeader from "./ui/TableHeader";

export default function Main() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const localStorageTasks = getFromLocalStorage("tasks");

  return (
    <main className="bg-whiteDefault flex flex-col items-center">
      <div className="border-accent mb-4 flex h-20 w-3/4 items-center justify-between border-b">
        <h2 className="text-blueDefault flex cursor-default items-center text-4xl">
          Home
        </h2>
        <button
          onClick={openDialog}
          className="bg-accent h-10 w-10 rounded-full text-xl"
        >
          +
        </button>
      </div>
      <ul className="flex w-full flex-col items-center">
        <TableHeader />
        {localStorageTasks
          .sort((a: Task, _: Task) => (a.priority === "Urgent" ? -1 : 1))
          .map((task: Task, index: number) => (
            <TaskBox
              key={`${task.id}-${index}`}
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
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Add New Task">
        <Form onClose={closeDialog} />
      </Dialog>
    </main>
  );
}
