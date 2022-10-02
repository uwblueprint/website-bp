import { FC } from "react";

const InfoText: FC = () => {
  return (
    <section className="container max-w-6xl px-4 mx-auto my-36 md:my-40">
      <p className="text-lg">
        Thanks for your interest in UW Blueprint! We are always looking for UW
        students to take part in our club activities and join our talented team.
        Important notes:
        <u>
          <li>
            For descriptions of our available roles, please visit our&nbsp;
            <a href="https://www.notion.so/Role-Responsibilities-9494c8311ce0471f997c7473e0bfea1c">
              roles page
            </a>
            .
          </li>
          <li>Applications close on Dec 9 2023 23:59:59 EDT.</li>
          <li>
            Both students on co-op and in school are encouraged to apply! We
            will have some occasional in-person events though.
          </li>
          <li>
            Please review our application process FAQ before completing your
            application.
          </li>
        </u>
      </p>
    </section>
  );
};

export default InfoText;
