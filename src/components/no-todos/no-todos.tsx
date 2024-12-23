import styles from "./no-todos.module.css";

interface NoTodosProps {
  text: string;
}

export default function NoTodos({ text }: NoTodosProps) {
  return (
    <section className={styles.container}>
      <h3>{text}</h3>
    </section>
  );
}
