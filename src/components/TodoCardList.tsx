import { useTaskContext } from '../contexts/TaskContext';
import './styles/TodoCardList.css';
import { TodoCard } from './TodoCard';

export const TodoCardList = ({
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
        return tasks;
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
