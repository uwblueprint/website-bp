/**
 * Review page GraphQL client (website-bp-be reviewed applicant record APIs).
 * Note: backend `ReviewInput` has no `comments` field; free-text comments are not persisted via this mutation until the schema adds it.
 */
import BaseAPIClient from "./BaseAPIClient";
import { fetchGraphql } from "@utils/makegqlrequest";
import { mutations, queries } from "graphql/queries";
import { ApplicationDTO } from "types/review";
import { ReviewStage } from "@components/review/shared/constants";
import { ReviewEndData, ReviewScores } from "@components/review/shared/types";

export type GraphQLReviewFragment = {
  passionFSG?: number | null;
  teamPlayer?: number | null;
  desireToLearn?: number | null;
  skill?: number | null;
  skillCategory?: string | null;
  comments?: string | null;
};

export type ReviewedApplicantRecordPayload = {
  applicantRecordId: string;
  reviewerId: number;
  status: string;
  score?: number | null;
  reviewerHasConflict: boolean;
  review?: GraphQLReviewFragment | null;
};

const SKILL_UI_TO_GRAPHQL: Record<string, string> = {
  junior: "JUNIOR",
  intermediate: "INTERMEDIATE",
  senior: "SENIOR",
};

const SKILL_GRAPHQL_TO_UI: Record<string, string> = {
  JUNIOR: "junior",
  INTERMEDIATE: "intermediate",
  SENIOR: "senior",
};

function mapApplicationFromApi(raw: Record<string, unknown>): ApplicationDTO {
  const idRaw = raw.id;
  const idNum =
    typeof idRaw === "string"
      ? parseInt(idRaw, 10)
      : typeof idRaw === "number"
      ? idRaw
      : NaN;

  return {
    id: Number.isFinite(idNum) ? idNum : 0,
    academicOrCoop: String(raw.academicOrCoop ?? ""),
    academicYear: String(raw.academicYear ?? ""),
    email: String(raw.email ?? ""),
    firstChoiceRole: String(raw.firstChoiceRole ?? ""),
    firstName: String(raw.firstName ?? ""),
    heardFrom: String(raw.heardFrom ?? ""),
    lastName: String(raw.lastName ?? ""),
    locationPreference: String(raw.locationPreference ?? ""),
    program: String(raw.program ?? ""),
    pronouns: String(raw.pronouns ?? ""),
    pronounsSpecified: String(raw.pronounsSpecified ?? ""),
    resumeUrl: String(raw.resumeUrl ?? ""),
    roleSpecificQuestions: (raw.roleSpecificQuestions as string[]) ?? [],
    secondChoiceRole: String(raw.secondChoiceRole ?? ""),
    shortAnswerQuestions: (raw.shortAnswerQuestions as string[]) ?? [],
    status: String(raw.status ?? ""),
    secondChoiceStatus: String(raw.secondChoiceStatus ?? ""),
    term: String(raw.term ?? ""),
    timesApplied: String(raw.timesApplied ?? ""),
    timestamp: BigInt(
      typeof raw.timestamp === "number"
        ? raw.timestamp
        : Number(raw.timestamp) || 0,
    ),
  };
}

export function reviewFragmentToScores(
  review: GraphQLReviewFragment | null | undefined,
): ReviewScores {
  const n = (v: number | null | undefined) =>
    v != null && v >= 1 && v <= 5 ? v : 0;

  return {
    [ReviewStage.INFO]: 0,
    [ReviewStage.PFSG]: n(review?.passionFSG),
    [ReviewStage.TP]: n(review?.teamPlayer),
    [ReviewStage.D2L]: n(review?.desireToLearn),
    [ReviewStage.SKL]: n(review?.skill),
    [ReviewStage.END]: 0,
    [ReviewStage.END_SUCCESS]: 0,
  };
}

export function reviewFragmentToEndData(
  review: GraphQLReviewFragment | null | undefined,
): Pick<ReviewEndData, "comments" | "skillsCategory"> {
  const gqlSkill = review?.skillCategory;
  const skillsCategory =
    gqlSkill && SKILL_GRAPHQL_TO_UI[gqlSkill]
      ? SKILL_GRAPHQL_TO_UI[gqlSkill]
      : "";

  return {
    comments: review?.comments ?? "",
    skillsCategory,
  };
}

/** Build review input: only include scores in 1–5 (backend validation). */
export function buildReviewInputFromScores(
  scores: ReviewScores,
): Record<string, number> {
  const out: Record<string, number> = {};
  const pairs: [ReviewStage, string][] = [
    [ReviewStage.PFSG, "passionFSG"],
    [ReviewStage.TP, "teamPlayer"],
    [ReviewStage.D2L, "desireToLearn"],
    [ReviewStage.SKL, "skill"],
  ];
  for (const [stage, key] of pairs) {
    const v = scores[stage];
    if (v >= 1 && v <= 5) {
      out[key] = v;
    }
  }
  return out;
}

export function buildReviewInputForSubmit(
  scores: ReviewScores,
  endData: ReviewEndData,
): Record<string, unknown> {
  const review: Record<string, unknown> = {
    ...buildReviewInputFromScores(scores),
  };
  const mapped = SKILL_UI_TO_GRAPHQL[endData.skillsCategory];
  if (mapped) {
    review.skillCategory = mapped;
  }
  return review;
}

async function loadReviewPage(
  applicantRecordId: string,
  reviewerId: number,
): Promise<{
  application: ApplicationDTO;
  record: ReviewedApplicantRecordPayload;
}> {
  BaseAPIClient.handleAuthRefresh();

  const [appRes, recordRes] = await Promise.all([
    fetchGraphql(queries.reviewApplicantPage, { applicantRecordId }),
    fetchGraphql(queries.getReviewedApplicantRecord, {
      applicantRecordId,
      reviewerId,
    }),
  ]);

  const application = mapApplicationFromApi(
    appRes.data.reviewApplicantPage as Record<string, unknown>,
  );
  const record = recordRes.data
    .getReviewedApplicantRecord as ReviewedApplicantRecordPayload;

  return { application, record };
}

async function updateReviewedApplicantRecord(input: {
  applicantRecordId: string;
  reviewerId: number;
  review?: Record<string, unknown>;
  status: string;
}): Promise<ReviewedApplicantRecordPayload> {
  BaseAPIClient.handleAuthRefresh();
  const result = await fetchGraphql(mutations.updateReviewedApplicantRecord, {
    input: {
      applicantRecordId: input.applicantRecordId,
      reviewerId: input.reviewerId,
      ...(input.review && Object.keys(input.review).length > 0
        ? { review: input.review }
        : {}),
      status: input.status,
    },
  });
  return result.data
    .updateReviewedApplicantRecord as ReviewedApplicantRecordPayload;
}

export default {
  loadReviewPage,
  updateReviewedApplicantRecord,
};
