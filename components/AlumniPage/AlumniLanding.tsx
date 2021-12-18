import React from "react";

const landingSplashBackground = "/alumni/alumni-landing-bg.svg";
const landingGraphic = "/alumni/alumni-landing-graphic.svg";

export const AlumniLanding: React.FC = () => {
  return (
    <section
      className="relative flex w-full bg-bottom bg-cover py-48"
      style={{
        backgroundImage: `url(${landingSplashBackground})`,
      }}
    >
      <section className="container mx-auto z-20">
        <div className="flex flex-col justify-center text-white">
          <h1>Alumni</h1>
          <h4 className="w-1/2">
            Meet Blueprint - we're a diverse group of friendly folks at the
            University of Waterloo dedicated to building tech for social good.
          </h4>
        </div>
        <img src={landingGraphic} className="absolute bottom-0 right-[15%]" />
      </section>
    </section>
  );
};
