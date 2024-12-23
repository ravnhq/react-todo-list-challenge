import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={styles.button} type={type}>
      {children}
    </button>
  );
}
