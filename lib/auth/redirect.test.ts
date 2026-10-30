import { describe, expect, it } from "vitest";
import { internalRedirect, safeInternalPath } from "./redirect";

describe("OAuth redirect safety", () => {
  it("accepts only local paths and keeps local query strings", () => {
    expect(safeInternalPath("/product?mode=saved")).toBe("/product?mode=saved");
  });

  it.each(["https://evil.example", "//evil.example/path", "/\\evil.example", "javascript:alert(1)", "/product\nX-Test: bad"])("rejects unsafe redirect %s", (value) => {
    expect(safeInternalPath(value)).toBe("/product");
  });

  it("adds callback status without corrupting an existing query string", () => {
    expect(internalRedirect("http://localhost:3000", "/product?mode=saved", "session_error").toString()).toBe(
      "http://localhost:3000/product?mode=saved&auth=session_error",
    );
  });
});
