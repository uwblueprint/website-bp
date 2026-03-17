import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import Button from "@components/common/Button";
import { INTERVIEW_NAV_ITEMS } from "../shared/constants";

interface InterviewFooterProps {
  onContinue?: () => void;
}

// NOTE: Follows the same button layout pattern as ReviewStepper (review/shared/ReviewStepper.tsx) —
// flex justify-end with sm secondary/primary button pair — but with interview-specific behavior:
// route-based navigation (instead of context-based stage switching) and a striped background.
// Duplicated to keep the two flows decoupled.
export const InterviewFooter = ({ onContinue }: InterviewFooterProps) => {
  const router = useRouter();
  const theme = useTheme();

  const currentIndex = INTERVIEW_NAV_ITEMS.findIndex(
    (item) => item.path === router.pathname,
  );
  const nextItem = INTERVIEW_NAV_ITEMS[currentIndex + 1];

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (nextItem) {
      router.push(nextItem.path);
    }
  };

  return (
    <div
      className="w-full px-6 py-3"
      style={{
        background: `repeating-linear-gradient(
          -45deg,
          ${theme.palette.primary.light} 0px,
          ${theme.palette.primary.light} 5px,
          #ffffff 5px,
          #ffffff 15px
        )`,
      }}
    >
      <div className="flex items-center justify-end gap-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => router.push("/admin")}
        >
          Back to home
        </Button>
        {nextItem && (
          <Button size="sm" onClick={handleContinue}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};
