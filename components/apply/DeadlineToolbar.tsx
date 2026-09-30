import { FC } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ApplicationPhase } from "@constants/applications";

/** Format as mm:ss. */
const formatCountdown = (ms: number) => {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const ExclamationIcon: FC<{ urgent: boolean }> = ({ urgent }) => (
  <span
    aria-hidden="true"
    className={`flex-none flex items-center justify-center w-6 h-6 rounded-full border-2 bg-charcoal-0 font-bold text-sm ${
      urgent
        ? "border-red-500 text-red-500"
        : "border-yellow-300 text-yellow-300"
    }`}
  >
    !
  </span>
);

type Props = {
  readonly phase: ApplicationPhase;
  readonly msRemaining: number;
};

// gives visual feedback on their time so ppl stop being late
const DeadlineToolbar: FC<Props> = ({ phase, msRemaining }) => {
  const reduceMotion = useReducedMotion();

  const urgent = phase !== "closing";

  const countdown = (
    <strong className="font-semibold">{formatCountdown(msRemaining)}</strong>
  );

  const message =
    phase === "closing" ? (
      <>
        The application window is closing in {countdown}. Get that submission
        in!
      </>
    ) : phase === "grace" ? (
      <>
        The application window has closed! Submit within {countdown} to be
        considered.
      </>
    ) : (
      <>The application window has closed. Thank you for your interest!</>
    );

  return (
    <div className="fixed z-40 top-24 right-4 md:top-28 md:right-6 max-w-[calc(100vw-2rem)] md:max-w-sm pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {phase !== "quiet" && (
          <motion.div
            key={phase}
            initial={reduceMotion ? { opacity: 0 } : { x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "110%", opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.28,
              ease: "easeOut",
            }}
            className={`flex items-center gap-3 px-4 py-3 shadow-lg bg-charcoal-0 border border-charcoal-300 border-l-4 ${
              urgent ? "border-l-red-500" : "border-l-yellow-300"
            }`}
          >
            <ExclamationIcon urgent={urgent} />
            <p className="text-sm text-charcoal-700">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeadlineToolbar;
