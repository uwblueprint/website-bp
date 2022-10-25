import { FC } from "react";
import SelectInput from "@components/common/SelectInput";
import TextInput from "@components/common/TextInput";
import { Field } from "formik";
import { AppFormValues } from "./AppForm";

type Props = {
  values: AppFormValues;
};

const GENDER_IDENTITIES = [
  "Agender",
  "Cisgender Woman",
  "Cisgender Man",
  "Transgender Woman",
  "Transgender Man",
  "Two-Spirit",
  "Non-Binary (gender queer, gender non-conforming)",
  "I want to self-describe",
];

const ETHNICITIES = [
  "White/Caucasian",
  "Middle Eastern",
  "Black or African American",
  "Asian - East Asian",
  "Asian - Central Asian",
  "Asian - South Asian",
  "Asian - Southeast Asian",
  "Asian - West Asian",
  "Hispanic/Latinx",
  "Indigenous",
  "Native Hawaiian/Pacific Islander",
  "Mixed/Other/I want to self-describe",
];

const APPLICABLE_COND = [
  "First-generation college student",
  "Immigrant",
  "LGBTQIA+",
  "Neurodivergent",
  "Person with a disability (visible or invisible)",
  "Served in the Armed Forces",
];

const SelfIdentificationForm: FC<Props> = ({ values }: Props) => {
  return (
    <section className="grid gap-3 mb-12">
      <h4 className="text-blue-100"> Voluntary Self Identification Form</h4>
      <p className="text-charcoal-500 mb-4">
        {" "}
        This section is completely optional. This information will be greatly
        valuable for improving diversity and inclusion efforts within Blueprint
        and will be used in aggregate only. Your response will have no effect on
        your application and will not be shared outside the organization.
      </p>
      <div className="grid gap-6">
        <SelectInput
          id="gender"
          labelText={"What is your gender identity?"}
          options={GENDER_IDENTITIES}
          required={false}
        />
        {values.gender === GENDER_IDENTITIES[7] && (
          <TextInput
            id="genderSpecified"
            labelText="Please Specify"
            value={values.genderSpecified}
          />
        )}
        <SelectInput
          id="ethnicity"
          labelText="What ethnicity do you identify with?"
          options={ETHNICITIES}
          required={false}
        />
        {values.ethnicity === ETHNICITIES[11] && (
          <div>
            <TextInput
              id="ethnicitySpecified"
              labelText="Please Specify"
              value={values.ethnicitySpecified}
            />
          </div>
        )}
        <label htmlFor="conditions">
          Which of the following applies to you? Select all applicable.
        </label>
      </div>
      {APPLICABLE_COND.map((condition) => (
        <div key={condition}>
          <Field
            type="checkbox"
            name="identities"
            id="identities"
            value={condition}
          />
          <label htmlFor={condition} className="px-2">
            {condition}
          </label>
        </div>
      ))}{" "}
    </section>
  );
};

export default SelfIdentificationForm;
