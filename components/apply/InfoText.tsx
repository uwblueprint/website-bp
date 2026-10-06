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
            Thanks for your interest in UW Blueprint! We’re looking for Waterloo
            students who are excited to build, contribute, and help shape what
            Blueprint becomes next.
          </p>
          <p
            className="text-lg text-charcoal-500"
            style={{ marginTop: "10px" }}
          >
            A few things to know before you apply:
          </p>
          <div
            style={{ paddingLeft: "20px" }}
            className="text-lg text-charcoal-500"
          >
            <u style={{ textDecoration: "none" }}>
              <li>
                Explore the available roles on our{" "}
                <a
                  href="https://app.notion.com/p/uwblueprintexecs/Role-Responsibilities-F26-98e10f3fb1dc83d59c92011d487a8c0b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex space-x-1 items-center text-blue"
                >
                  <span>roles responsibilities page</span>
                  <img
                    className="relative top-[1px]"
                    src="/common/external-link.svg"
                    alt="Link"
                  />
                </a>{" "}
                to learn more about each position and what you’ll be working on.
              </li>
              <li>
                Students on both{" "}
                <span className="text-blue">study terms and co-op terms</span>{" "}
                are encouraged to apply!
              </li>
              <li>
                Applications close{" "}
                <span className="text-blue">{deadline} ET</span>.
              </li>
              <li>
                Please review our{" "}
                <a
                  href="/join-us#join-us-faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex space-x-1 items-center text-blue"
                >
                  <span>application process FAQ</span>
                  <img
                    className="relative top-[1px]"
                    src="/common/external-link.svg"
                    alt="Link"
                  />
                </a>{" "}
                before submitting your application.
              </li>
            </u>
          </div>
          <p
            className="text-lg text-charcoal-500"
            style={{ marginTop: "10px" }}
          >
            We’re excited to learn more about you and what you’d bring to
            Blueprint!
          </p>
        </section>
      )}
    </>
  );
};

export default InfoText;
