import { ReactNode } from "react";
import styles from "./todo-section.module.css";

interface CardGridProps {
  children: ReactNode;
  title: string;
}

export default function TodoSection({ children, title }: CardGridProps) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.todoGrid}>{children}</div>
    </section>
  );
}
