import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form } from "formik";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref as storeRef,
  uploadBytes,
} from "firebase/storage";
import { getDatabase, set, ref as dbRef } from "firebase/database";

import BasicInfo from "./BasicInfo";
import PositionPreference from "./PositionPreference";
import RoleSpecificQuestions from "./RoleSpecificQuestions";
import ShortAnswers from "./ShortAnswers";
import SelfIdentificationForm from "./SelfIdentification";
import InfoText from "./InfoText";
import {
  APPLICATION_CLOSE_DATETIME,
  APPLICATION_TERM,
} from "@constants/applications";
import shortAnswerJson from "@constants/short-answer-questions.json";
import roleSpecificJson from "@constants/role-specific-questions.json";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "@utils/secrets";
import ApplyConfirmation from "./ApplyConfirmation";

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
};

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getDatabase(app);

const AppForm: FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const uploadResume = async (file: File, uuid: string) => {
    const storageRef = storeRef(storage, `resumes/${uuid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };

  return submitted ? (
    <ApplyConfirmation />
  ) : (
    <Formik
      initialValues={appFormInitialValues}
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
        await set(dbRef(db, "studentApplications/" + uuid), application);
        await set(dbRef(db, "selfIdentification/" + uuidv4()), identification);
        setSubmitted(true);
        window.scrollTo(0, 0);
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
            <h2 className="text-blue-100 mb-8">Student Application</h2>
            <InfoText deadline={APPLICATION_CLOSE_DATETIME} />
            <BasicInfo values={values} />
            <PositionPreference
              values={values}
              memberRoles={roleSpecificQuestions.map(({ role }) => role)}
            />
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
