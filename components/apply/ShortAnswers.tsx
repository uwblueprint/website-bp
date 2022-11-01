import { FC } from "react";
import TextAreaInput from "@components/common/TextAreaInput";
import { AppFormValues, ShortAnswerQuestion } from "./AppForm";

type Props = {
  values: AppFormValues;
  questions: ShortAnswerQuestion[];
  readOnly: boolean;
};

const ShortAnswers: FC<Props> = ({ values, questions, readOnly }: Props) => {
  return (
    <section className="grid gap-3 mb-12">
      <h4 className="text-blue-100">Short Answers</h4>
      {!readOnly && (
        <p className="text-charcoal-500 mb-4">
          Please answer the following questions in a few sentences. (max length:
          1000 characters)
        </p>
      )}
      <div className="grid gap-6">
        {questions.map((question, i) => (
          <TextAreaInput
            id={`shortAnswerQuestions[${i}].response`}
            key={`shortAnswerQuestions${i}`}
            labelText={question.question}
            value={values.shortAnswerQuestions[i].response}
            maxLength={question.maxLength}
            required
            readOnly={readOnly}
          />
        ))}
      </div>
    </section>
  );
};

export default ShortAnswers;
