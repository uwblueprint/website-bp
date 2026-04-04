import Button from "@components/common/Button";
import { ReviewProgressHeader } from "@components/review/shared/ReviewProgressHeader";
import Image from "next/image";
import { ReactElement, useContext } from "react";
import { ReviewStage } from "../shared/constants";
import { ReviewSetStageContext } from "../shared/ReviewContext";

export type Props = {
  name?: string;
  previousHref?: string;
  homeHref?: string;
};

export const ReviewEndSuccessStage = ({
  name,
  previousHref = "/review",
  homeHref = "/admin",
}: Props): ReactElement => {
  const setStage = useContext(ReviewSetStageContext);
  const applicantName = name?.trim() || "the applicant";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ReviewProgressHeader currentStage={ReviewStage.END} allCompleted />
      <main className="flex flex-1 items-center justify-center bg-[#EEEEEE] px-6 py-12 md:px-8">
        <div className="flex w-full max-w-[486px] flex-col items-center gap-12">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <Image
              src="/common/logo-with-text-blue.svg"
              alt="Blueprint"
              width={149}
              height={29}
            />
            <h1 className="font-poppins text-[40px] font-semibold leading-[1.2] text-[#252525] md:text-[48px] md:leading-[1.4]">
              Thank you!
            </h1>
            <p className="max-w-[486px] font-poppins text-[22px] leading-[1.4] text-[#252525] md:text-[24px]">
              Your review for <span className="text-blue">{applicantName}</span>{" "}
              has been submitted!
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row">
            {setStage ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setStage(ReviewStage.END)}
                className="w-full px-4 py-2 font-source text-base font-normal leading-[1.4] sm:max-w-[235px]"
              >
                Previous section
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                href={previousHref}
                className="w-full px-4 py-2 font-source text-base font-normal leading-[1.4] sm:max-w-[235px]"
              >
                Previous section
              </Button>
            )}

            <Button
              size="sm"
              href={homeHref}
              className="w-full px-4 py-2 font-source text-base font-normal leading-[1.4] sm:max-w-[235px]"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewEndSuccessStage;
