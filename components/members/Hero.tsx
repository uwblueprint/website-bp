import React from "react";

export const Hero: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <section className="content container mx-auto z-20">
      <div className="flex flex-col justify-center text-white">
        <h1>{title}</h1>
        <h4 className="w-1/2">{description}</h4>
      </div>
    </section>
  );
};
