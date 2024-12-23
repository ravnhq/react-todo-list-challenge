import Card from "../../../components/ui/card/card";
import { useTodoStore } from "../../../store/todo/todo-store";
import TodoSection from "../../../components/ui/todo-section/todo-section";
import NoTodos from "../../../components/no-todos/no-todos";

export default function CompletedTodo() {
  const todos = useTodoStore((state) => state.todos);
  const hasCompletedTodos = todos.filter((todo) => todo.completed === true);

  return (
    <TodoSection title="Completed Tasks">
      {hasCompletedTodos.length > 0 ? (
        hasCompletedTodos.map((card) => <Card {...card} key={card.id} />)
      ) : (
        <NoTodos text="You're doing great! Let's check off some to-dos and keep the momentum going! 💪✅" />
      )}
    </TodoSection>
  );
}
