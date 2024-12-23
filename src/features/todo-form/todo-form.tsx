import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo, TodoSchema } from "../../shared/schemas/todo-schema";
import { PRIORITIES } from "../../shared/schemas/priority-schema";
import styles from "./todo-form.module.scss";
import { FormField } from "./components/form-field/form-field";
import { useTodoStore } from "../../shared/store/useTodoStore";
import { capitalize } from "../../shared/util/capitalize";
import { getTodayDate } from "../../shared/util/getTodayDate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const TodoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({ resolver: zodResolver(TodoSchema) });
  const { addTodo } = useTodoStore();

  const navigate = useNavigate();

  const onSubmit = (data: Todo) => {
    addTodo(data);
    toast.success("Successfully created!");
    navigate('/')
    reset();
  };


  const today = getTodayDate();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} animate__animated animate__backInLeft animate__faster`}>
      <h2 className={styles.title}>New Todo</h2>
      <FormField id="name" label="Task Name" error={errors.name?.message}>
        <input
          type="text"
          id="name"
          placeholder="Task Title"
          {...register("name")}
          className={styles.input}
        />
      </FormField>

      <FormField
        id="priority"
        label="Priority"
        error={errors.priority?.message}
      >
        <select
          id="priority"
          {...register("priority")}
          className={styles.input}
        >
          {PRIORITIES.map((priority) => {
            return (
              <option key={priority} value={priority}>
                {capitalize(priority)}
              </option>
            );
          })}
        </select>
      </FormField>

      <FormField
        id="storyPoints"
        label="Story Points"
        error={errors.storyPoints?.message}
      >
        <input
          placeholder="1"
          type="number"
          id="storyPoints"
          {...register("storyPoints")}
          className={styles.input}
        />
      </FormField>

      <FormField
        id="assignee"
        label="Assignee"
        error={errors.assignee?.message}
      >
        <input
          type="text"
          id="assignee"
          placeholder="Who will be in charge?"
          {...register("assignee")}
          className={styles.input}
        />
      </FormField>

      <FormField id="dueDate" label="Due Date" error={errors.dueDate?.message}>
        <input
          type="datetime-local"
          id="dueDate"
          {...register("dueDate")}
          defaultValue={today}
          className={styles.input}
        />
      </FormField>

      <button type="submit" className={styles.button}>
        Create Todo
      </button>
    </form>
  );
};
