import styles from "../../todo-form.module.scss";

export const ErrorMessage = ({ message }: { message?: string }) => {
  return message ? <span className={styles.error}>{message}</span> : null;
};
