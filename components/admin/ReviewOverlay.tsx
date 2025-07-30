// components/ReviewOverlay.tsx
import React from "react";
import classNames from "classnames";
import { LinkIcon } from "@components/icons/link.icon";
import router from "next/router";

interface ReviewOverlayProps {
  application: any;
  onClose: () => void;
}

const ReviewOverlay: React.FC<ReviewOverlayProps> = ({
  application,
  onClose,
}) => {
  const app = application.application;

  return (
    <div className="fixed inset-0 z-[2000] flex">
      {/* Gray Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />

      {/* Slide-In Panel */}
      <div className="ml-auto w-full max-w-5xl bg-white shadow-lg h-full overflow-y-auto p-8 relative z-50">
        <div className="flex justify-between items-center mb-6">
          <div
            onClick={() => router.push(`/review?reviewId=${app.appId}`)}
            className="flex items-center cursor-pointer text-2xl font-bold text-blue"
          >
            <LinkIcon />
            <span className="ml-2 underline">
              {app.firstName} {app.lastName}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-blue-600 hover:underline text-sm"
          >
            Close
          </button>
        </div>

        <div className="flex gap-8 text-base">
          <p>
            <span className="text-blue">Term:</span> {app.academicYear}
          </p>
          <p>
            <span className="text-blue">Program:</span> {app.program}
          </p>
          <p>
            <span className="text-blue">Role:</span> {app.firstChoiceRole}
          </p>
          <a href={app.resumeUrl} target="_blank">
            <p className="underline">View Resume</p>
          </a>
        </div>

        {/* Reviews Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Reviewer Comments</h3>
          {application.reviews?.map((review: any, idx: number) => (
            <div key={idx} className="mb-4 p-4 border rounded">
              <p>
                <strong>Reviewer:</strong> {review.name}
              </p>
              <p>
                <strong>PFSG:</strong> {review.pfsg}
              </p>
              <p>
                <strong>Team Player:</strong> {review.teamPlayer}
              </p>
              <p>
                <strong>D2L:</strong> {review.d2l}
              </p>
              <p>
                <strong>Skill:</strong> {review.skill}
              </p>
              <p>
                <strong>Comments:</strong> {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewOverlay;
