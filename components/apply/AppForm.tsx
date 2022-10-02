import { FC } from "react";
import SelfIdentificationForm from "./SelfIdentification";

const AppForm: FC = () => {
  return (
    <section className="container px-4 mx-auto my-36">
      <h2 className="text-blue-100 mb-4 md:mb-0">Student Application</h2>
      <SelfIdentificationForm />
    </section>
  );
};

export default AppForm;
