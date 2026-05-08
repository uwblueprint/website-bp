import Button from "@components/common/Button";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations } from "graphql/queries";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BACK_TO_HOME_HREF, REVIEW_STAGES, ReviewStage } from "./constants";
import { ReviewSetStageContext } from "./ReviewContext";
import { getApplicantRecordId } from "./reviewUtils";
import { ReviewEndData, ReviewScores } from "./types";
import { useTheme } from "@mui/material/styles";
import { ReactElement } from "react";
import Link from "next/link";
import { LongLeftIcon } from "@components/icons/long-left.icon";

const STAGE_RATING_FIELDS: [ReviewStage, string][] = [
  [ReviewStage.PFSG, "passionFSG"],
  [ReviewStage.TP, "teamPlayer"],
  [ReviewStage.D2L, "desireToLearn"],
  [ReviewStage.SKL, "skill"],
];

const sendRatingData = (
  id: string,
  ratingToBeChanged: string,
  newValue: number | undefined,
) => {
  return fetchGraphql(mutations.changeRating, {
    id,
    ratingToBeChanged,
    newValue,
  });
};

const sendFinalComments = (
  id: string,
  newComments: string,
  newSkillCategory: string,
  newRecommendedSecondChoice: string,
) => {
  return fetchGraphql(mutations.modifyFinalComments, {
    id,
    newComments,
    newSkillCategory,
    newRecommendedSecondChoice,
  });
};

interface Props {
  currentStage: ReviewStage;
  scores: ReviewScores;
  endData?: ReviewEndData;
  onValidate?: () => boolean;
}

export const ReviewStepper = ({
  currentStage,
  scores,
  endData,
  onValidate,
}: Props): ReactElement | null => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const setStage = useContext(ReviewSetStageContext);

  const currentStageIndex = REVIEW_STAGES.indexOf(currentStage);

  const nextStage =
    currentStageIndex < REVIEW_STAGES.length - 1
      ? REVIEW_STAGES[currentStageIndex + 1]
      : ReviewStage.END_SUCCESS;

  const previousStage = REVIEW_STAGES[Math.max(currentStageIndex - 1, 0)];

  const isButtonDisabled =
    currentStage !== ReviewStage.INFO &&
    currentStage !== ReviewStage.END_SUCCESS &&
    !(scores[currentStage] > 0 && scores[currentStage] <= 5);

  if (!router.isReady) return null;
  if (currentStage === ReviewStage.END_SUCCESS) return null;

  const applicantRecordId = getApplicantRecordId(router.query);

  const updateAllData = () => {
    const ratingPromises = STAGE_RATING_FIELDS.map(([stage, field]) =>
      sendRatingData(applicantRecordId, field, scores[stage]),
    );

    const {
      comments = "",
      skillsCategory = "",
      secondChoiceRole = "",
    } = endData ?? {};

    return Promise.all([
      ...ratingPromises,
      sendFinalComments(
        applicantRecordId,
        comments,
        skillsCategory,
        secondChoiceRole,
      ),
    ]);
  };

  return (
    <div
      className="px-6 py-4"
      style={{
        borderTop: `1px solid ${theme.palette.semantics.border.light}`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div className="flex justify-end items-center gap-3 flex-nowrap">
        {currentStageIndex === 0 && (
          <Link href={BACK_TO_HOME_HREF} passHref>
            <a className="font-source no-underline inline-flex justify-center items-center gap-2 w-fit cursor-pointer shrink-0 hover:opacity-90 rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] hover:bg-sky-100 hover:border-blue hover:text-blue">
              <LongLeftIcon />
              Back to home
            </a>
          </Link>
        )}
        {currentStageIndex > 0 && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setStage?.(previousStage)}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 hover:bg-sky-100 hover:border-blue hover:text-blue"
          >
            Previous section
          </Button>
        )}
        {currentStage === ReviewStage.END ? (
          <Button
            size="sm"
            disabled={isSubmitting || !endData?.skillsCategory}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 hover:bg-sky-400 hover:border-transparent disabled:opacity-60"
            onClick={async () => {
              if (onValidate && !onValidate()) {
                return;
              }

              setIsSubmitting(true);
              try {
                await updateAllData();
                setStage?.(ReviewStage.END_SUCCESS);
              } catch (error) {
                console.error("Failed to submit review data:", error);
                alert("Failed to submit review. Please try again.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {isSubmitting ? "Submitting..." : "Finish"}
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={isButtonDisabled}
            onClick={() => setStage?.(nextStage)}
            className="shrink-0 whitespace-nowrap !px-4 !py-2 hover:bg-sky-400 hover:border-transparent disabled:opacity-60"
          >
            Save & Continue
          </Button>
        )}
      </div>
    </div>
  );
};
