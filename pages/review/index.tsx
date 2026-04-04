import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ProtectedRoute from "@components/context/ProtectedRoute";
import {
  REVIEW_RECORD_STATUS,
  ReviewStage,
} from "@components/review/shared/constants";
import { ReviewEndData, ReviewScores } from "@components/review/shared/types";
import { getApplicantRecordId } from "@components/review/shared/reviewUtils";
import {
  ReviewSetScoresContext,
  ReviewSetStageContext,
} from "@components/review/shared/ReviewContext";
import { ReviewDriveToLearnStage } from "@components/review/stages/ReviewDriveToLearnStage";
import { ReviewEndStage } from "@components/review/stages/ReviewEndStage";
import { ReviewEndSuccessStage } from "@components/review/stages/ReviewEndSuccessStage";
import { ReviewInfoStage } from "@components/review/stages/ReviewInfoStage";
import { ReviewPassionForSocialGoodStage } from "@components/review/stages/ReviewPassionForSocialGoodStage";
import { ReviewSkillStage } from "@components/review/stages/ReviewSkillStage";
import { ReviewTeamPlayerStage } from "@components/review/stages/ReviewTeamPlayerStage";
import { ApplicationDTO } from "../../types";
import ProtectedApplication from "./protectedApplication";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";
import ReviewPageAPIClient, {
  reviewFragmentToEndData,
  reviewFragmentToScores,
} from "APIClients/ReviewPageAPIClient";
import Loading from "@components/common/Loading";

const initialScores: ReviewScores = {
  [ReviewStage.INFO]: 0,
  [ReviewStage.PFSG]: 0,
  [ReviewStage.TP]: 0,
  [ReviewStage.D2L]: 0,
  [ReviewStage.SKL]: 0,
  [ReviewStage.END]: 0,
  [ReviewStage.END_SUCCESS]: 0,
};

const initialEndData: ReviewEndData = {
  comments: "",
  skillsCategory: "",
  secondChoiceRole: "",
};

const ReviewsPages: NextPage = () => {
  const router = useRouter();
  const [stage, setStage] = useState<ReviewStage>(ReviewStage.INFO);
  const [application, setApplication] = useState<ApplicationDTO>();
  const [endData, setEndData] = useState<ReviewEndData>(initialEndData);
  const [scores, setScores] = useState<ReviewScores>(initialScores);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const applicantRecordId = router.isReady
    ? getApplicantRecordId(router.query)
    : null;

  const name = (application?.firstName ?? "") + " " + (application?.lastName ?? "");

  const authenticatedUser = useAuthenticatedUser();
  const reviewerName = authenticatedUser
    ? authenticatedUser.firstName
    : "Reviewer";

  const updateScores = (key: ReviewStage, value: number) => {
    setScores((prev) => {
      if (isNaN(value) || value < 0 || value > 5) {
        return prev;
      }
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    if (!router.isReady || applicantRecordId === null) {
      return;
    }

    if (!authenticatedUser) {
      setLoadError("Missing signed-in user. Please log in again.");
      setPageLoading(false);
      return;
    }

    const reviewerId = Number.parseInt(authenticatedUser.id, 10);
    if (!Number.isFinite(reviewerId)) {
      setLoadError("Invalid reviewer account. Please log in again.");
      setPageLoading(false);
      return;
    }

    let cancelled = false;
    setPageLoading(true);
    setLoadError(null);

    ReviewPageAPIClient.loadReviewPage(applicantRecordId, reviewerId)
      .then(({ application: app, record }) => {
        if (cancelled) {
          return;
        }
        setApplication(app);
        setScores(reviewFragmentToScores(record.review));
        setEndData((prev) => ({
          ...prev,
          ...reviewFragmentToEndData(record.review),
        }));
        if (record.status === REVIEW_RECORD_STATUS.DONE) {
          setStage(ReviewStage.END_SUCCESS);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          const message =
            e instanceof Error ? e.message : "Failed to load review page.";
          setLoadError(message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPageLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [router.isReady, applicantRecordId, authenticatedUser]);

  if (!router.isReady) {
    return null;
  }

  if (pageLoading) {
    return <Loading />;
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-sky-100">
        <p className="text-red-600 text-center max-w-lg" role="alert">
          {loadError}
        </p>
      </div>
    );
  }

  const getReviewStage = () => {
    switch (stage) {
      case ReviewStage.INFO:
        return (
          <ReviewInfoStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.PFSG:
        return (
          <ReviewPassionForSocialGoodStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.TP:
        return (
          <ReviewTeamPlayerStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.D2L:
        return (
          <ReviewDriveToLearnStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.SKL:
        return (
          <ReviewSkillStage
            name={name}
            application={application}
            scores={scores}
          />
        );
      case ReviewStage.END:
        return (
          <ReviewEndStage
            name={name}
            reviewerName={reviewerName}
            scores={scores}
            endData={endData}
            setEndData={setEndData}
          />
        );
      case ReviewStage.END_SUCCESS:
      default:
        return <ReviewEndSuccessStage name={name} />;
    }
  };

  return (
    <ReviewSetScoresContext.Provider value={updateScores}>
      <ReviewSetStageContext.Provider value={setStage}>
        {getReviewStage()}
      </ReviewSetStageContext.Provider>
    </ReviewSetScoresContext.Provider>
  );
};

const Reviews: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return null;
  }
  return (
    <RecruitmentPlatformThemeProvider>
      <ProtectedRoute allowedRoles={["Admin", "User"]}>
        <ProtectedApplication headerInformation={router.query}>
          <ReviewsPages />
        </ProtectedApplication>
      </ProtectedRoute>
    </RecruitmentPlatformThemeProvider>
  );
};

export default Reviews;
