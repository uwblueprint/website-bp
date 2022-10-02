import { FC, useState } from "react";

const GENDER_IDENTITIES = [
  "Select an option...",
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
  "Select an option...",
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
  "Mixed/Other/I want to self-describe", // should this just be self-describe?
];

const APPLICABLE_COND = [
  "First-generation college student",
  "Immigrant",
  "LGBTQIA+",
  "Neurodivergent",
  "Person with a disability (visible or invisible)",
  "Served in the Armed Forces",
];

const SelfIdentificationForm: FC = () => {
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const handleGenderChange = (event: Event) => {
    setGender(event.target.value);
  };

  const handleEthnicityChange = (event: Event) => {
    setEthnicity(event.target.value);
  };

  return (
    <section className="py-4">
      <h4 className="text-blue-100 mb-4 md:mb-0">
        Voluntary Self Identification Form
      </h4>
      <h5 className="py-2 text-charcoal-500">
        This section is completely optional. This information will be greatly
        valuable for improving diversity and inclusion efforts within Blueprint
        and will be used in aggregate only. Your response will have no effect on
        your application and will not be shared outside the organization.
      </h5>
      <h5 className="py-1">What is your gender identity?</h5>
      <select
        className="mt-1 mb-2"
        value={gender}
        onChange={handleGenderChange}
      >
        {GENDER_IDENTITIES.map((identity) => (
          <option value={identity}>{identity}</option>
        ))}
      </select>

      <h5 className="py-1">What ethnicity do you identify with?</h5>
      <select
        className="mt-1 mb-2 border-2 rounded border-slate-200"
        value={ethnicity}
        onChange={handleEthnicityChange}
      >
        {ETHNICITIES.map((ethnicity) => (
          <option value={ethnicity}>{ethnicity}</option>
        ))}
      </select>

      <h5 className="py-1">
        Which of the following applies to you? Select all applicable.
      </h5>
      <section className="flex flex-col">
        {APPLICABLE_COND.map((conditions, i) => (
          <div className="py-1">
            <label key={i}>
              <input type="checkbox" name="conditions" value={conditions} />
              <text className="px-2">{conditions}</text>
            </label>
          </div>
        ))}
      </section>
    </section>
  );
};

export default SelfIdentificationForm;
