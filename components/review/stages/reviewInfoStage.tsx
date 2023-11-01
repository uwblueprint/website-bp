import { FC, useState, useEffect } from "react";
import { ReviewStage } from "pages/review";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import Button from "@components/common/Button";
import { mutations, queries } from "graphql/queries";
import  getReviewId from "pages/review/protectedApplication";
import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";
import { useRouter } from "next/router";



type QuestionAnswerProps = {
  readonly question: string;
  readonly answer: string;
};






// const reviewId = getReviewId(headerInformation);
// useEffect(() => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) throw Error("undefined accessToken");

//   const decodedToken = jwt_decode<AccessToken>(accessToken);
//   const reviewerUserId = decodedToken.user_id;

//   fetchGraphql(queries.isAuthorizedToReview, {
//     applicationId: reviewId,
//     reviewerUserId,
//   }).then((result) => {
//     if (result.data && result.data.isAuthorizedToReview) {
//       setAuthStatus({
//         loading: false,
//         isAuthorized: true,
//       });
//     } else {
//       setAuthStatus({
//         loading: false,
//         isAuthorized: false,
//       });
//     }
//   });
// }, [reviewId]);

// const appplicationById = (id: int): Promise<in> => {
//   BaseAPIClient.handleAuthRefresh();
//   const accessToken = localStorage.getItem("accessToken");

//   return fetchGraphql(queries.applicationsById, {
//     id
//   })
//     .then((result) => result.data.isAuthorizedByRole)
//     .catch((_) => {
//       throw new Error("Auth Validation Error");
//     });
// };

const data = [
  { question: "Email", answer: "matthew.wang@uwblueprint.org" },
  { question: "Program", answer: "Computer Science" },
  { question: "Academic Term", answer: "4A" },
  { question: "Where did you hear about us?", answer: "Word of mouth" },
  {
    question: "How many times have you applied to Blueprint in the past?",
    answer: "This is my first time!",
  },
  { question: "Pronouns", answer: "He/Him/His" },
  {
    question: "Will you be in an academic (school) term or a co-op term?",
    answer: "Academic",
  },
  { question: "Position", answer: "Product Designer" },
  {
    question: "What timezone will you be based out of?",
    answer: "I will be based out of the Eastern timezone.",
  },
];

const QuestionAnswer: FC<QuestionAnswerProps> = ({ question, answer }) => {
  return (
    <div>
      <p className="text-[16px] font-poppins pb-[4px]">{question}</p>
      <p className="text-[16px] font-source text-charcoal-500">{answer}</p>
    </div>
  );
};

type ConflictModalProps = {
  readonly name: string;
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

export const ReviewInfoStage: React.FC<Props> = ({ scores }) => {
  const router = useRouter();
  console.log(typeof router.query)
useEffect(() => {

  fetchGraphql(queries.isAuthorizedToReview, {
    applicationId: reviewId,
    reviewerUserId,
  }).then((result) => {
    if (result.data && result.data.isAuthorizedToReview) {
      setAuthStatus({
        loading: false,
        isAuthorized: true,
      });
    } else {
      setAuthStatus({
        loading: false,
        isAuthorized: false,
      });
    }
  });
}, [reviewId]);


};
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ReviewSplitPanelPage
      studentName="Matthew Wang"
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
            name="Matthew Wang"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
          <div className="flex flex-col gap-4">
            {data.map((item, index) => {
              return (
                <QuestionAnswer
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              );
            })}
          </div>
        </>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
