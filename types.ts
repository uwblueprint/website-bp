export interface AuthStatus {
  loading: boolean;
  isAuthorized: boolean;
}

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  academicYear: string;
  program: string;
  resumeLink: string;
  firstChoiceRole: string;
  secondChoiceRole: string;
};

export type ApplicationDTO = {
  id: number;
  academicOrCoop: string;
  academicYear: string;
  email: string;
  firstChoiceRole: string;
  firstName: string;
  heardFrom: string;
  lastName: string;
  locationPreference: string;
  program: string;
  pronouns: string;
  pronounsSpecified: string;
  resumeUrl: string;
  roleSpecificQuestions: string[];
  secondChoiceRole: string;
  shortAnswerQuestions: string[];
  status: string;
  secondChoiceStatus: string;
  term: string;
  timesApplied: string;
  timestamp: bigint;
};

export enum ReviewStage {
  INFO = "INFO",
  PFSG = "PFSG",
  TP = "TP",
  D2L = "D2L",
  SKL = "SKL",
  END = "END",
  END_SUCCESS = "END_SUCCESS",
}
