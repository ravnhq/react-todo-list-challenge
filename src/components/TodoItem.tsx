import { Todo } from "../types/todo";
import { ArrowUpWideNarrow, Goal, User, CalendarClock } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => (
  <div className="bg-white rounded p-4 shadow">
    <h3 className="font-semibold text-lg mb-2 truncate text-center">{todo.taskName}</h3>
    <div className="space-y-2">
      <p className="text-gray-600 overflow-hidden text-ellipsis flex items-center gap-2">
        <ArrowUpWideNarrow size={16} />
        Priority: {todo.priority}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <Goal size={16} />
        Story Points: {todo.storyPoints}
      </p>
      <p className="text-gray-600 overflow-hidden text-ellipsis flex items-center gap-2">
        <User size={16} />
        Assignee: {todo.assignee}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <CalendarClock size={16} />
        Due Date: {new Date(todo.dueDate).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default TodoItem;