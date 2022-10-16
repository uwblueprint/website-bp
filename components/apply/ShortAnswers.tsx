import { FC } from "react";
import TextAreaInput from "@components/common/TextAreaInput";

const AppForm: FC = () => {
  return (
    <section className="grid gap-3 my-8">
      <h4 className="text-blue-100">Short Answers</h4>
      <p className="text-charcoal-500 mb-4">
        Please answer the following questions in a few sentences. (max length:
        1000 characters, recommended max: 150 words)
      </p>
      <div className="grid gap-6">
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
    </section>
  );
};

export default AppForm;
