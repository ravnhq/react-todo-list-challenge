import { TodoItem } from "./TodoItem";
import { Todo } from "../types/todo";
import { useState } from "react";
import { Search } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  const [sortCriteria, setSortCriteria] = useState<'priority' | 'dueDate'>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTodos = [...todos]
    .filter(todo => 
      todo.taskName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'priority') {
        return sortDirection === 'asc'
          ? a.priority.localeCompare(b.priority)
          : b.priority.localeCompare(a.priority);
      } else if (sortCriteria === 'dueDate') {
        return sortDirection === 'asc'
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2" htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value as 'priority' | 'dueDate')}
            className="border p-2 rounded-lg"
          >
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        <button
          onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAndSortedTodos.length > 0 ? (
          filteredAndSortedTodos.map((todo, index) => (
            <TodoItem key={index} todo={todo} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No tasks found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;