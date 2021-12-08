import { FC } from "react";

/** UW Blueprint introduction video section */
const IntroVideo: FC = () => {
  return (
    <div className="h-[880px] w-full relative flex justify-center items-center">
      {/* Background image */}
      <div className="max-h-full w-full absolute flex overflow-hidden">
        <img
          className="w-full object-cover"
          src="/landing/video-background.svg"
          alt="Background image for introduction video section"
        />
      </div>

      <div className="relative z-10">
        <iframe
          width="946"
          height="508"
          src="https://www.youtube.com/embed/Dunh20k7gYA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default IntroVideo;
