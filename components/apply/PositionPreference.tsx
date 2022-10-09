import { FC, useState, useEffect } from "react";
import SelectInput from "@components/common/SelectInput";
import MEMBER_ROLES from "@constants/member-roles.json";

type Props = {
  onFirstChoiceChange: (value: string) => void;
  onSecondChoiceChange: (value: string) => void;
};

const PositionPreference: FC<Props> = ({
  onFirstChoiceChange,
  onSecondChoiceChange,
}: Props) => {
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoiceRoles, setSecondChoiceRoles] = useState(
    MEMBER_ROLES.filter((roles) => roles.value !== firstChoice),
  );

  useEffect(() => {
    const SECOND_CHOICE_MEMBER_ROLES = MEMBER_ROLES.filter(
      (roles) => roles.value !== firstChoice,
    );
    setSecondChoiceRoles(SECOND_CHOICE_MEMBER_ROLES);
    onFirstChoiceChange(firstChoice);
  }, [firstChoice]);

  return (
    <div>
      <h4 className="text-blue-100 text-lg tracking-widest pb-3">
        POSITION PREFERENCE
      </h4>
      <h5 className="text-charcoal-500 pb-3">
        Please select the position(s) you are interested in.*
      </h5>
      <div className="pb-3">
        <div className="grid grid-cols-2 gap-8">
          <SelectInput
            id="test"
            labelText="What is your first choice role?"
            options={MEMBER_ROLES}
            required
            onChange={setFirstChoice}
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
            onChange={onSecondChoiceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionPreference;
