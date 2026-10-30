import { describe, expect, it } from "vitest";
import { GET, POST } from "./route";

describe("scenario API without external configuration", () => {
  it("reports configuration pending without contacting an external service", async () => {
    const response = await GET();
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ code: "configuration_pending" });
  });

  it("rejects cross-origin mutation before authentication", async () => {
    const response = await POST(new Request("http://localhost:3000/api/scenarios", { method: "POST", headers: { origin: "https://evil.example" }, body: "{}" }));
    expect(response.status).toBe(403);
  });
});
