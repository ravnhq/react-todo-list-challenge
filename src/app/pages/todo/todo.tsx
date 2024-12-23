import Card from "../../../components/ui/card/card";
import { useTodoStore } from "../../../store/todo/todo-store";
import TodoSection from "../../../components/ui/todo-section/todo-section";
import NoTodos from "../../../components/no-todos/no-todos";

export default function Todo() {
  const todos = useTodoStore((state) => state.todos);
  const hasNoCompletedTodos = todos.filter((todo) => todo.completed === false);

  return (
    <TodoSection title="Tasks">
      {hasNoCompletedTodos.length > 0 ? (
        hasNoCompletedTodos.map((card) => <Card {...card} key={card.id} />)
      ) : (
        <NoTodos text="You don't have any tasks yet! Why not create your first to-do and get started? 😊📝" />
      )}
    </TodoSection>
  );
}
