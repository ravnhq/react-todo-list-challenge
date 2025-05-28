import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TaskFormData } from "../schemas/taskSchema";

export type Task = TaskFormData & {
  id: string;
  isFinished: boolean;
};

type TaskState = {
  tasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addTask: (task: TaskFormData & { id: string }) => void;
  removeTask: (id: string) => void;
  toggleFinished: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, isFinished: false }],
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleFinished: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isFinished: !task.isFinished } : task
          ),
        })),
    }),
    {
      name: "task-storage",
    }
  )
);
