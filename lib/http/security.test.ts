import { describe, expect, it } from "vitest";
import { readBoundedJson, rejectCrossOriginMutation } from "./security";

describe("HTTP mutation boundary", () => {
  it("accepts a same-origin mutation and rejects missing or cross-site origins", () => {
    expect(rejectCrossOriginMutation(new Request("https://debt.example/api/scenarios", { method: "POST", headers: { origin: "https://debt.example" } }))).toBeNull();
    expect(rejectCrossOriginMutation(new Request("https://debt.example/api/scenarios", { method: "POST" }))?.status).toBe(403);
    expect(rejectCrossOriginMutation(new Request("https://debt.example/api/scenarios", { method: "POST", headers: { origin: "https://evil.example" } }))?.status).toBe(403);
  });

  it("parses bounded JSON and reports malformed input", async () => {
    await expect(readBoundedJson(new Request("https://debt.example/api", { method: "POST", body: '{"ok":true}' }))).resolves.toEqual({ ok: true });
    await expect(readBoundedJson(new Request("https://debt.example/api", { method: "POST", body: "{" }))).rejects.toMatchObject({ status: 400 });
  });
});
