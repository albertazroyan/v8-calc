import { useRef } from "react";

export default function usePerformance() {
  const startTime = useRef(0);

  const start = () => {
    startTime.current = performance.now();
  };

  const stop = () => {
    const duration = performance.now() - startTime.current;
    return duration.toFixed(2);
  };

  return { start, stop };
}