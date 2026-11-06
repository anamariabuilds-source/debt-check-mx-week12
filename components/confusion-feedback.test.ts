import { expect, it } from "vitest";
import { recordConfusion } from "./confusion-feedback";

it("limits feedback to 100 categorical events with no scenario fields", () => {
  const time = "2026-11-06T00:00:00.000Z";
  const events = Array.from({ length: 101 }).reduce<ReturnType<typeof recordConfusion>>(
    (current) => recordConfusion(current, "subtotal", time),
    [],
  );
  expect(events).toHaveLength(100);
  expect(events[0]).toEqual({ event: "confusion", category: "subtotal", time });
  expect(recordConfusion(events, "arbitrary text", time)).toBe(events);
});
