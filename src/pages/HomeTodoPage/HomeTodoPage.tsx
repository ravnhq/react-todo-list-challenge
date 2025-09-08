import { TodoCards } from '../../components/TodoCards';
import { useAnimatedNavigation } from '../../hook/useAnimatedNavigation';
import '../styles/PageStyling.css';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export const HomeTodoPage = () => {
  const { animatedNavigate } = useAnimatedNavigation();

  return (
    <div className="page-container home-container">
      <div className="homepage-content">
        <h1>Todo App</h1>
        <div className="todays-tasks-container">
          <div className="today-tasks-header">
            <h2>Today</h2>
            <button
              className="new-task-button"
              onClick={() => animatedNavigate('/tasks/new')}
            >
              <PlusCircledIcon />
              <span>Add new Task</span>
            </button>
          </div>
          <div className="today-tasks">
            <TodoCards />
          </div>
        </div>
        <div className="all-tasks-container">
          <div className="note-background tomorrow-tasks">
            <h2>Tomorrow</h2>
          </div>
          <div className="note-background week-tasks">
            <h2>This Week</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
