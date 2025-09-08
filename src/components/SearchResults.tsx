import type { Task } from "../schemas/taskSchema";
import { useTaskStore } from "../store/taskStore";

type SearchResultsProps = {
  search: string;
};
export const SearchResults = ({ search }: SearchResultsProps) => {
  const tasks = useTaskStore((s) => s.tasks);

  const filtered = tasks.filter((t) => {
    const query = search.trim().toLowerCase();
    const taskName = String(t.name).toLowerCase();
    const assignee = String(t.assignee).toLowerCase();

    return taskName.includes(query) || assignee.includes(query);
  });

  if (filtered.length === 0) {
    return <li className="search-empty">No tasks found</li>;
  }

  return (
    <>
      {filtered.map((task) => (
        <li key={task.id} className="search-item">
          <span>{task.name}</span>
          <span>{task.assignee}</span>
        </li>
      ))}
    </>
  );
};
