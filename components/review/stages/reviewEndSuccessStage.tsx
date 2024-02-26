import Button from "@components/common/Button";
import Hero from "../../landing/Hero";

interface Props {
  name: string;
}

export const ReviewEndSuccessStage: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center w-3/5 space-y-3">
        <img src="../../../common/review-page-banner.svg" className="w-1/2 md:w-1/5"/>
        <h2>Thank you!</h2>
        <h4 className="text-center">
          Your review for <span className="text-blue">{name}</span> has been submitted!
        </h4>
        <Button size="sm" href="">All Done!</Button>
        <Button size="sm" variant="secondary" href="">Edit Review</Button>
      </div>
    </div>
  );
};
