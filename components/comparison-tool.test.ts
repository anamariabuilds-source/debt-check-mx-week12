import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("contrato del campo de primer pago", () => {
  it("usa el mismo selector de fecha que los otros pagos y permite una fecha desconocida", () => {
    const source = readFileSync(new URL("./comparison-tool.tsx", import.meta.url), "utf8");
    const confirmedDateField = source.match(/<label>Primer pago confirmado[\s\S]*?<\/label>/)?.[0] ?? "";
    expect(confirmedDateField).toContain('type="date"');
    expect(confirmedDateField).toContain('Déjalo vacío');
    expect(source).toContain('firstDate ? "known" : "unknown"');
  });
});

describe("comunicación de subtotales con pagos sin fecha", () => {
  it("explica los ceros y el alcance de Completo sin alterar el cálculo", () => {
    const source = readFileSync(new URL("./comparison-tool.tsx", import.meta.url), "utf8");
    expect(source).toContain("Todavía no podemos ubicar todos tus pagos en el calendario.");
    expect(source).toContain("El subtotal solo incluye pagos con monto y fecha conocidos.");
    expect(source).toContain("Esto no significa que no tengas otros compromisos.");
    expect(source).toContain("No hay pagos con fecha asignable en este mes.");
    expect(source).toContain("No significa que registraste todos tus gastos ni que la compra sea asequible.");
    expect(source).toContain("outcome.unscheduled.length > 0");
  });
});
