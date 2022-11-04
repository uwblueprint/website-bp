import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { getDownloadURL, ref as storeRef, uploadBytes } from "firebase/storage";
import { set, ref as dbRef } from "firebase/database";

import BasicInfo from "./BasicInfo";
import PositionPreference from "./PositionPreference";
import RoleSpecificQuestions from "./RoleSpecificQuestions";
import ShortAnswers from "./ShortAnswers";
import SelfIdentificationForm from "./SelfIdentification";
import InfoText from "./InfoText";
import Button from "@components/common/Button";
import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_TERM,
} from "@constants/applications";
import shortAnswerJson from "@constants/short-answer-questions.json";
import roleSpecificJson from "@constants/role-specific-questions.json";
import ApplyConfirmation from "./ApplyConfirmation";
import { firebaseDb, firebaseStore } from "@utils/firebase";

export type AppFormValues = {
  term: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  program?: string;
  academicYear?: string;
  resume: File | null;
  resumeUrl: string;
  heardFrom: string;
  timesApplied: string;
  pronouns: string;
  pronounsSpecified: string;
  academicOrCoop: string;
  locationPreference: string;
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
  gender?: string;
  genderSpecified?: string;
  ethnicity?: string;
  ethnicitySpecified?: string;
  identities?: string[];
  timestamp: number;
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
  term: APPLICATION_TERM,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  program: undefined,
  academicYear: undefined,
  resume: null,
  resumeUrl: "",
  heardFrom: "",
  timesApplied: "",
  pronouns: "",
  pronounsSpecified: "",
  academicOrCoop: "",
  locationPreference: "",
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
  timestamp: 0,
};

type Props = {
  readOnly?: boolean;
  values?: AppFormValues | null;
};

const AppForm: FC<Props> = ({
  readOnly = false,
  values = appFormInitialValues,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const uploadResume = async (file: File, uuid: string) => {
    const storageRef = storeRef(firebaseStore, `resumes/${uuid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  return submitted ? (
    <ApplyConfirmation />
  ) : (
    <Formik
      enableReinitialize
      initialValues={values || appFormInitialValues}
      onSubmit={async (values) => {
        const uuid = uuidv4();

        values.roleSpecificQuestions = values.roleSpecificQuestions
          .filter(({ role }) => role === values.firstChoiceRole)
          .concat(
            values.roleSpecificQuestions.filter(
              ({ role }) => role === values.secondChoiceRole,
            ),
          );

        // Upload resume to Firebase storage.
        if (values.resume) {
          const url = await uploadResume(values.resume, uuid);
          values.resumeUrl = url;
        }

        const application = {
          term: values.term,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          program: values.program,
          academicYear: values.academicYear,
          resumeUrl: values.resumeUrl,
          heardFrom: values.heardFrom,
          timesApplied: values.timesApplied,
          pronouns: values.pronouns,
          pronounsSpecified: values.pronounsSpecified || "",
          academicOrCoop: values.academicOrCoop,
          locationPreference: values.locationPreference,
          firstChoiceRole: values.firstChoiceRole,
          secondChoiceRole: values.secondChoiceRole || "",
          shortAnswerQuestions: values.shortAnswerQuestions,
          roleSpecificQuestions: values.roleSpecificQuestions,
          timestamp: Date.now(),
          status: "pending",
        };

        const identification = {
          term: values.term,
          gender: values.gender || "",
          genderSpecified: values.genderSpecified || "",
          ethnicity: values.ethnicity || "",
          ethnicitySpecified: values.ethnicitySpecified || "",
          identities: values.identities || [],
        };

        // Submit form data.
        await set(
          dbRef(firebaseDb, "studentApplications/" + uuid),
          application,
        );
        await set(
          dbRef(firebaseDb, "selfIdentification/" + uuidv4()),
          identification,
        );
        setSubmitted(true);
        window.scrollTo(0, 0);
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <section
            className={
              readOnly
                ? "container max-w-4xl px-4 mx-auto md:my-24 my-8"
                : "container max-w-4xl px-4 mx-auto mt-44 mb-12 md:mt-40 md:mb-16"
            }
          >
            <h2 className="text-blue-100 mb-8">
              {readOnly
                ? `${values.firstName} ${values.lastName}`
                : "Student Application"}
            </h2>
            <InfoText
              deadline={APPLICATION_CLOSE_DATETIME}
              readOnly={readOnly}
              timestamp={values.timestamp}
            />
            <BasicInfo values={values} readOnly={readOnly} />
            <PositionPreference
              values={values}
              memberRoles={roleSpecificQuestions.map(({ role }) => role)}
              readOnly={readOnly}
            />
            <ShortAnswers
              values={values}
              questions={shortAnswerQuestions}
              readOnly={readOnly}
            />
            <RoleSpecificQuestions
              values={values}
              questions={roleSpecificQuestions}
              readOnly={readOnly}
            />
            {!readOnly && <SelfIdentificationForm values={values} />}
            {!readOnly && (
              <Button type="submit" variant="primary">
                Submit
              </Button>
            )}
          </section>
        </Form>
      )}
    </Formik>
  );
};

export default AppForm;
