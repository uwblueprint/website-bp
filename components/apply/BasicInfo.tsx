import SelectInput from "@components/common/SelectInput";
import { FC, useState } from "react";
import TextInput from "../common/TextInput";

const BasicInfo: FC = () => {
  const [basicInfo, setBasicInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    program: "",
    academicyear: "",
    resume: "",
    heardAboutBPFrom: "",
    appAttemptNum: 0,
    pronouns: "",
    termType: "",
  });
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
    <>
      <h4 className="text-blue-100 mb-4">Basic Information</h4>
      <div className="grid grid-cols-2 gap-8">
        <TextInput
          id="firstname"
          labelText="First Name"
          placeholder="e.g. John, Jane"
          required
          onChange={(e) => {
            setBasicInfo({ ...basicInfo, firstname: e });
            console.log(basicInfo);
          }}
        />
        <TextInput
          id="lastname"
          labelText="Last Name"
          placeholder="e.g. Smith"
          required
          onChange={(e) => {
            setBasicInfo({ ...basicInfo, lastname: e });
            console.log(basicInfo);
          }}
        />
        <TextInput
          id="email"
          labelText="Email"
          placeholder="e.g. example@domain.com"
          required
          onChange={(e) => {
            setBasicInfo({ ...basicInfo, email: e });
            console.log(basicInfo);
          }}
        />
        <br />
        <TextInput
          id="program"
          labelText="Program"
          placeholder="e.g. Computer Science, Biology"
          required
          onChange={(e) => {
            setBasicInfo({ ...basicInfo, program: e });
            console.log(basicInfo);
          }}
        />
        <TextInput
          id="academicyear"
          labelText="Academic Year"
          placeholder="e.g. 2A, 4B"
          required
          onChange={(e) => {
            setBasicInfo({ ...basicInfo, academicyear: e });
            console.log(basicInfo);
          }}
        />
        <div>
          <label id="resume">
            Resume (PDF) <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            id="resume"
            type="file"
            name="resume"
            required
            className="mt-4"
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
        {/* TODO: set radio values in setBasicInfo */}
        <div>
          <label htmlFor="termType">
            Will you be in an academic (school) or co-op term?{" "}
            <span className="text-red-500">*</span>
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
    </>
  );
};

export default BasicInfo;
