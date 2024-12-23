import { RiCheckLine, RiCloseLine } from "@remixicon/react";
import { Todo as TodoType } from "../../shared/schemas/todo-schema";
import { useTodoStore } from "../../shared/store/useTodoStore";
import { Box } from "../../shared/ui/box/box";
import styles from "./todo.module.scss";
import { format, formatDistanceToNow } from "date-fns";
import { capitalize } from "../../shared/util/capitalize";
import toast from "react-hot-toast";

export const Todo = ({ data }: { data: TodoType }) => {
  const { toggleTodo, removeTodo } = useTodoStore();

  const formatRelativeDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
  };

  const handeRemove = () => {
    removeTodo(data.id);
    toast.success("Successfully removed!");
  };

  return (
    <Box>
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.assignee}>{data.assignee}</span>
          <span className={`${styles.priority} ${styles[data.priority]}`}>
            {capitalize(data.priority)} | {data.storyPoints}
          </span>

          <p className={styles.dueDateContainer}>
            <span className={styles.dueDate}>
              Due: {formatRelativeDate(data.dueDate)}
            </span>
            <small className={styles.dueDateRaw}>
              {format(new Date(data.dueDate), "MMM dd, yyyy h:mm a")}
            </small>
          </p>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.removeTask}
            onClick={() => {
              toggleTodo(data.id);
            }}
          >
            <RiCheckLine />
          </button>
          <button className={styles.removeTask} onClick={() => handeRemove()}>
            <RiCloseLine />
          </button>
        </div>
        <span className={styles[data.status]}></span>
      </div>
    </Box>
  );
};
