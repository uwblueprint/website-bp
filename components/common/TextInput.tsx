import { Field } from "formik";
import { FC, useEffect, useState } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly regexMatch?: RegExp;
  readonly errorMessage?: string;
  readonly required?: boolean;
  readonly readOnly?: boolean;
};

const TextInput: FC<Props> = ({
  id,
  labelText,
  value,
  placeholder,
  regexMatch,
  errorMessage,
  required,
  readOnly,
}) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (regexMatch && value && value !== "") {
      if (!regexMatch.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      {readOnly ? (
        <div className="text-charcoal-500">{value}</div>
      ) : (
        <Field
          id={id}
          name={id}
          className={
            ((required && value == "") || error
              ? "border-l-pink-500 "
              : "border-l-charcoal-300 ") +
            "text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
          }
          value={value || ""}
          placeholder={placeholder}
          required={required}
        />
      )}
      {required && value == "" && (
        <span className="text-pink-500 text-sm">* Required</span>
      )}
      {value != "" && error && (
        <span className="text-pink-500 text-sm">* {errorMessage}</span>
      )}
    </div>
  );
};

export default TextInput;
