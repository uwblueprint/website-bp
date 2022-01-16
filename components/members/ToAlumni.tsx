import React from "react";
import Button from "@components/common/Button";

/**
 * Displays link to go to the alumni page from the current students page
 */
export const ToAlumni: React.FC = () => {
  return (
    <section className="content container">
      <div className="flex flex-col gap-2">
        <h2 className="text-blue">Alumni</h2>
        <p className="text-lg">
          Special thanks to all of our alumni who have given their time and
          effort to our cause for social good. We couldn't have done it without
          you!
        </p>
        <Button className="mt-4" href="/alumni">
          View Blueprint Alumni
        </Button>
      </div>
    </section>
  );
};
