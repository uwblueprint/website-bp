import { FC, useState } from "react";
import PositionPreference from "./PositionPreference";
import ShortAnswers from "./ShortAnswers";

const AppForm: FC = () => {
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");

  return (
    <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
      <h2 className="text-blue-100 mb-8">Student Application</h2>
      <ShortAnswers />
      <PositionPreference
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        onFirstChoiceChange={setFirstChoice}
        onSecondChoiceChange={setSecondChoice}
      />
    </section>
  );
};

export default AppForm;
