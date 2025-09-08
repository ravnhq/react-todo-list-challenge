import { Card } from "../card/Card";
import { ModalForm } from "../modalForm/ModalForm";
import styles from "./form.module.scss";
import { useTaskManager } from "../../store/useTaskManager";
import { useMemo, useState } from "react";

export const Form = () => {
  const { getFilteredTasks, tasks } = useTaskManager();
  const [filterStatus, setFilterStatus] = useState<string>("");

  const filteredData = useMemo(() => {
    if (filterStatus.trim() === "Active") {
      return getFilteredTasks().filter((item) => item.done === false);
    } else if (filterStatus.trim() === "Completed") {
      return getFilteredTasks().filter((item) => item.done === true);
    } else {
      return getFilteredTasks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFilteredTasks(), filterStatus]);

  console.log(tasks);
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <ModalForm />
        <div className={styles.filterContainer}>
          <button onClick={() => setFilterStatus("Completed")}>
            Completed
          </button>
          <button onClick={() => setFilterStatus("All")}>All</button>
        </div>
      </div>
      <div className={styles.cardTaskContainer}>
        {filteredData.map((data) => {
          return <Card data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
};
