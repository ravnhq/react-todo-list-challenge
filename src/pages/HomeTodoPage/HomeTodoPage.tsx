import { TodoCards } from '../../components/TodoCards';
import { useAnimatedNavigation } from '../../hook/useAnimatedNavigation';
import { PlusCircledIcon } from '@radix-ui/react-icons';

import '../styles/PageStyling.css';

export const HomeTodoPage = () => {
  const { animatedNavigate } = useAnimatedNavigation();
  //TODO: Fetch and display tasks for today, tomorrow, this week, etc. (glitch it don't refresh the content)
  // const todayTasks = useMemo(() => getTodayTasks(), [tasks]);
  // const tomorrowTasks = useMemo(() => getTomorrowTasks(), [tasks]);

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
            <TodoCards taskOption="today" />
          </div>
        </div>
        <div className="all-tasks-container">
          <div className="note-background tomorrow-tasks">
            <h2>Tomorrow</h2>
            <TodoCards taskOption="tomorrow" />
          </div>
          <div className="note-background week-tasks">
            <h2>This Week</h2>
            <TodoCards taskOption="week" />
          </div>
        </div>
      </div>
    </div>
  );
};
