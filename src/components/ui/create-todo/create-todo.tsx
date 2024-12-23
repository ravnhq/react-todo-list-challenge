import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "./todo.schema";
import FormField from "./components/form-field/form-field";
import styles from "./create-todo.module.css";
import { FormData } from "../../../interfaces/form.interface";
import { v4 as uuidv4 } from "uuid";
import { useTodoStore } from "../../../store/todo/todo-store";
import { useModalStore } from "../../../store/modal/modal-store";
import Button from "../button/button";

export default function CreateTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(TodoSchema) });

  const { addTodo } = useTodoStore();
  const { toggleModal } = useModalStore();
  const onSubmit = (data: FormData) => {
    addTodo(data);
    toggleModal();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h1>Add New Task</h1>

      <input type="hidden" value={uuidv4()} {...register("id")} />
      <FormField
        label="Title"
        type="text"
        placeholder="Buy groceries"
        name="name"
        register={register}
        error={errors.name}
      />

      <FormField
        label="Subname"
        type="text"
        placeholder="Go to Walmart and buy groceries"
        name="subName"
        register={register}
        error={errors.subName}
      />

      <label className={styles.inputContainer} htmlFor="priority">
        Priority
        <select
          {...register("priority", { required: true })}
          name="priority"
          id="priority"
        >
          <option value="">Select a priority</option>
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
        {errors.priority && (
          <span className={styles.error}>{errors.priority.message}</span>
        )}
      </label>

      <FormField
        label="Story Points"
        type="number"
        placeholder="1-10:easy | 10-15:medium | 15-20:harder"
        name="storyPoints"
        valueAsNumber={true}
        register={register}
        error={errors.storyPoints}
      />

      <FormField
        label="Assignee"
        type="text"
        placeholder="John Doe"
        name="assignee"
        register={register}
        error={errors.assignee}
      />

      <FormField
        label="Due Date"
        type="text"
        placeholder="20/04/25"
        name="dueDate"
        register={register}
        error={errors.dueDate}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
