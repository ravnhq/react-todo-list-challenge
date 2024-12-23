import { Box } from "../../../../shared/ui/box/box";
import styles from "../../todo-form.module.scss";
import { ErrorMessage } from "../error-message/error-message";

export const FormField = ({
  id,
  label,
  children,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <Box>
    <ErrorMessage message={error} />
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    {children}
  </Box>
);
