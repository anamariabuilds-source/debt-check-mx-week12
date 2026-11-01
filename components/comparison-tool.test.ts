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

describe("comunicación de subtotales con pagos sin fecha", () => {
  it("explica los ceros y el alcance de Completo sin alterar el cálculo", () => {
    const source = readFileSync(new URL("./comparison-tool.tsx", import.meta.url), "utf8");
    expect(source).toContain("Todavía no podemos ubicar todos tus pagos en el calendario.");
    expect(source).toContain("Los meses con $0.00 solo incluyen los pagos con fechas que podemos asignar.");
    expect(source).toContain("Esto no significa que no tengas otros compromisos.");
    expect(source).toContain("No hay pagos con fecha asignable en este mes.");
    expect(source).toContain("No significa que registraste todos tus gastos ni que la compra sea asequible.");
    expect(source).toContain("outcome.unscheduled.length > 0");
  });
});
