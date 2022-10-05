import { FC, useState } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly options: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
  readonly required: boolean;
  readonly onChange?: (value: string) => void;
};

const SelectInput: FC<Props> = ({
  id,
  labelText,
  options,
  required,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        className={
          (required && selectedValue == ""
            ? "border-l-pink-500 "
            : "border-l-charcoal-300 ") +
          "text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
        }
        style={{ minHeight: "50px" }}
        required={required}
        value={selectedValue || ""}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          onChange && onChange(e.target.value || "");
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {required && selectedValue == "" && (
        <span className="text-pink-500 text-sm">* Required</span>
      )}
    </div>
  );
};

export default SelectInput;
