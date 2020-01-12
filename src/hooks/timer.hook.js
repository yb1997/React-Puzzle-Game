import { useState, useEffect, useRef, useCallback } from "react";

export const useTimer = initVal => {
  const [timeLeft, setTimeLeft] = useState(initVal); // seconds
  const timerIdRef = useRef(null);
  const currentTimeLeftRef = useRef(initVal);

  useEffect(() => {
    return () => clearTimeout(timerIdRef.current);
  }, []);

  const pause = useCallback(() => {
    clearTimeout(timerIdRef.current);
  }, []);

  const start = useCallback(() => {
    timerIdRef.current = setInterval(() => {
      if (currentTimeLeftRef.current <= 0) {
        clearInterval(timerIdRef.current);
        return;
      }
      currentTimeLeftRef.current = currentTimeLeftRef.current - 1;
      setTimeLeft(time => time - 1);
    }, 1000);

    // setTimeLeft(time => time - 1);
  }, []);

  const reset = useCallback(() => {
    clearTimeout(timerIdRef.current);
    setTimeLeft(initVal);
    currentTimeLeftRef.current = initVal;
  }, [initVal]);

  const restart = useCallback(() => {
    reset();
    setTimeout(() => {
      start();
    });
  }, [reset, start]);

  return [timeLeft, start, pause, reset, restart];
};
