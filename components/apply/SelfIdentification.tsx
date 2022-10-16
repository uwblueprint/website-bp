import { FC, useState } from "react";
import SelectInput from "@components/common/SelectInput";
import TextInput from "@components/common/TextAreaInput";

type GenderIdentity = {
  readonly label: string;
  readonly value: string;
};

type Ethnicity = {
  readonly label: string;
  readonly value: string;
};

const GENDER_IDENTITIES: GenderIdentity[] = [
  {
    label: "Agender",
    value: "1",
  },
  {
    label: "Cisgender Woman",
    value: "2",
  },
  {
    label: "Cisgender Man",
    value: "3",
  },
  {
    label: "Transgender Woman",
    value: "4",
  },
  {
    label: "Transgender Man",
    value: "5",
  },
  {
    label: "Two-Spirit",
    value: "6",
  },
  {
    label: "Non-Binary (gender queer, gender non-conforming)",
    value: "7",
  },
  {
    label: "I want to self-describe",
    value: "8",
  },
];

const ETHNICITIES: Ethnicity[] = [
  {
    label: "White/Caucasian",
    value: "1",
  },
  {
    label: "Middle Eastern",
    value: "2",
  },
  {
    label: "Black or African American",
    value: "3",
  },
  {
    label: "Asian - East Asian",
    value: "4",
  },
  {
    label: "Asian - Central Asian",
    value: "5",
  },
  {
    label: "Asian - South Asian",
    value: "6",
  },
  {
    label: "Asian - Southeast Asian",
    value: "7",
  },
  {
    label: "Asian - West Asian",
    value: "8",
  },
  {
    label: "Hispanic/Latinx",
    value: "9",
  },
  {
    label: "Indigenous",
    value: "10",
  },
  {
    label: "Native Hawaiian/Pacific Islander",
    value: "11",
  },
  {
    label: "Mixed/Other/I want to self-describe",
    value: "12",
  },
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
  // temporary implementation with state, this will likely need to be higher for a full form submission
  const [gender, setGender] = useState<GenderIdentity["value"]>("");
  const [ethnicity, setEthnicity] = useState<Ethnicity["value"]>("");
  const [condSelected, setCondSelected] = useState(
    new Array(APPLICABLE_COND.length).fill(false),
  );

  const handleGenderChange = (option: string) => {
    console.log(option);
    setGender(option);
  };

  const handleEthnicityChange = (option: string) => {
    console.log(option);
    setEthnicity(option);
  };

  const handleCondCheck = (index: number) => {
    const newCondList = [...condSelected];
    newCondList[index] = !condSelected[index];
    setCondSelected(newCondList);
  };

  return (
    <section className="grid gap-3 my-8">
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
          onChange={handleGenderChange}
          required
        />
        {gender === "8" && (
          <TextInput
            id="gender-specified"
            labelText="Please Specify"
            required
          />
        )}
        <SelectInput
          id="ethnicity"
          labelText="What ethnicity do you identify with?"
          options={ETHNICITIES}
          onChange={handleEthnicityChange}
          required
        />
        {ethnicity === "12" && (
          <div>
            <TextInput
              id="ethnic-specified"
              labelText="Please Specify"
              required
            />
          </div>
        )}
        <label htmlFor="conditions">
          Which of the following applies to you? Select all applicable.
        </label>
      </div>
      {APPLICABLE_COND.map((condition, i) => (
        <div key={condition}>
          <input
            type="checkbox"
            name={condition}
            id={condition}
            value={i}
            checked={condSelected[i]}
            onChange={() => handleCondCheck(i)}
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
