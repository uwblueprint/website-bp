import { useEffect, useState } from "react";
import InterviewGroupAPIClient from "APIClients/InterviewGroupAPIClient";
import InterviewPageAPIClient from "APIClients/InterviewPageAPIClient";
import type { InterviewedApplicantsDTO } from "types/interviewPage";
import { InterviewGroupDTO } from "types/interviewGroup";
import { UserDTO } from "types/auth";

type UseInterviewGroupDataResult = {
  group: InterviewGroupDTO | null;
  interviewedApplicants: InterviewedApplicantsDTO[];
  interviewers: UserDTO[];
  isLoading: boolean;
  error: boolean;
};

// we can clean this up after we migrate to react query
const useInterviewGroupData = (
  interviewGroupId: string | null,
  userId: number | null,
): UseInterviewGroupDataResult => {
  const [state, setState] = useState<UseInterviewGroupDataResult>({
    group: null,
    interviewedApplicants: [],
    interviewers: [],
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    if (!interviewGroupId || !userId) {
      setState({
        group: null,
        interviewedApplicants: [],
        interviewers: [],
        isLoading: false,
        error: false,
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: false,
    }));

    Promise.all([
      InterviewGroupAPIClient.getInterviewGroupById(interviewGroupId),
      InterviewPageAPIClient.getInterviewedApplicantsByUserId(userId),
      InterviewPageAPIClient.getInterviewersByGroupId(interviewGroupId),
    ])
      .then(([group, interviewedApplicants, interviewers]) => {
        if (!interviewers.find((i) => String(i.id) === String(userId))) {
          setState({
            group: null,
            interviewedApplicants: [],
            interviewers: [],
            isLoading: false,
            error: true,
          });
          return;
        }
        setState({
          group,
          interviewedApplicants,
          interviewers,
          isLoading: false,
          error: false,
        });
      })
      .catch((e: Error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: true,
        }));
      });
  }, [interviewGroupId]);
  return state;
};

export default useInterviewGroupData;
