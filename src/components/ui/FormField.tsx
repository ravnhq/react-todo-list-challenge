import type { FormFieldProps } from "../../utils/types";

export default function FormField({
  label,
  id,
  type,
  register,
  name,
  error,
  options,
  placeholder,
}: FormFieldProps) {
  return (
    <fieldset className="flex flex-col">
      <label htmlFor={id} className="self-center text-2xl">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          {...register(name)}
          className="border-1 border-accent h-7 self-center rounded border text-center"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          {...register(name)}
          className="border-1 border-accent h-7 self-center rounded border text-center"
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </fieldset>
  );
}
