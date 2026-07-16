import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, useFormikContext } from "formik";
import { getDownloadURL, ref as storeRef, uploadBytes } from "firebase/storage";
import { set, ref as dbRef, serverTimestamp } from "firebase/database";

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
  getApplicationPhase,
} from "@constants/applications";
import shortAnswerJson from "@constants/short-answer-questions.json";
import roleSpecificJson from "@constants/role-specific-questions.json";
import ApplyConfirmation from "./ApplyConfirmation";
import DeadlineToolbar from "./DeadlineToolbar";
import DeadlinePassedModal from "./DeadlinePassedModal";
import ConfirmSubmitModal from "./ConfirmSubmitModal";
import { firebaseDb, firebaseStore } from "@utils/firebase";
import useApplicationPhase from "@utils/useApplicationPhase";
import { clearDraft, loadDraft, saveDraft } from "@utils/applicationDraft";

export type ShortAnswerQuestion = {
  question: string;
  maxLength: number;
};

interface RoleQuestion {
  uniqueId?: number;
  question: string;
}

interface ShortAnswerRoleQuestion extends RoleQuestion {
  type?: "short-answer";
  description?: string;
  maxLength: number;
}

interface MultiSelectRoleQuestion extends RoleQuestion {
  type: "multi-select";
  description?: string;
  options: string[];
  other: boolean;
}

interface SelectRoleQuestion extends RoleQuestion {
  type: "select";
  description?: string;
  options: string[];
  other: boolean;
}

export type RoleSpecificQuestion = {
  id: number;
  role: string;
  open?: boolean;
  questions: (
    | ShortAnswerRoleQuestion
    | MultiSelectRoleQuestion
    | SelectRoleQuestion
  )[];
};

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
  roleSpecificQuestions: (Omit<RoleSpecificQuestion, "questions"> & {
    questions: (RoleSpecificQuestion["questions"][0] & { response?: string })[];
  })[];
  gender?: string;
  genderSpecified?: string;
  ethnicity?: string;
  ethnicitySpecified?: string;
  identities?: string[];
  timestamp: number;
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
      questions: questions.map(({ ...question }) => ({
        ...question,
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

// persist the user's current session
const DraftSaver: FC = () => {
  const { values } = useFormikContext<AppFormValues>();

  useEffect(() => {
    const id = setTimeout(() => saveDraft(values), 500);
    return () => clearTimeout(id);
  }, [values]);

  return null;
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
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const [pending, setPending] = useState<AppFormValues | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const countdown = useApplicationPhase();

  const [draft] = useState(() =>
    readOnly || typeof window === "undefined" ? null : loadDraft(),
  );

  const uploadResume = async (file: File, uuid: string) => {
    const storageRef = storeRef(firebaseStore, `resumes/${uuid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };


  const submitApplication = async (values: AppFormValues) => {
    setSaving(true);
    setSubmitError(null);

    try {
      const uuid = uuidv4();

      const roleSpecificQuestions = values.roleSpecificQuestions
        .filter(({ role }) => role === values.firstChoiceRole)
        .concat(
          values.roleSpecificQuestions.filter(
            ({ role }) => role === values.secondChoiceRole,
          ),
        )
        // For aggregated questions, only the first response is filled in.
        // Firebase doesn't like that we default responses to undefined,
        // so we need to convert them to null here.
        .map(({ questions, ...rest }) => ({
          questions: questions.map(({ response, ...question }) => ({
            ...question,
            response: response ?? null,
          })),
          ...rest,
        }));

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
        roleSpecificQuestions,
        timestamp: serverTimestamp(),
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
      await set(dbRef(firebaseDb, "studentApplications/" + uuid), application);
      await set(
        dbRef(firebaseDb, "selfIdentification/" + uuidv4()),
        identification,
      );

      clearDraft();
      setPending(null);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Application submission failed", error);
      setSubmitError(
        values.resume && !values.resumeUrl
          ? "We couldn't upload your resume. Check your connection and try again."
          : "Something went wrong submitting your application. Please try again.",
      );
      setPending(null);
    } finally {
      setSaving(false);
    }
  };

  return submitted ? (
    <ApplyConfirmation />
  ) : (
    <Formik
      enableReinitialize
      initialValues={
        draft
          ? { ...appFormInitialValues, ...draft, resume: null }
          : values || appFormInitialValues
      }
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        if (getApplicationPhase(Date.now()) === "closed") {
          setDeadlinePassed(true);
          return;
        }
        setPending(values);
      }}
    >
      {({ values, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          {!readOnly && <DraftSaver />}
          {!readOnly && countdown && (
            <DeadlineToolbar
              phase={countdown.phase}
              msRemaining={countdown.msRemaining}
            />
          )}
          {deadlinePassed && (
            <DeadlinePassedModal onClose={() => setDeadlinePassed(false)} />
          )}
          {pending && (
            <ConfirmSubmitModal
              submitting={saving}
              onConfirm={() => submitApplication(pending)}
              onCancel={() => setPending(null)}
            />
          )}
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
              deadline={APPLICATION_CLOSE_DATETIME.format("lll")}
              readOnly={readOnly}
              timestamp={values.timestamp}
            />
            <BasicInfo values={values} readOnly={readOnly} />
            <PositionPreference
              values={values}
              memberRoles={roleSpecificQuestions
                .filter(({ open = true }) => open)
                .map(({ role }) => role)}
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
            {!readOnly && submitError && (
              <p role="alert" className="text-pink-500 text-sm mb-3">
                * {submitError}
              </p>
            )}
            {!readOnly && (
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || saving}
                onClick={(e) => {
                  if (getApplicationPhase(Date.now()) === "closed") {
                    e.preventDefault();
                    setDeadlinePassed(true);
                  }
                }}
              >
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
