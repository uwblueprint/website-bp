import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import ReviewEndSuccessStage from "@components/review/stages/ReviewEndSuccessStage";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ReviewsSubmitSuccess: NextPage = () => {
  const router = useRouter();
  const nameParam = router.query.name;
  const reviewIdParam = router.query.reviewId;
  const name = Array.isArray(nameParam) ? nameParam[0] : nameParam;
  const reviewId = Array.isArray(reviewIdParam)
    ? reviewIdParam[0]
    : reviewIdParam;
  const previousHref = reviewId ? `/review?reviewId=${reviewId}` : "/review";

  return (
    <RecruitmentPlatformThemeProvider>
      <ReviewEndSuccessStage name={name} previousHref={previousHref} />
    </RecruitmentPlatformThemeProvider>
  );
};

export default ReviewsSubmitSuccess;
