export enum ReviewStage {
  INFO = "INFO",
  PFSG = "PFSG",
  TP = "TP",
  D2L = "D2L",
  SKL = "SKL",
  END = "END",
  END_SUCCESS = "END_SUCCESS",
}

export const BACK_TO_HOME_HREF = "/admin";

export const REVIEW_STAGES = [
  ReviewStage.INFO,
  ReviewStage.PFSG,
  ReviewStage.TP,
  ReviewStage.D2L,
  ReviewStage.SKL,
  ReviewStage.END,
];

export const REVIEW_SCORE_STAGES = [
  ReviewStage.PFSG,
  ReviewStage.TP,
  ReviewStage.D2L,
  ReviewStage.SKL,
];
