import { FC, useState, useEffect } from "react";
import SelectInput from "@components/common/SelectInput";

type Props = {
  firstChoice: string;
  secondChoice: string;
  onFirstChoiceChange: (value: string) => void;
  onSecondChoiceChange: (value: string) => void;
};

type MemberRoles = {
  readonly label: string;
  readonly value: string;
};

const MEMBER_ROLES: MemberRoles[] = [
  {
    label: "Project Developer",
    value: "1",
  },
  {
    label: "Product Designer",
    value: "2",
  },
  {
    label: "Product Manager",
    value: "3",
  },
  {
    label: "Project Lead",
    value: "4",
  },
  {
    label: "User Experience Researcher",
    value: "5",
  },
  {
    label: "Content Strategist",
    value: "6",
  },
  {
    label: "Graphic Designer",
    value: "7",
  },
  {
    label: "VP Engineering",
    value: "8",
  },
  {
    label: "VP Product",
    value: "9",
  },
  {
    label: "VP Talent",
    value: "10",
  },
  {
    label: "VP Communications",
    value: "11",
  },
  {
    label: "VP Finance & Operations",
    value: "12",
  },
  {
    label: "VP Project Scoping",
    value: "13",
  },
  {
    label: "VP External",
    value: "14",
  },
  {
    label: "VP Internal",
    value: "15",
  },
];

const PositionPreference: FC<Props> = ({
  firstChoice,
  secondChoice,
  onFirstChoiceChange,
  onSecondChoiceChange,
}: Props) => {
  const [secondChoiceRoles, setSecondChoiceRoles] = useState(
    MEMBER_ROLES.filter((roles) => roles.value !== firstChoice),
  );

  useEffect(() => {
    const SECOND_CHOICE_MEMBER_ROLES = MEMBER_ROLES.filter(
      (roles) => roles.value !== firstChoice,
    );
    setSecondChoiceRoles(SECOND_CHOICE_MEMBER_ROLES);
    if (firstChoice == secondChoice && firstChoice != "") {
      const newSecondChoice = SECOND_CHOICE_MEMBER_ROLES?.[0]?.value || "";
      onSecondChoiceChange(newSecondChoice);
    }
  }, [firstChoice]);

  return (
    <div>
      <h4 className="text-blue-100">Position Preference</h4>
      <p className="text-charcoal-500 mb-4">
        Please select the position(s) you are interested in.*
      </p>
      <div className="pb-3">
        <div className="grid grid-cols-2 gap-8">
          <SelectInput
            id="test"
            labelText="What is your first choice role?"
            options={MEMBER_ROLES}
            required
            onChange={onFirstChoiceChange}
          />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold pb-2">
          Optional: What is your second choice role? (only select if you want to
          be considered for this role)
        </p>
        <div className="grid grid-cols-2 gap-8">
          <SelectInput
            id="test"
            labelText=""
            options={secondChoiceRoles}
            required={false}
            onChange={onSecondChoiceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionPreference;
