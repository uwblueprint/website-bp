import { FC, useState, useEffect } from "react";
import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import Button from "@components/common/Button";
import { queries } from "graphql/queries";
import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";
import { useRouter } from "next/router";
import { fetchGraphql } from "@utils/makegqlrequest";
import { ReviewAnswers } from "./reviewAnswers";

type QuestionAnswerProps = {
  readonly question: string;
  readonly answer: string;
};

interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

const QuestionAnswer: FC<QuestionAnswerProps> = ({ question, answer }) => {
  return (
    <div>
      <p className="text-[16px] font-poppins pb-[4px]">{question}</p>
      <p className="text-[16px] font-source text-charcoal-500">{answer}</p>
    </div>
  );
};

type ConflictModalProps = {
  readonly name: string | undefined
  readonly open: boolean;
  readonly onClose: () => void;
};

/** Highlighted project modal */
const ConflictModal: FC<ConflictModalProps> = ({ name, open, onClose }) => {
  return open ? (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 flex justify-center items-end md:items-center md:p-4 bg-black bg-opacity-20 z-40"
        style={{ margin: "0" }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="md:max-w-[310px] relative flex flex-col px-6 md:px-12 pt-4 pb-4 rounded-t-3xl md:rounded-3xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal content */}
          <div className="flex justify-between space-x-8 ">
            {/* Description */}
            <div className="flex flex-col justify-between space-y-4 text-center">
              <div>
                <h6 className="mb-1 text-blue">Report a conflict</h6>
                <p className="text-[16px] font-source text-charcoal-500">
                  Do you know {name} and want to report a conflict?
                </p>
              </div>

              <div className="flex justify-center space-x-6">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="whitespace-nowrap"
                >
                  No
                </Button>
                <Button
                  variant="primary"
                  onClick={onClose}
                  className="whitespace-nowrap"
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

interface Props {
  scores: Map<ReviewStage, number>;
  reviewId: number;
}

export const ReviewInfoStage: React.FC<Props> = ({ scores, reviewId }) => {
  const [answers, setAnswers] = useState<string[]>([]); // Read up useState(), useEffect(), useMemo() react hooks
  const [questions, setQuestions] = useState<string[]>([]);
  const [name, setName] = useState<string>();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    loading: true,
    isAuthorized: false,
  });
  const router = useRouter();
  console.log(typeof router.query);
  useEffect(() => {
    fetchGraphql(queries.applicationsById, {
      id: reviewId,
    }).then((result) => {
      if (result.data) {
        const email = result.data.applicationsById.email;
        const program = result.data.applicationsById.program;
        const academicTerm = result.data.applicationsById.academicYear;
        const headFrom = result.data.applicationsById.heardFrom;
        const timesApplied = result.data.applicationsById.timesApplied;
        const pronouns = result.data.applicationsById.pronouns;
        const academicOrCoop = result.data.applicationsById.academicOrCoop;
        const position = result.data.applicationsById.firstChoiceRole;
        const arr = result.data.applicationsById.shortAnswerQuestions[0];
        const arrObject = JSON.parse(arr);
        console.log (arrObject);

        const combinedName = result.data.applicationsById.firstName + " " + result.data.applicationsById.lastName
        setName(combinedName)

        const extractedQuestions = arrObject.map((dict: { [key: string]: string }) => {
          return dict.question;
        });
  
        const extractedAnswers = arrObject.map((dict: { [key: string]: string }) => {
          return dict.response;
        });

        setQuestions(questions => [...questions,"Email","Program","Academic Term", "Where did you hear about us?",
        "How many times have you applied to Blueprint in the past?", "Pronouns", "Will you be in an academic (school) term or a co-op term?", "Position",]);
        setAnswers(answers => [...answers, email, program, academicTerm, headFrom, timesApplied, pronouns, academicOrCoop, position,]);
        setQuestions(questions => [...questions,extractedQuestions[0]]);
        setAnswers(answers => [...answers,extractedAnswers[0]]); 

      } else {
        setAuthStatus({
          loading: false,
          isAuthorized: false,
        });
      }
    });
  }, [reviewId]);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ReviewSplitPanelPage
      studentName={name}
      rightTitle="Basic Information"
      rightTitleButton={
        <Button
          variant="secondary"
          onClick={() => setModalOpen(true)}
          className="whitespace-nowrap"
          size="sm"
        >
          <div className="flex place-items-center space-x-2">
            <WarningIcon />
            <p>Conflict</p>
          </div>
        </Button>
      }
      currentStage={ReviewStage.INFO}
      leftContent={
        <div className="flex flex-col place-items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center h-full m-auto w-full">
          <div className="">
            <Image
              height={87}
              width={440}
              alt=""
              src="/common/review-page-banner.svg"
            />
          </div>
          <div>
            <Image
              height={300}
              width={330}
              alt=""
              src="/common/review-page-people.svg"
            />
          </div>
        </div>
      }
      rightContent={
        <>
          {/* Modal */}
          <ConflictModal
            name={name}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          <div className="flex flex-col gap-4">
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
        </>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
