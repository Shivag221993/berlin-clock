import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTimeParser } from "../hooks/useTimeParser";

describe("useTimeParser - Robust Edge Cases & Parsing Stress Tests", () => {
  it("should parse variables from a standard Date object fallback context", () => {
    const testDate = new Date();
    testDate.setHours(14, 25, 45);

    const { result } = renderHook(() => useTimeParser(testDate, null));
    expect(result.current).toEqual({ hours: 14, minutes: 25, seconds: 45 });
  });

  it("should cleanly prioritize custom string overrides over systemic dates", () => {
    const testDate = new Date();
    const { result } = renderHook(() => useTimeParser(testDate, "21:05:11"));
    expect(result.current).toEqual({ hours: 21, minutes: 5, seconds: 11 });
  });

  it("should gracefully degrade back to zero array blocks under malformed parameters", () => {
    const testDate = new Date();
    const { result } = renderHook(() =>
      useTimeParser(testDate, "invalid:time"),
    );
    expect(result.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should handle completely empty string inputs gracefully without crashing", () => {
    const testDate = new Date();
    const { result } = renderHook(() => useTimeParser(testDate, ""));
    expect(result.current).toEqual({
      hours: testDate.getHours(),
      minutes: testDate.getMinutes(),
      seconds: testDate.getSeconds(),
    });
  });

  it("should parse partial or incomplete custom strings missing seconds securely", () => {
    const testDate = new Date();
    const { result } = renderHook(() => useTimeParser(testDate, "12:30"));
    expect(result.current).toEqual({ hours: 12, minutes: 30, seconds: 0 });
  });

  it("should parse single digit time notations correctly", () => {
    const testDate = new Date();
    const { result } = renderHook(() => useTimeParser(testDate, "1:2:3"));
    expect(result.current).toEqual({ hours: 1, minutes: 2, seconds: 3 });
  });
  it("should fallback to zero when receiving extreme outbound time numbers", () => {
    const testDate = new Date();
    const { result } = renderHook(() => useTimeParser(testDate, "99:99:99"));
    expect(result.current).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});
