import Button from "@components/common/Button";
import { ReviewStage } from "pages/review";
import { ReviewSetStageContext } from "../shared/reviewContext";

interface Props {
  name: string;
}

//add href for buttons

export const ReviewEndSuccessStage: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center w-3/5">
        <div className="flex flex-col items-center">
          <img
            src="../../../common/review-page-banner.svg"
            className="w-1/3 mb-3"
          />
          <h2 className="mb-7">Thank you!</h2>
        </div>
        <h4 className="text-center mb-7">
          Your review for <span className="text-blue">{name}</span> has been
          submitted!
        </h4>
        <ReviewSetStageContext.Consumer>
          {(setStage) => (
            <div className="flex flex-col items-center">
              <Button size="sm" href="/admin" className="mb-2">
                All Done!
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setStage?.(ReviewStage.INFO)}
              >
                Edit Review
              </Button>
            </div>
          )}
        </ReviewSetStageContext.Consumer>
      </div>
    </div>
  );
};
