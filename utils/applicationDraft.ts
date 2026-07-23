import type { AppFormValues } from "@components/apply/AppForm";
import { APPLICATION_TERM } from "@constants/applications";

// session storage for persisting application fields
const STORAGE_KEY = "uwbp:application-draft";

export type DraftValues = Omit<AppFormValues, "resume">;

type StoredDraft = {
  term: string;
  values: DraftValues;
};

export const saveDraft = (values: AppFormValues) => {
  const { resume, ...rest } = values;
  const payload: StoredDraft = { term: APPLICATION_TERM, values: rest };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const loadDraft = (): DraftValues | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredDraft;
    if (parsed?.term !== APPLICATION_TERM) return null;
    return parsed.values ?? null;
  } catch {
    return null;
  }
};

export const clearDraft = () => {
  window.sessionStorage.removeItem(STORAGE_KEY);
};
