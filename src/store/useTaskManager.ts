import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskElement = {
  id: string;
  taskName: string;
  priority: string;
  storyPoints: number;
  assignee: string;
  dueDate: Date;
  done: boolean;
};

type TaskInput = Omit<TaskElement, "id">;

type Elements = {
  tasks: TaskElement[];
  addNewTask: (newTask: TaskInput) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getFilteredTasks: () => TaskElement[];
  toggleTaskDone: (taskId: string) => void;
};

export const useTaskManager = create<Elements>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchTerm: "",
      addNewTask: (newTask: TaskInput) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...newTask,
              id: crypto.randomUUID(),
            },
          ],
        })),
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      getFilteredTasks: () => {
        const { tasks, searchTerm } = get();
        if (!searchTerm.trim()) return tasks;

        const term = searchTerm.toLowerCase();
        return tasks.filter(
          (task) =>
            task.taskName.toLowerCase().includes(term) ||
            task.assignee.toLowerCase().includes(term),
        );
      },
      toggleTaskDone: (taskId: string) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task,
          ),
        })),
    }),
    {
      name: "tasks-storage",
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          dueDate: task.dueDate.toISOString(),
        })),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.tasks = state.tasks.map((task: TaskElement) => ({
            ...task,
            dueDate: new Date(task.dueDate),
          }));
        }
      },
    },
  ),
);
