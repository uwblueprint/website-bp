import { FC, useState } from "react";
import BasicInfo from "./BasicInfo";
import PositionPreference from "./PositionPreference";
import RoleSpecificQuestions from "./RoleSpecificQuestions";
import ShortAnswers from "./ShortAnswers";
import SelfIdentificationForm from "./SelfIdentification";
import InfoText from "@components/apply/InfoText";
import { APPLICATION_CLOSE_DATETIME } from "@constants/applications";

const AppForm: FC = () => {
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");

  return (
    <section className="container max-w-4xl px-4 mx-auto my-36 md:my-40">
      <h2 className="text-blue-100 mb-8">Student Application</h2>
      <InfoText deadline={APPLICATION_CLOSE_DATETIME} />
      <BasicInfo />
      <PositionPreference
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        onFirstChoiceChange={setFirstChoice}
        onSecondChoiceChange={setSecondChoice}
      />
      <ShortAnswers />
      <RoleSpecificQuestions
        firstChoice={firstChoice}
        secondChoice={secondChoice}
      />
      <SelfIdentificationForm />
    </section>
  );
};

export default AppForm;
