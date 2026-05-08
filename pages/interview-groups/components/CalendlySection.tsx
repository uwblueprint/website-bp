import { LinkIcon } from "@components/icons/link.icon";

const CalendlySection = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="font-poppins font-medium text-xl text-blue leading-[1.4]">
        2. Coordinate schedule availability
      </p>
      <p className="font-source text-base text-black/75 leading-[1.4]">
        Coordinate availabilities with your partner on Calendly to set up
        schedule times.
      </p>
    </div>
    <a
      href="https://calendly.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 w-fit cursor-pointer rounded-full py-2 px-4 border-2 border-blue bg-white text-blue text-base font-normal leading-[1.4] no-underline hover:bg-sky-100"
    >
      Open Calendly
      <LinkIcon />
    </a>
  </div>
);

export default CalendlySection;
