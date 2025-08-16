import React from "react";
import { LinkIcon } from "@components/icons/link.icon";
import router from "next/router";
import { ResumeIcon } from "@components/icons/resume.icon";
import Button from "@components/common/Button";
import { Status } from "@utils/muidatatable";

interface ReviewOverlayProps {
  application: any;
  onClose: () => void;
}

const ReviewOverlay: React.FC<ReviewOverlayProps> = ({
  application,
  onClose,
}) => {
  const app = application.application;

  const reviewers = application.reviewers || [];
  const [reviewer1 = {}, reviewer2 = {}] = reviewers;

  const defaultVal = (val: any, fallback: any = "None") => val ?? fallback;

  return (
    <div className="fixed inset-0 z-[2000] flex font-poppins">
      {/* Gray backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />

      {/* Slide-in panel */}
      <div className="ml-auto w-full max-w-6xl bg-white shadow-lg h-full overflow-y-auto p-8 relative z-50">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 items-center">
            <LinkIcon />
            <span
              className="underline cursor-pointer text-xl font-semibold text-blue-300"
              onClick={() => router.push(`/reviewer?reviewId=${app.id}`)}
            >
              {defaultVal(app.firstName)} {defaultVal(app.lastName)}
            </span>
            <Status status="pending" />
          </div>

          <div className="text-gray-600 text-sm flex items-center gap-3">
            <span>{defaultVal(app.index ?? 1)}/200</span>
            <button onClick={onClose} className="hover:underline text-blue-300">
              ✕
            </button>
          </div>
        </div>

        {/* Applicant Info */}
        <div className="flex gap-8 text-base mb-6">
          <p>
            <span className="text-blue-300 font-semibold">Term:</span>{" "}
            {defaultVal(app.academicYear, "N/A")}
          </p>
          <p>
            <span className="text-blue-300 font-semibold">Program:</span>{" "}
            {defaultVal(app.program, "N/A")}
          </p>
          <p>
            <span className="text-blue-300 font-semibold">Role:</span>{" "}
            {defaultVal(app.firstChoiceRole, "N/A")}
          </p>
          <a
            href={app.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2"
          >
            <ResumeIcon />
            <p className="underline text-blue-600">View Resume</p>
          </a>
        </div>

        {/* Side-by-side reviewer comparison */}
        <div className="flex text-sm gap-12 py-8">
          {[reviewer1, reviewer2].map((reviewer, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-4"
            >
              {/* Reviewer heading */}
              <span className="text-blue-300 font-semibold">
                Reviewer {idx + 1}:
              </span>
              <span>
                {defaultVal(reviewer.firstName + " " + reviewer.lastName)}
              </span>

              <span className="text-blue-300 font-semibold">PFSG:</span>
              <span>{defaultVal(reviewer.pfsg, 0)}</span>

              <span className="text-blue-300 font-semibold">Team Player:</span>
              <span>{defaultVal(reviewer.teamPlayer, 0)}</span>

              <span className="text-blue-300 font-semibold">D2L:</span>
              <span>{defaultVal(reviewer.d2l, 0)}</span>

              <span className="text-blue-300 font-semibold">Skill:</span>
              <span>{defaultVal(reviewer.skill, 0)}</span>

              <span className="text-blue-300 font-semibold">
                Skill Category:
              </span>
              <span>{defaultVal(reviewer.skillCategory, "None")}</span>

              <span className="text-blue-300 font-semibold">
                Reviewer Comments:
              </span>
              <span className="whitespace-pre-line">
                {defaultVal(reviewer.comment, "No comments provided.")}
              </span>
            </div>
          ))}
        </div>

        {/* Admin Comments */}
        <div className="mt-6">
          <p className="font-semibold text-blue-300 text-lg mb-2">
            Admin Comments
          </p>
          <div className="flex gap-4 items-start">
            <textarea
              placeholder="Add a comment..."
              className="w-full border rounded p-2 text-sm"
              rows={3}
            />
            <button className="text-blue-200 hover:underline">➤</button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-right">
          <Button type="submit" variant="primary" size="sm">
            Save for interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOverlay;
