import { FC } from "react";
import TextAreaInput from "@components/common/TextAreaInput";
import { AppFormValues, RoleSpecificQuestion } from "./AppForm";

type Props = {
  values: AppFormValues;
  questions: RoleSpecificQuestion[];
};

const RoleSpecificQuestions: FC<Props> = ({ values, questions }: Props) => {
  if (!questions.length) {
    return <></>;
  }

  return (
    <div className="grid gap-3 mb-12">
      <h4 className="text-blue-100">Role Specific Questions</h4>
      <p className="text-charcoal-500 mb-4">
        Please answer the following questions in a few sentences where
        applicable. (max length: 1000 characters)
      </p>
      <div className="grid gap-6">
        {questions.map((roleSpecificQuestion, index) => {
          if (
            roleSpecificQuestion.role === values.firstChoiceRole ||
            roleSpecificQuestion.role === values.secondChoiceRole
          ) {
            return roleSpecificQuestion.questions.map((question, i) => (
              <TextAreaInput
                id={`roleSpecificQuestions[${index}].questions[${i}].response`}
                key={`roleSpecificQuestion${roleSpecificQuestion.id}${i}`}
                labelText={
                  question.question + " (" + roleSpecificQuestion.role + ")"
                }
                value={
                  values.roleSpecificQuestions[index].questions[i].response
                }
                maxLength={question.maxLength}
                required
              />
            ));
          }
        })}
      </div>
    </div>
  );
};

export default RoleSpecificQuestions;
