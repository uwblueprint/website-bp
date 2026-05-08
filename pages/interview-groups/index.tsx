import {
  PanelLayout,
  SplitPanelLayout,
} from "@components/common/SplitPageLayout";
import { useAuthenticatedUser } from "@components/context/AuthUserContext";
import ProtectedRoute from "@components/context/ProtectedRoute";
import { InterviewHeader } from "@components/interview/layout";
import RecruitmentPlatformThemeProvider from "@components/recruitmentPlatformCommon/RecruitmentPlatformThemeProvider";
import InterviewGroupAPIClient, {
  InterviewGroupStatus,
} from "APIClients/InterviewGroupAPIClient";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import useInterviewGroupData from "../../hooks/useInterviewGroupData";
import { NextPageWithLayout } from "../_app";
import CalendlyLinkForm from "./components/CalendlyLinkForm";
import CalendlyLinkSubmitted from "./components/CalendlyLinkSubmitted";
import CalendlySection from "./components/CalendlySection";
import InterviewGroupIllustrationPanel from "./components/InterviewGroupIllustrationPanel";
import InterviewPageHeader from "./components/InterviewPageHeader";
import PartnerSection from "./components/PartnerSection";

const InterviewGroupContent = ({
  interviewGroupId,
}: {
  interviewGroupId: string;
}) => {
  const currentUser = useAuthenticatedUser();
  const [linkDraft, setLinkDraft] = useState<string | null>(null);
  const [statusOverride, setStatusOverride] =
    useState<InterviewGroupStatus | null>(null);
  const [isSubmittedOverride, setIsSubmittedOverride] = useState<
    boolean | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);

  const { group, applicants, interviewers, isLoading, error } =
    useInterviewGroupData(interviewGroupId);

  const partner =
    interviewers.find((i) => i.id !== String(currentUser?.id)) ?? null;

  const applicantNames = applicants
    .map((a) => `${a.firstName} ${a.lastName}`)
    .join(", ");

  const linkInput = linkDraft ?? group?.schedulingLink ?? "";
  const interviewGroupStatus = statusOverride ?? group?.status ?? null;
  const isSubmitted = isSubmittedOverride ?? !!group?.schedulingLink;

  const updateSchedulingLink = async (
    nextLink: string,
    afterUpdate: () => void,
  ) => {
    if (!interviewGroupId || !interviewGroupStatus) {
      return;
    }

    const updatedGroup = await InterviewGroupAPIClient.updateSchedulingLink(
      interviewGroupId,
      nextLink,
      interviewGroupStatus,
    );

    setLinkDraft(updatedGroup.schedulingLink ?? "");
    setStatusOverride(updatedGroup.status);
    setIsSubmittedOverride(!!updatedGroup.schedulingLink);
    afterUpdate();
  };

  return (
    <PanelLayout borderLeft>
      <div className="flex flex-col gap-9 w-full">
        <InterviewPageHeader />

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

          <PartnerSection
            partner={
              partner
                ? {
                    firstName: partner.firstName,
                    lastName: partner.lastName,
                    email: partner.email,
                  }
                : null
            }
            applicantNames={applicantNames}
          />

          <CalendlySection />

          {isSubmitted ? (
            <CalendlyLinkSubmitted
              linkInput={linkInput}
              onLinkChange={setLinkDraft}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onResubmit={() => {
                void updateSchedulingLink(linkInput, () => {
                  setIsEditing(false);
                });
              }}
            />
          ) : (
            <CalendlyLinkForm
              linkInput={linkInput}
              onLinkChange={setLinkDraft}
              onSubmit={() => {
                void updateSchedulingLink(linkInput, () => {
                  setIsSubmittedOverride(true);
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
  const router = useRouter();
  const rawInterviewGroupId = router.query.interviewGroupId;
  const interviewGroupId =
    typeof rawInterviewGroupId === "string" ? rawInterviewGroupId : null;

  if (!router.isReady || !interviewGroupId) {
    return null;
  }

  return (
    <InterviewGroupContent
      key={interviewGroupId}
      interviewGroupId={interviewGroupId}
    />
  );
};

InterviewGroupPage.getLayout = (page: ReactElement) => (
  <RecruitmentPlatformThemeProvider>
    <ProtectedRoute allowedRoles={["Admin", "User"]}>
      <SplitPanelLayout
        leftWidth={698}
        rightWidth={742}
        header={<InterviewHeader steps={[]} />}
      >
        <InterviewGroupIllustrationPanel />
        {page}
      </SplitPanelLayout>
    </ProtectedRoute>
  </RecruitmentPlatformThemeProvider>
);

export default InterviewGroupPage;
