import "./index.scss";
import { useTaskStore, type Task } from "../../../stores/taskStore";
import { MdOutlineDelete } from "react-icons/md";
import { getPriorityIcon } from "../../../helpers/getPriorityIcon";

export default function ListItem(task: Task) {
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleFinished = useTaskStore((state) => state.toggleFinished);

  const handleChange = () => {
    toggleFinished(task.id);
  };

  return (
    <div className="listItemContainer">
      <div className="nameContainer">
        <h3>{task.taskName}</h3>
        <div>
          <input
            type="checkbox"
            checked={task.isFinished}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="infoContainer">
        <p className="assigned">
          Assigned: <span>{task.assignee}</span>
        </p>
        <p className="deadLine">
          DeadLine: <span>{task.dueDate}</span>
        </p>
      </div>
      <div className="priorityContainer">
        <div className="storyPoints">Story Points: {task.storyPoints}</div>
        <div>{getPriorityIcon(task.priority)}</div>
      </div>
      <div className="deleteContainer" onClick={() => removeTask(task.id)}>
        <div>
          <p>Delete</p>
          <MdOutlineDelete />
        </div>
      </div>
    </div>
  );
}
