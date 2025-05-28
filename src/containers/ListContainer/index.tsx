import { useTaskStore } from "../../stores/taskStore";
import "./index.scss";
import ListItem from "./ListItem";
export default function ListContainer() {
  const tasks = useTaskStore((state) => state.tasks);
  const searchQuery = useTaskStore((state) => state.searchQuery);

  const filteredTasks = tasks.filter(
    (task) =>
      !task.isFinished &&
      (task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="main-container">
      <div className="listContainer">
        <div className="taskInfo">
          <div className="tasksCreated">
            Created Task: <span>{filteredTasks.length}</span>
          </div>
        </div>
        <div className="taskCreated">
          <div className="itemsContainer">
            {filteredTasks.length === 0 ? (
              <p>There are no tasks news.</p>
            ) : (
              filteredTasks.map((task) => <ListItem key={task.id} {...task} />)
            )}
          </div>
        </div>
      </div>
      <div className="listContainer">
        <div className="taskInfo">
          <div className="tasksCreated">
            Finished Task:{" "}
            <span>{tasks.filter((task) => task.isFinished).length}</span>
          </div>
        </div>
        <div className="taskCreated">
          <div className="itemsContainer">
            {tasks.filter((task) => task.isFinished).length === 0 ? (
              <p>There are no completed tasks</p>
            ) : (
              tasks
                .filter((task) => task.isFinished)
                .map((task) => <ListItem key={task.id} {...task} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
