import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Task, type TaskFormData } from "../schemas/taskSchema";

type TaskState = {
  tasks: Task[];
  addTask: (task: TaskFormData) => void;
  toggleTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (data) =>
        set((state) => ({
          tasks: [...state.tasks, { id: crypto.randomUUID(), ...data }],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
    }),
    {
      name: "task-storage",
    }
  )
);
