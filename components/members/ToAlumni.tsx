import React from "react";
import Button from "@components/common/Button";

/**
 * Displays link to go to the alumni page from the current students page
 */
export const ToAlumni: React.FC = () => {
  return (
    <section className="content container">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-blue">Alumni</h2>
          <p className="text-lg">
            None of this would be possible without the hard work and dedication
            of past Blueprint members.
          </p>
        </div>
        <Button className="w-full md:w-min whitespace-nowrap" href="/alumni">
          View Blueprint Alumni
        </Button>
      </div>
    </section>
  );
};
