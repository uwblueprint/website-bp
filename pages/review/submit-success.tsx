import { NextPage } from "next";

interface QueryParams {
  reviewId: string;
}

const ReviewsSubmitSuccess: NextPage = () => {
  return <p>Thank you! Your submission for John Doe has been submitted!</p>;
};

export default ReviewsSubmitSuccess;
