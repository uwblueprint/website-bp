type Partner = {
  firstName: string;
  lastName: string;
  email: string;
};

type PartnerSectionProps = {
  partner: Partner | null;
  applicantNames: string;
};

const PartnerSection = ({ partner, applicantNames }: PartnerSectionProps) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
        1. Your interview partner:
      </p>
      <p className="font-source text-base text-black/75 leading-[1.4]">
        Contact your interview partner, email is provided below.
      </p>
    </div>
    <div className="flex justify-between items-center border border-[#C4C4C4] rounded-lg p-4 gap-3">
      <div className="flex items-center gap-3">
        <div className="w-[42px] h-[42px] rounded-full bg-charcoal-200 shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="font-poppins font-medium text-base text-[#252525] leading-[1.4]">
            {partner ? `${partner.firstName} ${partner.lastName}` : "—"}
          </span>
          <span className="font-source text-sm text-[#252525] leading-[1.4]">
            Interviewing: {applicantNames}
          </span>
        </div>
      </div>
      <a
        href={partner ? `mailto:${partner.email}` : undefined}
        className="font-source text-base text-[#3279B7] leading-[1.4] no-underline hover:underline"
      >
        {partner?.email ?? "—"}
      </a>
    </div>
  </div>
);

export default PartnerSection;
