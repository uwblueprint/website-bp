import { useMemo, useState } from "react";
import { ReviewStage } from "@components/review/shared/constants";
import { ReviewSplitPanelPage } from "../shared/reviewSplitPanelPage";
import Button from "@components/common/Button";
import Image from "next/image";
import WarningIcon from "@components/icons/warning.icon";
import { ApplicationDTO } from "../../../types";
import { ReviewAnswers } from "./reviewAnswers";
import { extractShortAnswerData } from "@components/review/shared/reviewUtils";
import { tryGetReviewId } from "@utils/reviewId";
import Dialogue from "@components/common/Dialogue";
import ReviewPageAPIClient from "APIClients/ReviewPageAPIClient";
import { useRouter } from "next/router";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";

export interface ReviewStageProps {
  name: string;
  application: ApplicationDTO | undefined;
  scores: Map<ReviewStage, number>;
}

export const ReviewInfoStage: React.FC<ReviewStageProps> = ({
  name,
  application,
  scores,
}) => {
  const router = useRouter();
  const authenticatedUser = useAuthenticatedUser();
  const { questions, answers } = useMemo(() => {
    const shortAnswerStr = application?.shortAnswerQuestions[0];
    if (!shortAnswerStr) {
      return { questions: [], answers: [] };
    }

    try {
      const shortAnswerJSON = JSON.parse(shortAnswerStr);
      const { extractedQuestions, extractedAnswers } =
        extractShortAnswerData(shortAnswerJSON);

      return {
        questions: [
          "Email",
          "Program",
          "Academic Term",
          "Where did you hear about us?",
          "How many times have you applied to Blueprint in the past?",
          "Pronouns",
          "Will you be in an academic (school) term or a co-op term?",
          "Position",
          ...extractedQuestions,
        ],
        answers: [
          application?.email ?? "",
          application?.program ?? "",
          application?.academicYear ?? "",
          application?.heardFrom ?? "",
          application?.timesApplied ?? "",
          application?.pronouns ?? "",
          application?.academicOrCoop ?? "",
          application?.firstChoiceRole ?? "",
          ...extractedAnswers,
        ],
      };
    } catch (e) {
      console.error("Failed to parse shortAnswerQuestions[0]", e);
      return { questions: [], answers: [] };
    }
  }, [application]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const handleReportConflict = async () => {
    try {
      setIsReporting(true);
      setReportError(null);
      const applicantRecordId = tryGetReviewId(router.query);
      if (applicantRecordId == null) {
        throw new Error("Missing reviewId in URL");
      }
      const reviewerId = Number(authenticatedUser?.id);
      if (!Number.isInteger(reviewerId)) {
        throw new Error("Missing authenticated reviewer ID");
      }
      await ReviewPageAPIClient.reportReviewConflict(
        applicantRecordId,
        reviewerId,
      );
      setConfirmDialogOpen(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Failed to report conflict", error);
      setReportError("Couldn't report conflict. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };

  const handleBackToHomepage = () => {
    setSuccessDialogOpen(false);
    router.push("/");
  };

  const displayName =
    name && !name.includes("undefined") ? name : "this applicant";
  return (
    <ReviewSplitPanelPage
      studentName={name}
      rightTitle="Basic Information"
      rightTitleButton={
        <Button
          variant="secondary"
          onClick={() => setConfirmDialogOpen(true)}
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
          <Dialogue
            open={confirmDialogOpen}
            onClose={() => {
              if (!isReporting) setConfirmDialogOpen(false);
            }}
            header="Report a conflict"
            text={
              <div className="flex flex-col gap-2">
                <div>
                  Do you know {displayName} and want to report a conflict?
                </div>
                {reportError ? (
                  <div className="text-red-600">{reportError}</div>
                ) : null}
              </div>
            }
          >
            <Button
              variant="secondary"
              onClick={() => setConfirmDialogOpen(false)}
              className="whitespace-nowrap"
              disabled={isReporting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleReportConflict}
              className="whitespace-nowrap"
              disabled={isReporting}
            >
              Yes, report
            </Button>
          </Dialogue>
          <Dialogue
            open={successDialogOpen}
            onClose={() => setSuccessDialogOpen(false)}
            header="Conflict reported"
            text="This applicant has been reported as a conflict of interest and will be re-assigned to another reviewer."
            textContainerClassName="w-[256px]"
          >
            <Button
              variant="primary"
              onClick={handleBackToHomepage}
              className="whitespace-nowrap"
            >
              Back to homepage
            </Button>
          </Dialogue>
          <div className="flex flex-col gap-4">
            <ReviewAnswers questions={questions} answers={answers} />
          </div>
        </>
      }
      scores={scores}
    ></ReviewSplitPanelPage>
  );
};
