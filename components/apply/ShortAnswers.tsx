import { FC } from "react";
import TextAreaInput from "@components/common/TextAreaInput";

const AppForm: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <h4 className="text-blue-100">Short answers</h4>
      <h5 className="text-charcoal-500 text-base">
        Please answer the following questions in a few sentences. (max length:
        1000 characters, recommended max: 150 words)
      </h5>
      <div className="grid grid-cols-1 gap-6">
        <TextAreaInput
          id="timezoneSA"
          labelText="What timezone will you be based out of next term?"
          required
        />
        <TextAreaInput
          id="causeSA"
          labelText="Tell us about a cause that resonates with you."
          required
        />
        <TextAreaInput
          id="communitySA"
          labelText="Tell us about a community you're proud to be a part of and how you contributed to it."
          required
        />
        <TextAreaInput
          id="skillSA"
          labelText="Tell us about a time you learned a new skill. What was your motivation to learn it and what was your approach?"
          required
        />
      </div>
    </div>
  );
};

export default AppForm;
