import { Field } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
};

const TextInput: FC<Props> = ({
  id,
  labelText,
  value,
  placeholder,
  required,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      <Field
        id={id}
        name={id}
        className={
          (required && value == ""
            ? "border-l-pink-500 "
            : "border-l-charcoal-300 ") +
          "text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
        }
        value={value || ""}
        placeholder={placeholder}
        required={required}
      />
      {required && value == "" && (
        <span className="text-pink-500 text-sm">* Required</span>
      )}
    </div>
  );
};

export default TextInput;
