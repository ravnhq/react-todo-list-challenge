import styles from "./divisor.module.css";

interface DivisorProps {
  marginTop?: string;
  marginBottom?: string;
}

export default function Divisor({
  marginTop = "",
  marginBottom = "",
}: DivisorProps) {
  return <div style={{ marginBottom, marginTop }} className={styles.divisor} />;
}
