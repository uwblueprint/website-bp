import { useEffect, useState } from "react";
import InterviewGroupAPIClient from "APIClients/InterviewGroupAPIClient";
import type {
  Applicant,
  InterviewGroup,
  Interviewer,
} from "types/interviewGroup";

type UseInterviewGroupDataResult = {
  group: InterviewGroup | null;
  applicants: Applicant[];
  interviewers: Interviewer[];
  isLoading: boolean;
  error: string | null;
};

// we can clean this up after we migrate to react query
const useInterviewGroupData = (
  interviewGroupId: string | null,
): UseInterviewGroupDataResult => {
  const [state, setState] = useState<UseInterviewGroupDataResult>({
    group: null,
    applicants: [],
    interviewers: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!interviewGroupId) {
      setState({
        group: null,
        applicants: [],
        interviewers: [],
        isLoading: false,
        error: null,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    Promise.all([
      InterviewGroupAPIClient.getInterviewGroup(interviewGroupId),
      InterviewGroupAPIClient.getInterviewedApplicantsByGroupId(
        interviewGroupId,
      ),
      InterviewGroupAPIClient.getInterviewersByGroupId(interviewGroupId),
    ])
      .then(([group, applicants, interviewers]) => {
        setState({
          group,
          applicants,
          interviewers,
          isLoading: false,
          error: null,
        });
      })
      .catch((e: Error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: e.message,
        }));
      });
  }, [interviewGroupId]);
  return state;
};

export default useInterviewGroupData;
