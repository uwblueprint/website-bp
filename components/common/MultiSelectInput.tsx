import { Field, FieldInputProps } from "formik";
import { FC } from "react";

type Props = {
  readonly id: string;
  readonly labelText?: string;
  readonly value?: string[];
  readonly options: string[];
  readonly required: boolean;
  readonly readOnly?: boolean;
  readonly other?: boolean;
};

type OptionProps = Omit<Props, "options"> & {
  readonly option: string;
} & FieldInputProps<string[]>;

const Option: FC<OptionProps> = ({
  option,
  required,
  readOnly,
  onChange,
  onBlur,
  name,
  value,
  other,
}) => {
  const checked = value?.includes(option);

  // We need to compute the props this way instead of passing
  // `value: undefined` because Field behaves differently depending on
  // whether the `value` prop is present at all.
  const otherProps = !checked ? { value: "" } : {};

  return (
    <div className="relative">
      <input
        type="checkbox"
        id={option}
        required={required && !value?.length}
        disabled={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={option}
        checked={checked}
      />
      <label htmlFor={option} className="mx-2">
        {option}
      </label>
      {other && (
        <Field
          id={`${name}-specified`}
          name={`${name}-specified`}
          className="text-charcoal-600 border border-charcoal-300 rounded-md px-1 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100 absolute"
          required
          disabled={!checked || readOnly}
          aria-label="Please specify a custom option"
          {...otherProps}
        />
      )}
    </div>
  );
};

const OptionList: FC<Props & FieldInputProps<string[]>> = ({
  options,
  other,
  ...props
}) => (
  <>
    {options.map((option) => (
      <Option key={option} option={option} {...props} />
    ))}
    {other && <Option other option="Other:" {...props} />}
  </>
);

const MultiSelectInput: FC<Props> = ({
  id,
  labelText,
  value,
  options,
  required,
  readOnly,
  other,
}) => (
  <div className="flex flex-col space-y-2">
    {labelText && (
      <label htmlFor={id}>
        {labelText}
        {required && <span className="text-pink-500">*</span>}
      </label>
    )}
    <Field
      as={OptionList}
      id={id}
      name={id}
      className="border-l-charcoal-300 text-charcoal-600 border border-charcoal-300 rounded-md px-4 py-3 border-l-4 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100"
      style={{ minHeight: "50px" }}
      required={required}
      readOnly={readOnly}
      options={options}
      other={other}
      value={value}
    />
  </div>
);

export default MultiSelectInput;
