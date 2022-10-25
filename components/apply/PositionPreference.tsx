import { FC, useState, useEffect } from "react";
import SelectInput from "@components/common/SelectInput";
import { AppFormValues } from "./AppForm";
import { useFormikContext } from "formik";

type Props = {
  values: AppFormValues;
  memberRoles: string[];
};

const PositionPreference: FC<Props> = ({ values, memberRoles }: Props) => {
  const [secondChoiceRoles, setSecondChoiceRoles] = useState(
    memberRoles.filter((roles) => roles !== values.firstChoiceRole),
  );
  const formikProps = useFormikContext();

  useEffect(() => {
    const SECOND_CHOICE_MEMBER_ROLES = memberRoles.filter(
      (roles) => roles !== values.firstChoiceRole,
    );
    setSecondChoiceRoles(SECOND_CHOICE_MEMBER_ROLES);
    if (
      values.firstChoiceRole == values.secondChoiceRole &&
      values.firstChoiceRole != ""
    ) {
      const newSecondChoice = SECOND_CHOICE_MEMBER_ROLES?.[0] || "";
      formikProps.setFieldValue("secondChoiceRole", newSecondChoice);
    }
  }, [values.firstChoiceRole]);

  return (
    <div className="grid gap-3 mb-12">
      <h4 className="text-blue-100">Position Preference</h4>
      <p className="text-charcoal-500 mb-4">
        Please select the position(s) you are interested in.*
      </p>
      <div className="grid gap-6">
        <SelectInput
          id="firstChoiceRole"
          labelText="What is your first choice role?"
          options={memberRoles}
          required
        />
        <SelectInput
          id="secondChoiceRole"
          labelText="Optional: What is your second choice role? (only select if you want to be considered for this role)"
          options={secondChoiceRoles}
          required={false}
        />
      </div>
    </div>
  );
};

export default PositionPreference;
