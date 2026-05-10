import { InterviewStatus } from "./interviewedApplicants";

export type InterviewedApplicantsDTO = {
  applicantRecordId: string;
  interviewStatus: InterviewStatus;
  applicantFirstName: string;
  applicantLastName: string;
};
