import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STATUS } from "../schemas/status-schema";
import { Todo } from "../schemas/todo-schema";

interface TodoStore {
  todos: Todo[];
  searchQuery: string;
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
  searchTodos: (query: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      searchQuery: "",
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  status: todo.status === STATUS[1] ? STATUS[0] : STATUS[1],
                }
              : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setTodos: (todos) => set({ todos }),
      searchTodos: (query) => set({ searchQuery: query }),
    }),
    {
      name: "todos",
    }
  )
);
