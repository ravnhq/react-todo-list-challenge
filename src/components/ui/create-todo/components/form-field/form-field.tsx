import { FormFieldProps } from "../../../../../interfaces/form.interface";
import styles from "./form-field.module.css";

export default function FormField({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
}: FormFieldProps) {
  return (
    <label className={styles.inputContainer}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </label>
  );
}
