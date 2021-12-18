import React from "react";
import Button from "components/common/Button";

export const TeamButton: React.FC = () => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-blue">Team</h2>
        <p className="text-lg">Go back to our current members page.</p>
        <Button className="mt-4" href="/alumni">
          View Blueprint team
        </Button>
      </div>
    </section>
  );
};
