export const CustomField = ({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className="custom-field">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea placeholder={placeholder}></textarea>
      ) : (
        <input type={type} placeholder={placeholder} />
      )}
    </div>
  );
};
