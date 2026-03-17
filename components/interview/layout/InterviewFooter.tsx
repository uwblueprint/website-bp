import { useRouter } from "next/router";
import Button from "@components/common/Button";
import { INTERVIEW_NAV_ITEMS } from "../shared/constants";

// NOTE: Follows the same button layout pattern as ReviewStepper (review/shared/ReviewStepper.tsx) —
// flex justify-end with sm secondary/primary button pair — but with interview-specific behavior:
// route-based navigation (instead of context-based stage switching).
// Duplicated to keep the two flows decoupled.
export const InterviewFooter = () => {
  const router = useRouter();

  const currentIndex = INTERVIEW_NAV_ITEMS.findIndex(
    (item) => item.path === router.pathname,
  );
  const nextItem = INTERVIEW_NAV_ITEMS[currentIndex + 1];

  return (
    <div className="w-full bg-white px-6 py-3">
      <div className="flex items-center justify-end gap-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => router.push("/admin")}
        >
          Back to home
        </Button>
        {nextItem && (
          <Button size="sm" onClick={() => router.push(nextItem.path)}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};
