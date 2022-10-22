import { Field } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly options: string[];
  readonly required: boolean;
};

const SelectInput: FC<Props> = ({ id, labelText, options, required }) => {
  return (
    <div className="flex flex-col space-y-2">
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <Field
        as="select"
        id={id}
        name={id}
        className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
        style={{ minHeight: "50px" }}
        required={required}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default SelectInput;
