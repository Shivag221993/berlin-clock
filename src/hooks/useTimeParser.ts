import { useMemo } from "react";

export const useTimeParser = (date: Date, customTimeStr: string | null) => {
  return useMemo(() => {
    if (customTimeStr) {
      const [h, m, s] = customTimeStr.split(":").map(Number);
      return { hours: h || 0, minutes: m || 0, seconds: s || 0 };
    }
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  }, [date, customTimeStr]);
};
