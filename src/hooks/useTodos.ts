import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { getTodos, saveTodos } from "../utils/localStorage";

export const useTodos = () => {
 const [todos, setTodos] = useState<Todo[]>([]);

 useEffect(() => {
   setTodos(getTodos());
 }, []);

 const addTodo = (todo: Todo) => {
   const newTodos = [...todos, todo];
   setTodos(newTodos);
   saveTodos(newTodos);
 };

 return { todos, addTodo };
};
