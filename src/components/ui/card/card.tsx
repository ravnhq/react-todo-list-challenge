import {
  RiCalendar2Line,
  RiCheckLine,
  RiDeleteBin2Line,
  RiRestartLine,
} from "@remixicon/react";

import Divisor from "../divisor/divisor";
import styles from "./card.module.css";

import { Todo } from "../../../interfaces/todo.interface";
import { useTodoStore } from "../../../store/todo/todo-store";
import { getPriorityColor } from "./utils/get-priority-color";

export default function Card({ ...props }: Todo) {
  const {
    id,
    assignee,
    dueDate,
    name,
    priority,
    storyPoints,
    subName,
    completed,
  } = props;
  const priorityColor = getPriorityColor(priority);
  const { removeTodo, toggleTodo } = useTodoStore();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTags}>
          <div style={{ backgroundColor: priorityColor }}>{priority}</div>
          <div>To: {assignee}</div>
          <div>Story Points: {storyPoints}</div>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <h3>{name}</h3>
        <p>{subName}</p>
      </div>
      <Divisor marginBottom="6px" marginTop="6px" />
      <div className={styles.cardFooter}>
        <div className={styles.cardDate}>
          <RiCalendar2Line size={20} />
          <div>{dueDate}</div>
        </div>
        <div className={styles.cardOptions}>
          <button>
            {completed ? (
              <RiRestartLine
                size={16}
                color="#F9A825"
                onClick={() => toggleTodo(id)}
              />
            ) : (
              <RiCheckLine
                size={16}
                color="#81C784"
                onClick={() => toggleTodo(id)}
              />
            )}
          </button>
          <button onClick={() => removeTodo(id)}>
            <RiDeleteBin2Line size={16} color="#F28B82" />
          </button>
        </div>
      </div>
    </div>
  );
}
