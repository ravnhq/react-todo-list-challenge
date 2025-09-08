import todoIcon from "../assets/to-do-icon.svg";
import plusIcon from "../assets/plus-icon-2.svg";
import completedIcon from "../assets/completed-task-icon.svg";
import { useTaskStore } from "../store/taskStore";

type DashboardProps = {
  onAddTaskClick: () => void;
};

export const Dashboard = ({ onAddTaskClick }: DashboardProps) => {
  const { tasks, toggleTask } = useTaskStore();

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  return (
    <div className="dashboard">
      <div className="dashboardContent">
        <section>
          <div className="sectionHeader">
            <div className="section-name">
              <img src={todoIcon} alt="to do icon" />
              <span className="section-label">To-Do</span>
            </div>
            <button className="btn" onClick={onAddTaskClick}>
              <span className="btn-icon">
                <img src={plusIcon} alt="plus icon" />
              </span>
              <span className="btn-label">Add Task</span>
            </button>
          </div>

          <ul className="task-list">
            {activeTasks &&
              activeTasks.map((task) => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.name}</span>
                </li>
              ))}
          </ul>
        </section>
        <section>
          <div className="sectionHeader">
            <div className="section-name">
              <img src={completedIcon} alt="status icon" />
              <span className="section-label">Completed Task</span>
            </div>
          </div>
          <ul className="task-list">
            {completedTasks &&
              completedTasks.map((task) => (
                <li key={task.id} className="task-item">
                  <span>{task.name}</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
