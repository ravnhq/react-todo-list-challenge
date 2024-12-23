import styles from "./box.module.scss";

export const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.box}>{children}</div>;
};
