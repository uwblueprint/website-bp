import Button from "@components/common/Button";
import Image from "next/image";

export const ReviewWelcomePage: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_1fr] h-screen">
      <div
        id="left"
        className="hidden sm:flex flex-col bg-sky w-full h-screen p-9 relative"
      >
        <div
          className="inline-flex flex-col gap-8 shrink overflow-y-auto"
          style={{ alignItems: "flex-start" }}
        >
          <div className="w-full">
            <div className="flex flex-col place-items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center h-full m-auto w-full">
              <div>
                <Image
                  height={87}
                  width={440}
                  alt=""
                  src="/common/review-page-banner.svg"
                />
              </div>
              <div>
                <Image
                  height={300}
                  width={330}
                  alt=""
                  src="/common/review-page-people.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="right" className="h-screen sm:relative flex flex-col h-screen">
        <div className="rightPanel flex-1 px-9 py-10 shrink sm:overflow-y-scroll">
          <div className=" flex flex-col gap-8">
            <div className="flex flex-col justify-between absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 space-y-8 place-content-center m-auto w-4/5">
              <div className="mb-20">
                <h3 className="font-semibold mb-10">
                  Welcome <span className="text-blue">Reviewer Name</span>!
                </h3>
                {/* need to add logic for it to say application vs applications */}
                <h4 className="font-medium">
                  You have <span className="text-blue">3</span> applications to
                  complete.
                </h4>
              </div>
              <div>
                {Array.from({length:3}).map((_, i) => (
                  <ApplicantRow />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicantRow: React.FC = () => {

  return (
    <div>
      <div className="flex flex-row items-center mt-3 mb-1 justify-between">
        <div className="flex flex-row items-center">
          <svg
            className="ml-6 mr-2"
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5625 4.3125H2.875C2.37772 4.3125 1.90081 4.51004 1.54917 4.86167C1.19754 5.21331 1 5.69022 1 6.1875V14.625C1 15.1223 1.19754 15.5992 1.54917 15.9508C1.90081 16.3025 2.37772 16.5 2.875 16.5H11.3125C11.8098 16.5 12.2867 16.3025 12.6383 15.9508C12.99 15.5992 13.1875 15.1223 13.1875 14.625V9.9375M6.625 10.875L16 1.5M16 1.5H11.3125M16 1.5V6.1875"
              stroke="#0573E8"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <h4 className="underline font-light text-lg">First Last</h4>
        </div>
        {/* need to finish styling of this so it doesnt look bad on smaller screen sizes */}
        <div className="flex flex-row items-center justify-between w-3/4 lg:w-2/3">
          <div className="bg-green-100 h-min py-1.5 rounded-xl flex items-center justify-center w-1/2">
            <h4 className="font-light text-lg text-center">Conflict Reported</h4>
          </div>
          <Button size="sm" variant="secondary" className="mr-6">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-row items-center">
                <svg
                  className="mr-2"
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5625 4.3125H2.875C2.37772 4.3125 1.90081 4.51004 1.54917 4.86167C1.19754 5.21331 1 5.69022 1 6.1875V14.625C1 15.1223 1.19754 15.5992 1.54917 15.9508C1.90081 16.3025 2.37772 16.5 2.875 16.5H11.3125C11.8098 16.5 12.2867 16.3025 12.6383 15.9508C12.99 15.5992 13.1875 15.1223 13.1875 14.625V9.9375M6.625 10.875L16 1.5M16 1.5H11.3125M16 1.5V6.1875"
                    stroke="#0573E8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <h4 className="text-lg">Edit</h4>
              </div>
            </div>
          </Button>
        </div>
      </div>
      <hr></hr>
    </div>
  );

  //{hr ? <hr></hr> : null}
};
