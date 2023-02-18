import { FC } from "react";

export const InfoText: FC<{
  deadline: string;
  readOnly: boolean;
  timestamp: number;
}> = ({ deadline, readOnly, timestamp }) => {
  return (
    <>
      {readOnly ? (
        <section className="mb-12 -mt-6">
          <p className="text-lg text-charcoal-500">
            Applied on&nbsp;
            {new Date(timestamp).toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </p>
        </section>
      ) : (
        <section className="mb-12">
          <p className="text-lg text-charcoal-500">
            Thanks for your interest in UW Blueprint! We are always looking for
            UW students to take part in our club activities and join our
            talented team.
          </p>
          <p
            className="text-lg text-charcoal-500"
            style={{ marginTop: "10px" }}
          >
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
                  className="inline-flex space-x-1 items-center text-blue"
                >
                  <span>roles page</span>
                  <img
                    className="relative top-[1px]"
                    src="/common/external-link.svg"
                    alt="Link"
                  />
                </a>
                .
              </li>
              <li>
                Applications close on{" "}
                <span className="text-blue">{deadline}</span>
              </li>
              <li>
                <span className="text-blue">
                  Both students on co-op and in school&nbsp;
                </span>
                are encouraged to apply!
              </li>
              <li>
                Please review our{" "}
                <a
                  href="/join#join-faq"
                  target="_blank"
                  className="inline-flex space-x-1 items-center text-blue"
                >
                  <span>application process FAQ</span>
                  <img
                    className="relative top-[1px]"
                    src="/common/external-link.svg"
                    alt="Link"
                  />
                </a>{" "}
                before completing your application.
              </li>
            </u>
          </div>
        </section>
      )}
    </>
  );
};

export default InfoText;
