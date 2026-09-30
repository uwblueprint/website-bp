import { useEffect, useState } from "react";
import {
  ApplicationPhase,
  getApplicationPhase,
  getMsUntilPhaseEnd,
} from "@constants/applications";

type ApplicationCountdown = {
  phase: ApplicationPhase;
  msRemaining: number;
};

// get the current state of the application based on deadline
const useApplicationPhase = (): ApplicationCountdown | null => {
  const [countdown, setCountdown] = useState<ApplicationCountdown | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setCountdown({
        phase: getApplicationPhase(now),
        msRemaining: getMsUntilPhaseEnd(now),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return countdown;
};

export default useApplicationPhase;
