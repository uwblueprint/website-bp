import { FC } from "react";
import ShortAnswers from "./ShortAnswers";

const AppForm: FC = () => {
  return (
    <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
      <h2 className="text-blue-100 mb-8">Student Application</h2>
      <ShortAnswers />
    </section>
  );
};

export default AppForm;
