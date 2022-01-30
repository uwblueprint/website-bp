import { FC } from "react";

/** UW Blueprint introduction video section */
const IntroVideo: FC = () => {
  return (
    <div className="py-24 px-4 w-full relative flex justify-center items-center">
      {/* Background image */}
      <div className="max-h-full w-full absolute flex overflow-hidden">
        <img
          className="w-full object-cover"
          src="/landing/video-background.svg"
          alt="Background image for introduction video section"
        />
      </div>

      <div className="w-full md:w-160 lg:w-240">
        <div className="relative w-full" style={{ paddingTop: "56%" }}>
          <iframe
            className="w-full h-full absolute top-0 left-0"
            src="https://www.youtube.com/embed/TBqRiIJpEXo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;
