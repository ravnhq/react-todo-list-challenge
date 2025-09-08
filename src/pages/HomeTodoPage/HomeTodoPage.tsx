import "../styles/PageStyling.css";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const HomeTodoPage = () => {
  return (
    <div className="page-container">
      <div className="homepage-content">
        <h1>Todo App</h1>
        <div className="todays-tasks-container">
          <div className="today-tasks-header">
            <h2>Today</h2>
            <button className="new-task-button">
              <PlusCircledIcon />
              <span>Add new Task</span>
            </button>
          </div>
          <div className="today-tasks">
            <p>tasks here</p>
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
