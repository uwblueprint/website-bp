import { Field } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly description?: string;
  readonly value?: string;
  readonly options: string[];
  readonly required: boolean;
  readonly readOnly?: boolean;
};

const SelectInput: FC<Props> = ({
  id,
  labelText,
  description,
  value,
  options,
  required,
  readOnly,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-pink-500">*</span>}
          {description && (
            <p className="text-charcoal-500 my-4">{description}</p>
          )}
        </label>
      )}
      {readOnly ? (
        <div className="text-charcoal-500">{value}</div>
      ) : (
        <Field
          as="select"
          id={id}
          value={value ?? ""}
          name={id}
          className="appearance-none bg-no-repeat text-charcoal-600 border border-charcoal-300 rounded-md pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
          style={{
            minHeight: "50px",
            backgroundImage: "url('/common/down-carat-blue.svg')",
            backgroundPosition: "right 1rem center",
            backgroundSize: "12px 8px",
          }}
          required={required}
        >
          <option value="" disabled={required}>
            Select an option
          </option>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Field>
      )}
    </div>
  );
};

export default SelectInput;
