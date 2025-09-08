import { Calendar, Check, Pencil, User, Dumbbell } from "lucide-react";
import styles from "./card.module.scss";
import { Tooltip } from "@radix-ui/themes";
import { useTaskManager } from "../../store/useTaskManager";

type DataProps = {
  id: string;
  taskName: string;
  priority: string;
  storyPoints: number;
  assignee: string;
  dueDate: Date;
  done: boolean;
};

const getPriorityClassNameAlt = (priority: string) => {
  const priorityClasses: { [key: string]: string } = {
    Urgent: `${styles.priorityUrgent}`,
    High: `${styles.priorityHigh}`,
    Normal: `${styles.priorityNormal}`,
    Low: `${styles.priorityLow}`,
  };

  return priorityClasses[priority] || styles.priority;
};

export const Card = ({ data }: { data: DataProps }) => {
  const { toggleTaskDone } = useTaskManager();
  return (
    <div className={styles.cardContainer}>
      <label className={styles.circleCheckbox} htmlFor={`checkTask-${data.id}`}>
        <input
          type="checkbox"
          id={`checkTask-${data.id}`}
          onChange={() => toggleTaskDone(data.id)}
          checked={data.done}
        />
        <span>
          <Check className={styles.checkIcon} />
        </span>
      </label>
      <div className={styles.containerItems}>
        <Pencil />
        <Tooltip content={data.taskName}>
          <p className={styles.taskName}>{data.taskName}</p>
        </Tooltip>
      </div>
      <div className={getPriorityClassNameAlt(data.priority)}>
        <p>{data.priority}</p>
      </div>
      <div className={styles.containerItems}>
        <Calendar />
        <p>{data.dueDate.toLocaleDateString()}</p>
      </div>
      <div className={styles.containerItems}>
        <User />
        <Tooltip content={data.assignee}>
          <p className={styles.assignee}>{data.assignee}</p>
        </Tooltip>
      </div>
      <div className={styles.containerItems}>
        <Dumbbell />
        <p className={styles.storyPoints}>{data.storyPoints}</p>
      </div>
    </div>
  );
};
