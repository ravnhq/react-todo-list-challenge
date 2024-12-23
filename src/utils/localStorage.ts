import { Todo } from "../types/todo";

export const getTodos = (): Todo[] => {
 const todos = localStorage.getItem('todos');
 return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: Todo[]): void => {
 localStorage.setItem('todos', JSON.stringify(todos));
};