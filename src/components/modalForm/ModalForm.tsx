import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./modalForm.module.scss";
import { useTaskManager } from "../../store/useTaskManager";
import { useState } from "react";

const schema = z.object({
  taskName: z
    .string()
    .min(1, "Task name is required")
    .min(5, "Task name must be at least 5 characters")
    .max(30, "Maximum characters reached"),
  priority: z.string().min(1, "Priority is required"),
  storyPoints: z
    .number()
    .min(1, "Story points are required")
    .max(20, "Maximum story points is 20"),
  assignee: z
    .string()
    .min(1, "Assignee is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),
  dueDate: z
    .date({ message: "Due date is required" })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    }),
});

type Inputs = z.infer<typeof schema>;

export const ModalForm = () => {
  const { addNewTask } = useTaskManager();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form data:", data);
    addNewTask({ ...data, done: false });
    reset();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Add Task</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add a new task</Dialog.Title>
        <Dialog.Description className="sr-only"></Dialog.Description>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.inputContainer}>
            <label
              className={styles.inputLabel}
              htmlFor="taskName"
              aria-invalid={!!errors.taskName}
            >
              Task Name
            </label>
            <input
              id="taskName"
              {...register("taskName")}
              className={styles.inputForm}
              aria-invalid={!!errors.taskName}
            />
            {errors.taskName && (
              <p className={styles.errorMessage}>{errors.taskName.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label
              className={styles.inputLabel}
              htmlFor="priority"
              aria-invalid={!!errors.priority}
            >
              Priority
            </label>
            <select
              id="priority"
              {...register("priority")}
              className={styles.inputForm}
              aria-invalid={!!errors.priority}
            >
              <option value="">Select priority...</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <p className={styles.errorMessage}>{errors.priority.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label
              className={styles.inputLabel}
              htmlFor="storyPoints"
              aria-invalid={!!errors.storyPoints}
            >
              Story Points
            </label>
            <input
              id="storyPoints"
              type="number"
              {...register("storyPoints", { valueAsNumber: true })}
              className={styles.inputForm}
              aria-invalid={!!errors.storyPoints}
            />
            {errors.storyPoints && (
              <p className={styles.errorMessage}>
                {errors.storyPoints.message}
              </p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label
              className={styles.inputLabel}
              htmlFor="assignee"
              aria-invalid={!!errors.assignee}
            >
              Assignee
            </label>
            <input
              id="assignee"
              {...register("assignee")}
              className={styles.inputForm}
              aria-invalid={!!errors.assignee}
            />
            {errors.assignee && (
              <p className={styles.errorMessage}>{errors.assignee.message}</p>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label
              className={styles.inputLabel}
              htmlFor="dueDate"
              aria-invalid={!!errors.dueDate}
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              {...register("dueDate", { valueAsDate: true })}
              className={styles.inputForm}
              aria-invalid={!!errors.dueDate}
            />
            {errors.dueDate && (
              <p className={styles.errorMessage}>{errors.dueDate.message}</p>
            )}
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
