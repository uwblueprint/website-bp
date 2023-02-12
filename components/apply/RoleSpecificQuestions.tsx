import { FC, useMemo } from "react";
import TextAreaInput from "@components/common/TextAreaInput";
import { AppFormValues, RoleSpecificQuestion } from "./AppForm";

type Props = {
  values: AppFormValues;
  questions: RoleSpecificQuestion[];
  readOnly: boolean;
};

type AggregatedQuestion = RoleSpecificQuestion["questions"][0] & {
  roles: string[];
  roleIndex: number;
  questionIndex: number;
};

const RoleSpecificQuestions: FC<Props> = ({
  values,
  questions,
  readOnly,
}: Props) => {
  if (!questions.length) {
    return <></>;
  }

  const questionsToRender = useMemo(() => {
    const questionsForSelectedRoles = questions.filter(
      (question) =>
        question.role === values.firstChoiceRole ||
        question.role === values.secondChoiceRole,
    );
    const questionRolesByUniqueId: { [id: number]: string[] } = {};
    return questionsForSelectedRoles
      .map(({ id, role, questions: roleQuestions }) => ({
        id,
        role,
        questions: roleQuestions
          ?.map(({ uniqueId, ...question }, questionIndex) => {
            const roles = [role];
            if (uniqueId) {
              if (questionRolesByUniqueId[uniqueId]) {
                // Duplicate of a question which already exists.
                questionRolesByUniqueId[uniqueId].push(role);
                return null;
              }

              questionRolesByUniqueId[uniqueId] = roles;
            }
            const roleIndex = questions.findIndex(
              ({ id: searchId }) => searchId == id,
            );
            return { ...question, roles, roleIndex, questionIndex };
          })
          // Remove duplicate (nulled-out) questions.
          ?.filter((question): question is AggregatedQuestion => !!question),
      }))
      .filter(({ questions }) => questions.length);
  }, [values.firstChoiceRole, values.secondChoiceRole]);

  return questionsToRender.length > 0 ? (
    <div className="grid gap-3 mb-12">
      <h4 className="text-blue-100">Role Specific Questions</h4>
      {!readOnly && (
        <p className="text-charcoal-500 mb-4">
          Please answer the following questions in a few sentences where
          applicable. (max length: 1000 characters)
        </p>
      )}
      <div className="grid gap-6">
        {readOnly
          ? values.roleSpecificQuestions.map((roleQuestions, i) =>
              roleQuestions.questions?.map((question, j) => (
                <TextAreaInput
                  id={`roleSpecificQuestions[${i}][${j}]`}
                  key={`roleSpecificQuestion${i}${j}`}
                  labelText={
                    question.question + " (" + roleQuestions.role + ")"
                  }
                  value={
                    values.roleSpecificQuestions[i]?.questions[j]?.response
                  }
                  required
                  readOnly={readOnly}
                />
              )),
            )
          : questionsToRender.map((roleSpecificQuestion) =>
              roleSpecificQuestion.questions.map(
                ({ roleIndex, questionIndex, roles, maxLength, question }) => (
                  <TextAreaInput
                    id={`roleSpecificQuestions[${roleIndex}].questions[${questionIndex}].response`}
                    key={`roleSpecificQuestion[${roleIndex}][${questionIndex}]`}
                    labelText={question + " (" + roles.join(", ") + ")"}
                    value={
                      values.roleSpecificQuestions[roleIndex]?.questions[
                        questionIndex
                      ]?.response
                    }
                    maxLength={maxLength}
                    required
                    readOnly={readOnly}
                  />
                ),
              ),
            )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RoleSpecificQuestions;
