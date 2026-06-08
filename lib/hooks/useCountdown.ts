import { useEffect, useState } from "react";
import { getCountdown, type CountdownResult } from "@/lib/utils";

/** Recalculates countdown every second for live deadline badges. */
export function useCountdown(deadline: string | undefined): CountdownResult | null {
  const [result, setResult] = useState<CountdownResult | null>(() =>
    deadline ? getCountdown(deadline) : null,
  );

  useEffect(() => {
    if (!deadline) {
      setResult(null);
      return;
    }

    const update = () => setResult(getCountdown(deadline));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return result;
}
