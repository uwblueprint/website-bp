import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { INTERVIEW_NAV_ITEMS } from "../shared/constants";

interface InterviewNavPanelProps {
  candidateName: string;
}

export const InterviewNavPanel = ({ candidateName }: InterviewNavPanelProps) => {
  const router = useRouter();
  const theme = useTheme();

  const { interviewedApplicantRecordId } = router.query;
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="flex flex-col">
      <Link href="/admin">
        <a
          className="text-sm hover:underline"
          style={{ color: theme.palette.primary.main }}
        >
          &larr; Back to home
        </a>
      </Link>

      <h2
        className="text-[22px] font-semibold mt-6"
        style={{ color: theme.palette.text.primary }}
      >
        {candidateName}&apos;s Interview Review
      </h2>

      <hr className="my-4 border-[#C4C4C4]" />

      <ul className="flex flex-col gap-1">
        {INTERVIEW_NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <li key={item.step}>
              <Link href={interviewedApplicantRecordId ? `${item.path}?interviewedApplicantRecordId=${interviewedApplicantRecordId}` : item.path}>
                <a
                  className="flex items-center justify-between px-3 py-3 rounded"
                  style={{
                    color: active
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="text-lg">&rarr;</span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
