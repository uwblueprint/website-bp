export enum ReviewStage {
  INFO = "INFO",
  PFSG = "PFSG",
  TP = "TP",
  D2L = "D2L",
  SKL = "SKL",
  END = "END",
  END_SUCCESS = "END_SUCCESS",
}

export const REVIEW_STAGES = [
  ReviewStage.INFO,
  ReviewStage.PFSG,
  ReviewStage.TP,
  ReviewStage.D2L,
  ReviewStage.SKL,
  ReviewStage.END,
];

/** Matches backend `ReviewStatusEnum` in website-bp-be. */
export const REVIEW_RECORD_STATUS = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CONFLICT: "Conflict",
} as const;
