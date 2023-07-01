import SelectInput from "@components/common/SelectInput";
import { Field, useFormikContext } from "formik";
import { FC } from "react";
import TextInput from "../common/TextInput";
import { AppFormValues } from "./AppForm";

type Props = {
  values: AppFormValues;
  readOnly: boolean;
};

const BasicInfo: FC<Props> = ({ values, readOnly }: Props) => {
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
          readOnly={readOnly}
          required
        />
        <TextInput
          id="lastName"
          labelText="Last Name"
          placeholder="e.g. Smith"
          value={values.lastName}
          readOnly={readOnly}
          required
        />
        <TextInput
          id="email"
          labelText="Email"
          placeholder="e.g. example@domain.com"
          value={values.email}
          regexMatch={/^\S+@\S+\.\S+$/}
          errorMessage="Please enter a valid email address"
          readOnly={readOnly}
          required
        />
        <br className="md:block hidden" />
        <TextInput
          id="program"
          labelText="Program"
          placeholder="e.g. Computer Science, Biology"
          value={values.program}
          readOnly={readOnly}
          required
        />
        <TextInput
          id="academicYear"
          labelText={`Academic Year (or "Graduate student")`}
          placeholder="e.g. 2A, 4B"
          value={values.academicYear}
          regexMatch={/^[1-5][A-B]|[Gg]raduate student$/}
          errorMessage="Please enter a valid academic year (e.g. 2A, 4B)"
          readOnly={readOnly}
          required
        />
        {!readOnly && (
          <>
            <div>
              <label id="resume">
                Resume (PDF) <span className="text-pink-500">*</span>
              </label>
              <br className="md:block hidden" />
              <input
                id="resume"
                type="file"
                accept="application/pdf"
                name="resume"
                required
                className="mt-2"
                onChange={(e) => {
                  if (e.currentTarget.files) {
                    formikProps.setFieldValue(
                      "resume",
                      e.currentTarget.files[0],
                    );
                  }
                }}
              />
            </div>

            <br className="md:block hidden" />
          </>
        )}
        <SelectInput
          id="heardFrom"
          labelText="Where did you hear about us?"
          value={values.heardFrom}
          required
          readOnly={readOnly}
          options={SELECT_SOURCES}
        />
        <br className="md:block hidden" />
        <SelectInput
          id="timesApplied"
          labelText="How many times have you applied to Blueprint in the past?"
          value={values.timesApplied}
          required
          readOnly={readOnly}
          options={SELECT_APPNUM}
        />
        <br className="md:block hidden" />
        <SelectInput
          id="pronouns"
          labelText="What are your preferred pronouns?"
          value={values.pronouns}
          options={SELECT_PRONOUNS}
          readOnly={readOnly}
          required={false}
        />
        {values.pronouns === SELECT_PRONOUNS[3] && (
          <>
            <div>
              <TextInput
                id="pronounsSpecified"
                labelText="Please Specify"
                value={values.pronounsSpecified}
                readOnly={readOnly}
              />
            </div>
          </>
        )}
        {values.pronouns !== SELECT_PRONOUNS[3] && (
          <br className="md:block hidden" />
        )}
        <div>
          <label htmlFor="academicOrCoop">
            Will you be in an academic (school) or co-op term?{" "}
            <span className="text-pink-500">*</span>
          </label>
          <br className="md:block hidden" />
          {readOnly ? (
            <div className="text-charcoal-500 mt-2">
              {values.academicOrCoop}
            </div>
          ) : (
            <div className="flex flex-row space-x-24 mt-4">
              <label>
                <Field
                  type="radio"
                  name="academicOrCoop"
                  value="Academic"
                  id="Academic"
                />
                &nbsp;Academic
              </label>
              <span></span>
              <label>
                <Field
                  type="radio"
                  name="academicOrCoop"
                  value="Co-op"
                  id="Co-op"
                />
                &nbsp;Co-op
              </label>
            </div>
          )}
        </div>
        <br className="md:block hidden" />
        <SelectInput
          id="locationPreference"
          labelText="What is your preferred working location?"
          value={values.locationPreference}
          options={WORKING_LOCATIONS}
          readOnly={readOnly}
          required={true}
        />
      </div>
    </section>
  );
};

export default BasicInfo;
