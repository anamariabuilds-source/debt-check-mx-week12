import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("contrato del campo de primer pago", () => {
  it("usa una fecha ISO explícita sin segmentación local del navegador", () => {
    const source = readFileSync(new URL("./comparison-tool.tsx", import.meta.url), "utf8");
    const confirmedDateField = source.match(/<label>Primer pago confirmado[\s\S]*?<\/label>/)?.[0] ?? "";
    expect(confirmedDateField).not.toContain("onInput=");
    expect(confirmedDateField).toContain('type="text"');
    expect(confirmedDateField).toContain('placeholder="AAAA-MM-DD"');
    expect(confirmedDateField).toContain('pattern="\\d{4}-\\d{2}-\\d{2}"');
  });
});
