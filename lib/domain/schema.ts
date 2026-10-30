import { z } from "zod";

const evidenceState = z.enum(["known", "estimated", "unknown"]);
const source = z.enum(["user", "rule"]);
const evidence = <T extends z.ZodType>(value: T) => z.object({ value: value.nullable(), state: evidenceState, source, assumption: z.string().max(300).optional() }).superRefine((item, context) => {
  const checked = item as unknown as { value: unknown | null; state: "known" | "estimated" | "unknown"; assumption?: string };
  if (checked.state === "unknown" && checked.value !== null) context.addIssue({ code: "custom", path: ["value"], message: "Un valor desconocido debe almacenarse como null." });
  if (checked.state !== "unknown" && checked.value === null) context.addIssue({ code: "custom", path: ["value"], message: "Un valor conocido o estimado necesita contenido." });
  if (checked.state === "estimated" && !checked.assumption?.trim()) context.addIssue({ code: "custom", path: ["assumption"], message: "Una estimación requiere su supuesto." });
});
const cents = z.number().int().min(0).max(100_000_000_00);
const date = z.iso.date();

export const scenarioSchema = z.object({
  title: z.string().trim().min(1).max(120),
  reviewStartMonth: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  horizonMonths: z.literal(12),
  calculationVersion: z.literal("1.0.0"),
  purchase: z.object({
    label: z.string().trim().min(1).max(80),
    priceCents: cents.positive(),
    installmentCount: z.number().int().min(1).max(120),
    advertisedInstallmentCents: evidence(cents),
    firstPaymentDate: evidence(date),
  }),
  obligations: z.array(z.object({
    id: z.string().min(1).max(80),
    label: z.string().trim().min(1).max(80),
    amountCents: evidence(cents),
    anchorDate: evidence(date),
    frequency: z.enum(["monthly", "semiannual", "one_time"]),
    remainingCount: z.number().int().min(1).max(240).nullable(),
    endDate: date.nullable(),
    optional: z.boolean(),
  })).max(50),
}).superRefine((scenario, context) => {
  if (scenario.purchase.firstPaymentDate.state === "estimated") context.addIssue({ code: "custom", path: ["purchase", "firstPaymentDate"], message: "La versión 1 no estima la primera fecha de tarjeta." });
});

const calculationState = z.enum(["complete", "partial", "undeterminable"]);
export const scenarioResultSchema = z.object({
  months: z.array(z.object({
    month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    items: z.array(z.object({
      id: z.string().min(1).max(160),
      label: z.string().min(1).max(120),
      kind: z.enum(["purchase", "obligation"]),
      date,
      amountCents: cents.nullable(),
      amountState: evidenceState,
      dateState: evidenceState,
    })).max(200),
    knownSubtotalCents: cents,
    state: calculationState,
    overlap: z.boolean(),
    unresolvedCouldAffectMonth: z.boolean(),
  })).length(12),
  knownHorizonTotalCents: cents,
  unscheduled: z.array(z.object({
    id: z.string().min(1).max(160),
    label: z.string().min(1).max(120),
    amountCents: cents.nullable(),
    remainingCount: z.number().int().min(1).max(240).nullable(),
    reason: z.string().min(1).max(500),
    impact: z.string().min(1).max(500),
  })).max(100),
  overallState: calculationState,
  warnings: z.array(z.string().min(1).max(500)).max(100),
  extendsBeyondHorizon: z.boolean(),
  horizonLabel: z.string().min(1).max(300),
  calculationVersion: z.literal("1.0.0"),
});
