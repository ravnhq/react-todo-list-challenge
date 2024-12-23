import { create } from "zustand";
import { Todo } from "../../interfaces/todo.interface";

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const persistState = <T>(key: string, initialValue: T): T => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : initialValue;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: persistState<Todo[]>("todos", []),
  addTodo: (todo) => {
    const newTodo = { ...todo, completed: false };
    const updatedTodos = [...get().todos, newTodo];
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  toggleTodo: (id) => {
    const updatedTodos = get().todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
  removeTodo: (id) => {
    const updatedTodos = get().todos.filter((todo) => todo.id !== id);
    set({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
}));
