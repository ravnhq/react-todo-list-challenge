import type { TaskSearchProps } from "../../types/types";
import "./taskSearch.css";

export const TaskSearch = ({searchTerm, onSearchChange}: TaskSearchProps) => {
  return (
    <div className="search-bar">
      <input type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search..." />
      <button type="submit">🔍</button>
    </div>
  );
};
