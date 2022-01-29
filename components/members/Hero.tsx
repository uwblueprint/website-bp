import React from "react";

export const Hero: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <section className="container z-20">
      <div className="flex flex-col justify-center">
        <h1 className="text-blue-100 md:text-white mb-2">{title}</h1>
        <h4 className="text-charcoal-600 md:text-white md:w-full font-normal">
          {description}
        </h4>
      </div>
    </section>
  );
};
