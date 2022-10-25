import { FC } from "react";

export const InfoText: FC<{ deadline: string }> = ({ deadline }) => {
  return (
    <section className="mb-12">
      <p className="text-lg text-charcoal-500">
        Thanks for your interest in UW Blueprint! We are always looking for UW
        students to take part in our club activities and join our talented team.
      </p>
      <p className="text-lg text-charcoal-500" style={{ marginTop: "10px" }}>
        Important notes:
      </p>
      <div
        style={{ paddingLeft: "20px" }}
        className="text-lg text-charcoal-500"
      >
        <u style={{ textDecoration: "none" }}>
          <li>
            For descriptions of our available roles, please visit our&nbsp;
            <a
              href="https://www.notion.so/Role-Responsibilities-9494c8311ce0471f997c7473e0bfea1c"
              target="_blank"
            >
              <span className="text-blue">roles page</span>
            </a>
            .
          </li>
          <li>
            Applications close on <span className="text-blue">{deadline}</span>
          </li>
          <li>
            <span className="text-blue">
              Both students on co-op and in school&nbsp;
            </span>
            are encouraged to apply!
          </li>
          <li>
            Please review our application process{" "}
            <a href="http://uwblueprint.org/join#join-faq" target="_blank">
              <span className="text-blue"> FAQ </span>
            </a>
            before completing your application.
          </li>
        </u>
      </div>
    </section>
  );
};

export default InfoText;
