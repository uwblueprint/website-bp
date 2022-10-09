import { FC, useState } from "react";
import PositionPreference from "./PositionPreference";

const AppForm: FC = () => {
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");

  return (
    <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
      <h2 className="text-blue-100 mb-8">Student Application</h2>
      <PositionPreference
        onFirstChoiceChange={setFirstChoice}
        onSecondChoiceChange={setSecondChoice}
      />
      {console.log(firstChoice)}
      {console.log(secondChoice)}
    </section>
  );
};

export default AppForm;
