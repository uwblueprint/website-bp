import { Field } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly value?: string;
  readonly options: string[];
  readonly required: boolean;
  readonly readOnly?: boolean;
};

const SelectInput: FC<Props> = ({
  id,
  labelText,
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
        </label>
      )}
      {readOnly ? (
        <div className="text-charcoal-500">{value}</div>
      ) : (
        <Field
          as="select"
          id={id}
          name={id}
          className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
          style={{ minHeight: "50px" }}
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
