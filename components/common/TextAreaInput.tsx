import { FC, useState } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly onChange?: (value: string) => void;
};

const TextInput: FC<Props> = ({
  id,
  labelText,
  placeholder,
  required,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-2">
      {labelText && (
        <label htmlFor={id}>
          {labelText}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={id}
        className={
          (required && inputValue == ""
            ? "border-l-pink-500 "
            : "border-l-charcoal-300 ") +
          "text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
        }
        style={{ resize: "none" }}
        placeholder={placeholder}
        required={required}
        value={inputValue || ""}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e.target.value || "");
        }}
        rows={4}
      />
      {required && inputValue == "" && (
        <span className="text-pink-500 text-sm">* Required</span>
      )}
    </div>
  );
};

export default TextInput;
