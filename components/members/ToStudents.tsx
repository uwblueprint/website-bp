import React from "react";
import Button from "@components/common/Button";

/**
 * Displays link to go to the current students page from the alumni page
 */
export const ToStudents: React.FC = () => {
  return (
    <section className="content container">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h2 className="text-blue">Team</h2>
          <p className="text-lg">Go back to our current members page.</p>
        </div>
        <Button className="w-full md:w-min whitespace-nowrap" href="/students">
          View Blueprint team
        </Button>
      </div>
    </section>
  );
};
