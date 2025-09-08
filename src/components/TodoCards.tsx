import { useTaskContext } from '../contexts/TaskContext';
import type { Task } from '../types/Task';
import './styles/Todocards.css';
import { TodoCard } from './TodoCard';

let fakeTasks: Task[] = [
  {
    id: '1',
    title: 'Stretch everyday for 15 mins',
    completed: false,
    priority: 'low',
    dueDate: new Date(2023, 11, 25).toDateString(),
    storyPoints: 3,
    assignedTo: ['Alice', 'Bob', 'Eve', 'Frank', 'Grace'],
    createdAt: new Date(2023, 11, 25).toDateString(),
    updatedAt: new Date(2023, 11, 25).toDateString(),
  },
  {
    id: '2',
    title: 'Task 2',
    completed: true,
    priority: 'normal',
    createdAt: new Date(2023, 11, 26).toDateString(),
    storyPoints: 5,
    assignedTo: ['Charlie'],
    dueDate: new Date(2023, 11, 26).toDateString(),
    updatedAt: new Date(2023, 11, 26).toDateString(),
  },
  {
    id: '3',
    title: 'Task 3',
    completed: false,
    priority: 'urgent',
    dueDate: new Date(2023, 11, 27).toDateString(),
    storyPoints: 2,
    assignedTo: ['David', 'Eve'],
    createdAt: new Date(2023, 11, 27).toDateString(),
    updatedAt: new Date(2023, 11, 27).toDateString(),
  },
];

export const TodoCards = ({
  taskOption,
}: {
  taskOption: 'today' | 'all' | 'tomorrow' | 'week';
}) => {
  const {
    tasks,
    toggleTask,
    getTodayTasks,
    getThisWeekTasks,
    getTomorrowTasks,
  } = useTaskContext();

  //TODO: temporal just to test, remove it later
  const totalTasks = [...fakeTasks, ...tasks];

  const getFilteredTasks = () => {
    switch (taskOption) {
      case 'today':
        return getTodayTasks();
      case 'tomorrow':
        return getTomorrowTasks();
      case 'week':
        return getThisWeekTasks();
      case 'all':
      default:
        return totalTasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const handleToggle = (taskId: string) => {
    toggleTask(taskId);
  };

  return (
    <div className="todo-cards">
      {filteredTasks.map(task => (
        <TodoCard
          isSmallCard={taskOption === 'tomorrow' || taskOption === 'week'}
          key={task.id}
          task={task}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
