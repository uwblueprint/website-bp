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

export type ConflictModalProps = {
  readonly name: string | undefined;
  readonly open: boolean;
  readonly onClose: () => void;
};

export type TeamRole = "PM" | "DESIGNER" | "PL" | "DEVELOPER";

export type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  teamRole: TeamRole;
};