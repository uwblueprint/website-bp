const InterviewGroupIllustrationPanel = () => (
  <div className="h-full bg-[#FAFAFA] border-r border-[#C4C4C4] flex items-center justify-center overflow-hidden">
    <div
      className="relative [container-type:inline-size]"
      style={{ width: "63%", aspectRatio: "441 / 537" }}
    >
      <img
        src="/common/review-page-banner.svg"
        alt="blueprint"
        className="absolute"
        style={{ left: "0%", top: "0%", width: "99.77%" }}
      />
      <p
        className="absolute font-poppins font-medium text-black leading-[1.4] whitespace-nowrap"
        style={{ left: "56.46%", top: "18.07%", fontSize: "4.535cqi" }}
      >
        Application Review
      </p>
      <img
        src="/common/review-page-people.svg"
        alt=""
        className="absolute"
        style={{ left: "16.33%", top: "42.85%", width: "75.05%" }}
      />
    </div>
  </div>
);

export default InterviewGroupIllustrationPanel;
