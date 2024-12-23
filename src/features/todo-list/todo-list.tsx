import { useTodoStore } from "../../shared/store/useTodoStore";
import { Todo } from "../todo/todo";
import styles from "./todo-list.module.scss";

export const TodoList = () => {
  const { todos } = useTodoStore();

  const activeTodos = todos.filter((todo) => todo.status === "active");
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <div className={`${styles.container} animate__animated animate__backInRight animate__faster animate__faster`}>
      <h2 className={styles.title}>Recent</h2>
      <h3>
        Active (<small>{activeTodos.length}</small>)
      </h3>
      <div className={`${styles.todos}`}>
        {activeTodos.map((todo) => (
          <Todo key={todo.id} data={todo} />
        ))}
      </div>
      <h3>
        Completed (<small>{completedTodos.length}</small>)
      </h3>
      <div className={`${styles.todos}`}>
        {completedTodos.map((todo) => (
          <Todo key={todo.id} data={todo} />
        ))}
      </div>
    </div>
  );
};
