import SelectInput from "@components/common/SelectInput";
import { Field, useFormikContext } from "formik";
import { FC } from "react";
import TextInput from "../common/TextInput";
import { AppFormValues } from "./AppForm";

type Props = {
  values: AppFormValues;
};

const BasicInfo: FC<Props> = ({ values }: Props) => {
  const formikProps = useFormikContext();

  const SELECT_SOURCES = [
    "Facebook",
    "Instagram",
    "Word of mouth",
    "Clubs fair",
    "Events",
    "Other",
  ];

  const SELECT_APPNUM = [
    "This is my first time!",
    "Once",
    "Twice",
    "3 or more",
  ];

  const SELECT_PRONOUNS = [
    "She/Her/Hers",
    "He/Him/His",
    "They/Them/Theirs",
    "Other",
  ];

  const WORKING_LOCATIONS = ["In-Person (Waterloo)", "Fully Remote", "Hybrid"];

  return (
    <section className="grid gap-3 mb-12">
      <h4 className="text-blue-100">Basic Information</h4>
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          id="firstName"
          labelText="First Name"
          placeholder="e.g. John, Jane"
          value={values.firstName}
          required
        />
        <TextInput
          id="lastName"
          labelText="Last Name"
          placeholder="e.g. Smith"
          value={values.lastName}
          required
        />
        <TextInput
          id="email"
          labelText="Email"
          placeholder="e.g. example@domain.com"
          value={values.email}
          regexMatch={/^\S+@\S+\.\S+$/}
          errorMessage="Please enter a valid email address"
          required
        />
        <br />
        <TextInput
          id="program"
          labelText="Program"
          placeholder="e.g. Computer Science, Biology"
          value={values.program}
          required
        />
        <TextInput
          id="academicYear"
          labelText="Academic Year"
          placeholder="e.g. 2A, 4B"
          value={values.academicYear}
          regexMatch={/^[1-5][A-B]$/}
          errorMessage="Please enter a valid academic year (e.g. 2A, 4B)"
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
            onChange={(e) => {
              if (e.currentTarget.files) {
                formikProps.setFieldValue("resume", e.currentTarget.files[0]);
              }
            }}
          />
        </div>
        <br />
        <SelectInput
          id="heardFrom"
          labelText="Where did you hear about us?"
          required
          options={SELECT_SOURCES}
        />
        <br />
        <SelectInput
          id="timesApplied"
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
        {values.pronouns === SELECT_PRONOUNS[3] && (
          <>
            <div>
              <TextInput
                id="pronounsSpecified"
                labelText="Please Specify"
                value={values.pronounsSpecified}
              />
            </div>
          </>
        )}
        {values.pronouns !== SELECT_PRONOUNS[3] && <br />}
        <div>
          <label htmlFor="academicOrCoop">
            Will you be in an academic (school) or co-op term?{" "}
            <span className="text-pink-500">*</span>
          </label>
          <br />
          <div className="flex flex-row space-x-24 mt-4">
            <label>
              <Field type="radio" name="academicOrCoop" value="Academic" />
              &nbsp;Academic
            </label>
            <span></span>
            <label>
              <Field type="radio" name="academicOrCoop" value="Co-op" />
              &nbsp;Co-op
            </label>
          </div>
        </div>
        <br />
        <SelectInput
          id="locationPreference"
          labelText="What is your preferred working location?"
          options={WORKING_LOCATIONS}
          required={true}
        />
      </div>
    </section>
  );
};

export default BasicInfo;
