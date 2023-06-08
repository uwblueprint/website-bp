import { ReviewStage } from "pages/review";
import { SplitPanelPage } from "../shared/SplitPanelPage";

export const EndStage: React.FC = () => {
  return (
    <SplitPanelPage
      studentName="M. Goose"
      currentStage={ReviewStage.END}
      leftTitle="Summary of scores"
    ></SplitPanelPage>
  );
};
