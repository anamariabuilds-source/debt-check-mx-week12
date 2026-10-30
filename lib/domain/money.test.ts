import { describe, expect, it } from "vitest";
import { formatMxn, parseMxn } from "./money";
describe("dinero en centavos", () => { it("convierte sin aritmética flotante", () => { expect(parseMxn("1,234.56")).toBe(123456); expect(parseMxn("0")).toBe(0); }); it("rechaza negativos, texto y más de dos decimales", () => { expect(parseMxn("-1")).toBeNull(); expect(parseMxn("hola")).toBeNull(); expect(parseMxn("1.999")).toBeNull(); }); it("formatea MXN", () => expect(formatMxn(123456)).toContain("1,234.56")); });
