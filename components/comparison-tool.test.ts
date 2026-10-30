import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("contrato del campo de primer pago", () => {
  it("sincroniza el valor visible del control date durante el evento input", () => {
    const source = readFileSync(new URL("./comparison-tool.tsx", import.meta.url), "utf8");
    const confirmedDateField = source.match(/<label>Primer pago confirmado[\s\S]*?<\/label>/)?.[0] ?? "";
    expect(confirmedDateField).toContain("onInput=");
  });
});
