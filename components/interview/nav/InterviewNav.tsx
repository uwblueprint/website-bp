import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { INTERVIEW_NAV_ITEMS } from "../shared/constants";

interface InterviewNavProps {
  candidateName: string;
}

export const InterviewNav = ({ candidateName }: InterviewNavProps) => {
  const router = useRouter();
  const theme = useTheme();

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="flex flex-col h-full p-6">
      <Link href="/admin">
        <span
          className="text-sm cursor-pointer hover:underline"
          style={{ color: theme.palette.primary.main }}
        >
          &larr; Back to home
        </span>
      </Link>

      <h2 className="text-[22px] font-semibold text-[#252525] mt-6">
        {candidateName}&apos;s Interview Review
      </h2>

      <hr className="my-4 border-[#C4C4C4]" />

      <ul className="flex flex-col gap-1">
        {INTERVIEW_NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <li key={item.step}>
              <Link href={item.path}>
                <div
                  className="flex items-center justify-between px-3 py-3 rounded cursor-pointer"
                  style={{
                    color: active ? theme.palette.primary.main : theme.palette.text.primary,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="text-lg">&rarr;</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
