import { ReviewStage } from "pages/review";
import { SplitPanelPage } from "../shared/SplitPanelPage";

export const InfoStage: React.FC = () => {
  return (
    <SplitPanelPage
      studentName="M. Goose"
      rightTitle="Basic Information"
      currentStage={ReviewStage.INFO}
    ></SplitPanelPage>
  );
};
