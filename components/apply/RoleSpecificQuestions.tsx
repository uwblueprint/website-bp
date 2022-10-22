import { FC } from "react";
import data from "@constants/role-specific-questions.json";
import TextAreaInput from "@components/common/TextAreaInput";

type Props = {
  firstChoice: string;
  secondChoice: string;
};

const RoleSpecificQuestions: FC<Props> = ({
  firstChoice,
  secondChoice,
}: Props) => {
  const questions = (
    (data[firstChoice as keyof typeof data] ?? []) as string[]
  ).concat((data[secondChoice as keyof typeof data] ?? []) as string[]);

  if (!questions.length) {
    return <></>;
  }

  return (
    <div className="grid gap-3 my-8">
      <h4 className="text-blue-100">Role Specific Questions</h4>
      <div className="grid gap-6">
        {questions.map((question, i) => (
          <TextAreaInput
            id={`roleSpecific${i + 1}`}
            key={`roleSpecific${i + 1}`}
            labelText={question}
            required
          />
        ))}
      </div>
    </div>
  );
};

export default RoleSpecificQuestions;
