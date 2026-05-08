"use client";

import { useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import TextLinkButton from "@/components/ui/TextLinkButton";

const CONTACT_EMAIL = "info@uwblueprint.org";

type ContactFormState = {
  name: string;
  email: string;
  npoName: string;
  comment: string;
};

const INITIAL_STATE: ContactFormState = {
  name: "",
  email: "",
  npoName: "",
  comment: "",
};

function buildMailto({ name, email, npoName, comment }: ContactFormState) {
  const to = CONTACT_EMAIL;
  const subject = `Contact — ${npoName || "NPO"} (${name || "Anonymous"})`;

  const body = [
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    `NPO name: ${npoName || "-"}`,
    "",
    comment || "-",
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const contactEmail = CONTACT_EMAIL;
  const canSubmit = useMemo(() => {
    // Keep it simple/forgiving: only block if all main fields are blank.
    return form.name.trim() && form.email.trim() && form.npoName.trim();
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = buildMailto(form);
    window.open(mailto, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-none border border-white bg-white/10 px-4 py-3 text-sm text-[var(--primary-light)] placeholder:text-white/60 outline-none transition-colors duration-150 hover:bg-white/15 focus:bg-white/20 focus:ring-0";

  return (
    <section
      aria-label="Contact"
      className="relative grid w-full grid-cols-12 gap-0 overflow-hidden bg-[var(--bp-blue)] px-8 py-8"
    >
      {/* Message decoration
      <div
        className="pointer-events-none absolute top-6 right-8 z-0 max-w-[90%] translate-x-[-3vw] translate-y-[-72px] w-[min(44vw,160px)] sm:w-[min(40vw,200px)] md:w-[min(34vw,220px)] lg:w-[min(30vw,340px)]"
        aria-hidden
      >
        <div className="relative aspect-[610/916] w-full">
          <img
            src="/img/illos/msg.svg"
            alt=""
            width={610}
            height={916}
            className="h-full w-full object-contain opacity-90"
            decoding="async"
          />
        </div>
      </div> */}

      {/* Header */}
      <h2 className="col-span-12 text-xxl lowercase pb-8 md:pb-12 text-[var(--primary-light)]">
        get in touch
      </h2>

      {/* Intro copy */}
      <p className="col-span-12 text-lg text-white w-full md:w-8/12 pb-24">
        Send us a short message with your mission and the challenges you face.
        We'll promptly reach out and schedule a call to chat further.  
        <span className="text-[var(--secondary-light)]">
          &nbsp;We're still getting the embedded email running - please use our info email below.
        </span>
      </p>

      {/* Form — primary fields use flex + gap; section outer grid stays 12-col */}
      <div className="col-span-12">
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* Name + Email: no empty grid spacer — horizontal spacing is md:gap-4 */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-4">
            <label className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="text-sm text-white">Name</span>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
                className={inputClass}
                placeholder="Your name"
                required
              />
            </label>

            <label className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="text-sm text-white">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                className={inputClass}
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          {/* NPO name — full width */}
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white">NPO name</span>
            <input
              value={form.npoName}
              onChange={(e) =>
                setForm((s) => ({ ...s, npoName: e.target.value }))
              }
              className={inputClass}
              placeholder="Organization name"
              required
            />
          </label>

          {/* Message — vertically resizable from the bottom-right corner only */}
          <label className="flex flex-col gap-2">
            <span className="text-sm text-white">Message</span>
            <textarea
              value={form.comment}
              onChange={(e) =>
                setForm((s) => ({ ...s, comment: e.target.value }))
              }
              className={`${inputClass} min-h-[160px] resize-y`}
              placeholder="Tell us about your nonprofit and the challenges you face…"
            />
          </label>

          {/* Footer row */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <TextLinkButton
              href={`mailto:${contactEmail}`}
              variant="light"
              size="sm"
            >
              {contactEmail}
            </TextLinkButton>

            <button
              type="submit"
              disabled={!canSubmit}
              className={buttonVariants({
                variant: "filled-light",
                size: "default",
              })}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
