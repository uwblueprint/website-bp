import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InterviewGroupAPIClient, {
  InterviewGroupStatus,
} from "APIClients/InterviewGroupAPIClient";
import {
  SplitPanelLayout,
  PanelLayout,
} from "@components/common/SplitPageLayout";
import ProtectedRoute from "@components/context/ProtectedRoute";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import { LinkIcon } from "@components/icons/link.icon";
import { EditIcon } from "@components/icons/edit.icon";
import { LongLeftIcon } from "@components/icons/long-left.icon";
import { InterviewHeader } from "@components/interview/layout";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";
import useInterviewGroupData from "../../hooks/useInterviewGroupData";
import { NextPageWithLayout } from "../_app";

const CalendlyLinkSubmitted = ({
  linkInput,
  onLinkChange,
  isEditing,
  onEdit,
  onResubmit,
}: {
  linkInput: string;
  onLinkChange: (value: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  onResubmit: () => void;
}) => (
  <div className="flex gap-4 border border-[#C4C4C4] rounded-lg py-6 pr-6 pl-4">
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00A403] shrink-0">
      <svg
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2L8 14L2 8"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="flex flex-col gap-8 flex-1">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-poppins font-medium text-xl text-[#00A403] leading-[1.4]">
            Link submitted!
          </p>
          <p className="font-source text-base text-black/75 leading-[1.4]">
            If you would like to re-submit your Calendly link press the edit
            icon below.
          </p>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={linkInput}
            onChange={(e) => onLinkChange(e.target.value)}
            className="w-full border border-[#7D7D7D] rounded-[5px] py-[10px] px-5 text-sm text-charcoal-400 font-normal leading-[1.43] outline-none focus:border-blue"
          />
        ) : (
          <div className="flex items-center gap-[10px] border border-[#7D7D7D] rounded-[5px] py-[10px] px-5">
            <span className="flex-1 text-sm text-[#3279B7] font-normal leading-[1.43] truncate">
              {linkInput}
            </span>
            <button
              onClick={onEdit}
              className="shrink-0 hover:opacity-70"
              aria-label="Edit link"
            >
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          disabled={!isEditing || !linkInput}
          onClick={onResubmit}
          className={`rounded-full py-2 px-4 bg-blue text-white font-source text-base font-normal leading-[1.4] ${
            !isEditing || !linkInput
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
        >
          Re-submit link
        </button>
      </div>
    </div>
  </div>
);

const CalendlyLinkForm = ({
  linkInput,
  onLinkChange,
  onSubmit,
}: {
  linkInput: string;
  onLinkChange: (value: string) => void;
  onSubmit: () => void;
}) => (
  <div className="flex flex-col gap-8 border border-[#C4C4C4] rounded-lg p-6">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
          Paste Calendly link below
        </p>
        <p className="font-source text-base text-black/75 leading-[1.4]">
          Paste your completed Calendly link here below. This link will be used
          by Admins to send out to your interviewees.
        </p>
      </div>
      <input
        type="text"
        placeholder="Paste link here"
        value={linkInput}
        onChange={(e) => onLinkChange(e.target.value)}
        className="w-full border border-[#7D7D7D] rounded-[5px] py-[10px] px-5 text-sm text-charcoal-400 font-normal leading-[1.43] outline-none focus:border-blue"
      />
    </div>
    <div className="flex justify-end">
      <button
        disabled={!linkInput}
        onClick={onSubmit}
        className={`rounded-full py-2 px-4 bg-blue text-white font-source text-base font-normal leading-[1.4] ${
          !linkInput ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        Submit Link
      </button>
    </div>
  </div>
);

const InterviewGroupContent = () => {
  const router = useRouter();
  const currentUser = useAuthenticatedUser();
  const [linkInput, setLinkInput] = useState("");
  const [interviewGroupStatus, setInterviewGroupStatus] =
    useState<InterviewGroupStatus | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const rawInterviewGroupId = router.query.interviewGroupId;
  const interviewGroupId =
    typeof rawInterviewGroupId === "string" ? rawInterviewGroupId : null;
  const { group, applicants, interviewers, isLoading, error } =
    useInterviewGroupData(interviewGroupId);

  useEffect(() => {
    if (!group) {
      return;
    }
    const link = group.schedulingLink ?? "";
    setLinkInput(link);
    setInterviewGroupStatus(group.status);
    setIsSubmitted(!!link);
  }, [group]);

  if (!router.isReady) {
    return null;
  }

  const partner = interviewers.find((i) => i.id !== currentUser?.id) ?? null;

  const applicantNames = applicants
    .map((a) => `${a.firstName} ${a.lastName}`)
    .join(", ");

  return (
    <PanelLayout borderLeft>
      <div className="flex flex-col gap-9 w-full">
        <div className="flex flex-col gap-3">
          <Link href="/admin" passHref>
            <a className="font-source no-underline inline-flex justify-center items-center gap-2 w-fit cursor-pointer shrink-0 rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] hover:opacity-90 hover:bg-sky-100">
              <LongLeftIcon />
              Back to home
            </a>
          </Link>
          <p className="font-poppins font-semibold text-[28px] text-[#252525] leading-[1.4]">
            Interview Pairing
          </p>
          <p className="font-poppins font-normal text-[20px] text-black leading-[1.4]">
            Review & coordinate your interviews with your partner
          </p>
        </div>
        <div className="flex flex-col gap-12 w-full">
          {isLoading && (
            <div className="border border-[#C4C4C4] rounded-lg px-4 py-3 bg-[#F4FAFF]">
              <p className="font-source text-sm text-[#3279B7] leading-[1.4]">
                Loading interview group details...
              </p>
            </div>
          )}
          {error && (
            <div className="border border-[#E9B0B0] rounded-lg px-4 py-3 bg-[#FFF5F5]">
              <p className="font-source text-sm text-[#9F1C1C] leading-[1.4]">
                Could not load all interview details. Please refresh and try
                again.
              </p>
            </div>
          )}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
                1. Your interview partner:
              </p>
              <p className="font-source text-base text-black/75 leading-[1.4]">
                Contact your interview partner, email is provided below.
              </p>
            </div>
            <div className="flex justify-between items-center border border-[#C4C4C4] rounded-lg p-4 gap-3">
              <div className="flex items-center gap-3">
                {/* TODO: render profile picture using profilePictureFileId once a file URL resolver endpoint is available */}
                <div className="w-[42px] h-[42px] rounded-full bg-charcoal-200 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-poppins font-medium text-base text-[#252525] leading-[1.4]">
                    {partner ? `${partner.firstName} ${partner.lastName}` : "—"}
                  </span>
                  <span className="font-source text-sm text-[#252525] leading-[1.4]">
                    Interviewing: {applicantNames}
                  </span>
                </div>
              </div>
              <a
                href={partner ? `mailto:${partner.email}` : undefined}
                className="font-source text-base text-[#3279B7] leading-[1.4] no-underline hover:underline"
              >
                {partner?.email ?? "—"}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
                2. Coordinate schedule availability
              </p>
              <p className="font-source text-base text-black/75 leading-[1.4]">
                Coordinate availabilities with your partner on Calendly to set
                up schedule times.
              </p>
            </div>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-fit cursor-pointer rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] no-underline hover:bg-sky-100"
            >
              Open Calendly
              <LinkIcon />
            </a>
          </div>

          {isSubmitted ? (
            <CalendlyLinkSubmitted
              linkInput={linkInput}
              onLinkChange={setLinkInput}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onResubmit={() => {
                if (!interviewGroupId || !interviewGroupStatus) {
                  return;
                }
                InterviewGroupAPIClient.updateSchedulingLink(
                  interviewGroupId,
                  linkInput,
                  interviewGroupStatus,
                ).then((group) => {
                  setLinkInput(group.schedulingLink ?? "");
                  setInterviewGroupStatus(group.status);
                  setIsEditing(false);
                });
              }}
            />
          ) : (
            <CalendlyLinkForm
              linkInput={linkInput}
              onLinkChange={setLinkInput}
              onSubmit={() => {
                if (!interviewGroupId || !interviewGroupStatus) {
                  return;
                }
                InterviewGroupAPIClient.updateSchedulingLink(
                  interviewGroupId,
                  linkInput,
                  interviewGroupStatus,
                ).then((group) => {
                  setLinkInput(group.schedulingLink ?? "");
                  setInterviewGroupStatus(group.status);
                  setIsSubmitted(!!group.schedulingLink);
                });
              }}
            />
          )}
        </div>
      </div>
    </PanelLayout>
  );
};

const InterviewGroupPage: NextPageWithLayout = () => {
  return <InterviewGroupContent />;
};

InterviewGroupPage.getLayout = (page: ReactElement) => (
  <RecruitmentPlatformThemeProvider>
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <SplitPanelLayout
        leftWidth={698}
        rightWidth={742}
        header={<InterviewHeader steps={[]} />}
      >
        <div className="h-full bg-[#FAFAFA] border-r border-[#C4C4C4] flex items-center justify-center overflow-hidden">
          <div
            className="relative [container-type:inline-size]"
            style={{ width: "63%", aspectRatio: "441 / 537" }}
          >
            <img
              src="/common/review-page-banner.svg"
              alt="blueprint"
              className="absolute"
              style={{ left: "0%", top: "0%", width: "99.77%" }}
            />
            <p
              className="absolute font-poppins font-medium text-black leading-[1.4] whitespace-nowrap"
              style={{ left: "56.46%", top: "18.07%", fontSize: "4.535cqi" }}
            >
              Application Review
            </p>
            <img
              src="/common/review-page-people.svg"
              alt=""
              className="absolute"
              style={{ left: "16.33%", top: "42.85%", width: "75.05%" }}
            />
          </div>
        </div>
        {page}
      </SplitPanelLayout>
    </ProtectedRoute>
  </RecruitmentPlatformThemeProvider>
);

export default InterviewGroupPage;
