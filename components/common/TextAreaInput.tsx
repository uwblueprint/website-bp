import { Field } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly maxLength?: number;
  readonly readOnly?: boolean;
};

const TextAreaInput: FC<Props> = ({
  id,
  labelText,
  value,
  placeholder,
  required,
  maxLength,
  readOnly,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      {readOnly ? (
        <div className="border-l-charcoal-300 border-l-4 pl-3 ml-1 text-charcoal-500">
          {value}
        </div>
      ) : (
        <Field
          as="textarea"
          id={id}
          name={id}
          className={
            (required && value == ""
              ? "border-l-pink-500 "
              : "border-l-charcoal-300 ") +
            "text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
          }
          style={{ resize: "none" }}
          placeholder={placeholder}
          required={required}
          rows={4}
          maxLength={maxLength}
        />
      )}

      {maxLength && value && !readOnly && (
        <span className="text-charcoal-500 text-sm">
          {value.length} / {maxLength} characters
        </span>
      )}

      {required && value == "" && (
        <span className="text-pink-500 text-sm">* Required</span>
      )}
    </div>
  );
};

export default TextAreaInput;
