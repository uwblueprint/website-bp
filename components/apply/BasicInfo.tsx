import SelectInput from "@components/common/SelectInput";
import { FC } from "react";
import TextInput from "../common/TextInput";

const BasicInfo: FC = () => {
  const SELECT_SOURCES = [
    {
      label: "Facebook",
      value: "1",
    },
    {
      label: "Instagram",
      value: "2",
    },
    {
      label: "Word of mouth",
      value: "3",
    },
    {
      label: "Clubs fair",
      value: "4",
    },
    {
      label: "Events",
      value: "5",
    },
    {
      label: "Other",
      value: "6",
    },
  ];

  const SELECT_APPNUM = [
    {
      label: "This is my first time!",
      value: "1",
    },
    {
      label: "Once",
      value: "2",
    },
    {
      label: "Twice",
      value: "3",
    },
    {
      label: "3 or more",
      value: "4",
    },
  ];

  const SELECT_PRONOUNS = [
    {
      label: "She/Her/Hers",
      value: "1",
    },
    {
      label: "He/Him/His",
      value: "2",
    },
    {
      label: "They/Them/Theirs",
      value: "3",
    },
    {
      label: "Other",
      value: "4",
    },
  ];

  return (
    <section className="grid gap-3 my-8">
      <h4 className="text-blue-100">Basic Information</h4>
      <div className="grid grid-cols-2 gap-6">
        <TextInput
          id="firstname"
          labelText="First Name"
          placeholder="e.g. John, Jane"
          required
        />
        <TextInput
          id="lastname"
          labelText="Last Name"
          placeholder="e.g. Smith"
          required
        />
        <TextInput
          id="email"
          labelText="Email"
          placeholder="e.g. example@domain.com"
          required
        />
        <br />
        <TextInput
          id="program"
          labelText="Program"
          placeholder="e.g. Computer Science, Biology"
          required
        />
        <TextInput
          id="academicyear"
          labelText="Academic Year"
          placeholder="e.g. 2A, 4B"
          required
        />
        <div>
          <label id="resume">
            Resume (PDF) <span className="text-pink-500">*</span>
          </label>
          <br />
          <input
            id="resume"
            type="file"
            name="resume"
            required
            className="mt-2"
          />
        </div>
        <br />
        <SelectInput
          id="heardAboutBPFrom"
          labelText="Where did you hear about us?"
          required
          options={SELECT_SOURCES}
        />
        <br />
        <SelectInput
          id="appAttemptNum"
          labelText="How many times have you applied to Blueprint in the past?"
          required
          options={SELECT_APPNUM}
        />
        <br />
        <SelectInput
          id="pronouns"
          labelText="What are your preferred pronouns?"
          options={SELECT_PRONOUNS}
          required={false}
        />
        <br />
        <div>
          <label htmlFor="termType">
            Will you be in an academic (school) or co-op term?{" "}
            <span className="text-pink-500">*</span>
          </label>
          <br />
          <div className="flex flex-row space-x-24 mt-4">
            <label>
              <input type="radio" id="academic" name="termType" value="1" />{" "}
              Academic
            </label>
            <label>
              <input type="radio" id="co-op" name="termType" value="2" />{" "}
              <span></span>
              Co-op
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
