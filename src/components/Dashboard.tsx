import todoIcon from "../assets/to-do-icon.svg";
import completedIcon from "../assets/completed-task-icon.svg";
import { useTaskStore } from "../store/taskStore";
import { TaskCard } from "./TaskCard";
import { PlusIcon } from "@radix-ui/react-icons";
import type { Task } from "../schemas/taskSchema";

type DashboardProps = {
  onAddTaskClick: () => void;
};

export const Dashboard = ({ onAddTaskClick }: DashboardProps) => {
  const tasks = useTaskStore((state) => state.tasks);

  //const activeTasks = tasks.filter((t) => !t.completed);
  //const completedTasks = tasks.filter((t) => t.completed);

  const { activeTasks, completedTasks } = tasks.reduce(
    (acc: { activeTasks: Task[]; completedTasks: Task[] }, task) => {
      if (task.completed) {
        acc.completedTasks.push(task);
      } else {
        acc.activeTasks.push(task);
      }
      return acc;
    },
    { activeTasks: [] as Task[], completedTasks: [] as Task[] }
  );

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
                <PlusIcon />
              </span>
              <span className="btn-label">Add Task</span>
            </button>
          </div>

          <div className="task-list">
            {activeTasks.length > 0 ? (
              activeTasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <p>No tasks yet</p>
            )}
          </div>
        </section>
        <section>
          <div className="sectionHeader">
            <div className="section-name">
              <img src={completedIcon} alt="status icon" />
              <span className="section-label">Completed Task</span>
            </div>
          </div>
          <div className="task-list">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p>No completed tasks</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
