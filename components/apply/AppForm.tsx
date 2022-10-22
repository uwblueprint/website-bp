import { FC } from "react";
import { Formik, Form } from "formik";
import BasicInfo from "./BasicInfo";
import PositionPreference from "./PositionPreference";
import RoleSpecificQuestions from "./RoleSpecificQuestions";
import ShortAnswers from "./ShortAnswers";
import SelfIdentificationForm from "./SelfIdentification";
import InfoText from "@components/apply/InfoText";
import { APPLICATION_CLOSE_DATETIME } from "@constants/applications";
import shortAnswerJson from "@constants/short-answer-questions.json";
import roleSpecificJson from "@constants/role-specific-questions.json";

export type AppFormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  program?: string;
  academicYear?: string;
  resume: string;
  resumeUrl: string;
  heardFrom: string;
  timesApplied: string;
  pronouns: string;
  pronounsSpecified: string;
  academicOrCoop: string;
  firstChoiceRole: string;
  secondChoiceRole: string;
  shortAnswerQuestions: {
    question: string;
    response?: string;
  }[];
  roleSpecificQuestions: {
    id: number;
    role: string;
    questions: {
      question: string;
      response?: string;
    }[];
  }[];
  gender: string;
  genderSpecified?: string;
  ethnicity: string;
  ethnicitySpecified?: string;
  identities: string[];
};

export type ShortAnswerQuestion = {
  question: string;
  maxLength: number;
};

export type RoleSpecificQuestion = {
  id: number;
  role: string;
  questions: [
    {
      question: string;
      maxLength: number;
    },
  ];
};

const shortAnswerQuestions: ShortAnswerQuestion[] = JSON.parse(
  JSON.stringify(shortAnswerJson),
);

const roleSpecificQuestions: RoleSpecificQuestion[] = JSON.parse(
  JSON.stringify(roleSpecificJson),
);

const appFormInitialValues: AppFormValues = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  program: undefined,
  academicYear: undefined,
  resume: "",
  resumeUrl: "",
  heardFrom: "",
  timesApplied: "",
  pronouns: "",
  pronounsSpecified: "",
  academicOrCoop: "",
  firstChoiceRole: "",
  secondChoiceRole: "",
  shortAnswerQuestions: shortAnswerQuestions.map(({ question }) => ({
    question,
    response: undefined,
  })),
  roleSpecificQuestions: roleSpecificQuestions.map(
    ({ id, role, questions }) => ({
      id,
      role,
      questions: questions.map(({ question }) => ({
        question,
        response: undefined,
      })),
    }),
  ),
  gender: "",
  genderSpecified: undefined,
  ethnicity: "",
  ethnicitySpecified: undefined,
  identities: [],
};

const AppForm: FC = () => {
  return (
    <Formik
      initialValues={appFormInitialValues}
      onSubmit={(values) => {
        if (values.secondChoiceRole === "") {
          values.roleSpecificQuestions = values.roleSpecificQuestions.filter(
            ({ role }) => role === values.firstChoiceRole,
          );
        } else {
          values.roleSpecificQuestions = values.roleSpecificQuestions
            .filter(({ role }) => role === values.firstChoiceRole)
            .concat(
              values.roleSpecificQuestions.filter(
                ({ role }) => role === values.secondChoiceRole,
              ),
            );
        }
        console.log(values);
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
            <h2 className="text-blue-100 mb-8">Student Application</h2>
            <InfoText deadline={APPLICATION_CLOSE_DATETIME} />
            <BasicInfo values={values} />
            <PositionPreference values={values} />
            <ShortAnswers values={values} questions={shortAnswerQuestions} />
            <RoleSpecificQuestions
              values={values}
              questions={roleSpecificQuestions}
            />
            <SelfIdentificationForm values={values} />
            <button
              type="submit"
              className="bg-blue-100 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default AppForm;
