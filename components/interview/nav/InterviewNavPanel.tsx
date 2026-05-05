import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import ArrowLeftIcon from "@components/icons/arrow-left.icon";
import ArrowRightIcon from "@components/icons/arrow-right.icon";
import { INTERVIEW_NAV_ITEMS } from "../shared/constants";

interface InterviewNavPanelProps {
  candidateName: string;
}

export const InterviewNavPanel = ({
  candidateName,
}: InterviewNavPanelProps) => {
  const router = useRouter();
  const theme = useTheme();

  const { interviewedApplicantRecordId } = router.query;
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="flex flex-col">
      <Link href="/admin">
        <a className="w-fit flex justify-center items-center gap-2 py-2 px-4 rounded-full border-2 border-blue bg-white hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-blue" />
          <span className="text-blue text-base font-normal leading-snug">
            Back to home
          </span>
        </a>
      </Link>

      <h2 className="font-poppins text-[28px] font-semibold leading-[140%] text-[#252525] mt-5">
        {candidateName}&apos;s Interview Review
      </h2>

      <hr className="mt-8 mb-8 border-[#C4C4C4]" />

      <ul className="flex flex-col gap-[36px]">
        {INTERVIEW_NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <li key={item.step}>
              <Link
                href={
                  interviewedApplicantRecordId
                    ? `${item.path}?interviewedApplicantRecordId=${interviewedApplicantRecordId}`
                    : item.path
                }
              >
                <a
                  className={`flex items-center justify-between self-stretch rounded-lg px-5 py-2.5 hover:bg-[#F1F1F1] ${
                    active ? "bg-[#F1F1F1] font-semibold" : "font-normal"
                  }`}
                  style={{
                    color: active
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  }}
                >
                  <span className="font-poppins text-xl font-normal leading-[140%]">
                    {item.label}
                  </span>
                  <ArrowRightIcon className="text-[#2E3A59]" />
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
