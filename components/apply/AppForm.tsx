import { FC } from "react";
import TextInput from "@components/common/TextInput";
import SelectInput from "@components/common/SelectInput";
import TextAreaInput from "@components/common/TextAreaInput";

const AppForm: FC = () => {
  const SELECT_OPTIONS = [
    {
      label: "Raptors",
      value: "1",
    },
    {
      label: "Warriors",
      value: "2",
    },
    {
      label: "Hawks",
      value: "3",
    },
  ];

  return (
    <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
      <h2 className="text-blue-100 mb-8">Student Application</h2>
      {/* TODO: Test Common Components - Remove before submitting */}
      <div className="grid grid-cols-2 gap-8">
        <TextInput
          id="test"
          labelText="Test Input"
          placeholder="Test"
          required
        />
        <SelectInput
          id="test"
          labelText="Test Input"
          options={SELECT_OPTIONS}
          required
        />
        <div className="col-span-2">
          <TextAreaInput
            id="test"
            labelText="Test Textarea"
            placeholder="Long types of inputs"
            required
          />
        </div>
      </div>
    </section>
  );
};

export default AppForm;
