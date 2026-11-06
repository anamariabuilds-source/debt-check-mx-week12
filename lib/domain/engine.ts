import { addCalendarMonths, addMonthsToMonth, isValidDate, isValidMonth, monthOf, monthRange } from "./calendar";
import { CALCULATION_VERSION } from "./types";
import type { Evidence, Obligation, ScenarioInput, ScenarioResult, ScheduledItem, UnscheduledItem } from "./types";

const MAX_CENTS = 100_000_000_00;
const MAX_OCCURRENCES = 240;

function assertMoney(value: number | null, field: string): void {
  if (value !== null && (!Number.isSafeInteger(value) || value < 0 || value > MAX_CENTS)) throw new RangeError(`${field}: monto inválido`);
}

export function validateScenario(input: ScenarioInput): void {
  if (!isValidMonth(input.reviewStartMonth)) throw new RangeError("Mes de revisión inválido");
  if (input.horizonMonths !== 12) throw new RangeError("La versión 1 usa exactamente 12 meses");
  if (!input.title.trim() || input.title.length > 120) throw new RangeError("Título inválido");
  assertMoney(input.purchase.priceCents, "Precio");
  assertMoney(input.purchase.advertisedInstallmentCents.value, "Mensualidad");
  if (input.purchase.priceCents <= 0) throw new RangeError("El precio debe ser positivo");
  if (!Number.isInteger(input.purchase.installmentCount) || input.purchase.installmentCount < 1 || input.purchase.installmentCount > 120) throw new RangeError("Mensualidades inválidas");
  if (input.purchase.firstPaymentDate.value !== null && !isValidDate(input.purchase.firstPaymentDate.value)) throw new RangeError("Primera fecha inválida");
  if (input.purchase.firstPaymentDate.state === "estimated") throw new RangeError("La versión 1 no estima la primera fecha de tarjeta");
  if (input.obligations.length > 50) throw new RangeError("Demasiadas obligaciones");
  for (const item of input.obligations) {
    if (!item.label.trim() || item.label.length > 80) throw new RangeError("Etiqueta de obligación inválida");
    assertMoney(item.amountCents.value, item.label);
    if (item.anchorDate.value !== null && !isValidDate(item.anchorDate.value)) throw new RangeError(`Fecha inválida: ${item.label}`);
    if (item.remainingCount !== null && (!Number.isInteger(item.remainingCount) || item.remainingCount < 1 || item.remainingCount > MAX_OCCURRENCES)) throw new RangeError(`Conteo inválido: ${item.label}`);
    if (item.endDate !== null && !isValidDate(item.endDate)) throw new RangeError(`Fin inválido: ${item.label}`);
  }
}

function unscheduled(id: string, label: string, amount: Evidence<number>, remainingCount: number | null, reason: string): UnscheduledItem {
  return { id, label, amountCents: amount.value, amountState: amount.state, amountAssumption: amount.assumption, remainingCount, reason, impact: "Puede cambiar los subtotales y cruces de uno o más meses; el escenario permanece parcial." };
}

function obligationDates(item: Obligation): string[] {
  if (!item.anchorDate.value) return [];
  const step = item.frequency === "monthly" ? 1 : item.frequency === "semiannual" ? 6 : 0;
  const limit = item.remainingCount ?? (step === 0 ? 1 : MAX_OCCURRENCES);
  const dates: string[] = [];
  for (let index = 0; index < limit; index += 1) {
    const date = step === 0 ? item.anchorDate.value : addCalendarMonths(item.anchorDate.value, index * step);
    if (item.endDate && date > item.endDate) break;
    dates.push(date);
    if (step === 0) break;
  }
  return dates;
}

export function calculateScenario(input: ScenarioInput): ScenarioResult {
  validateScenario(input);
  const months = monthRange(input.reviewStartMonth, 12);
  const firstMonth = months[0];
  const lastMonth = months[11];
  const itemsByMonth = new Map(months.map((month) => [month, [] as ScheduledItem[]]));
  const unscheduledItems: UnscheduledItem[] = [];
  let extendsBeyondHorizon = false;

  const purchase = input.purchase;
  if (!purchase.firstPaymentDate.value) {
    unscheduledItems.push(unscheduled("purchase", purchase.label, purchase.advertisedInstallmentCents, purchase.installmentCount, "La primera fecha de pago no está confirmada."));
  } else {
    for (let index = 0; index < purchase.installmentCount; index += 1) {
      const date = addCalendarMonths(purchase.firstPaymentDate.value, index);
      const month = monthOf(date);
      if (month > lastMonth) extendsBeyondHorizon = true;
      if (month < firstMonth || month > lastMonth) continue;
      itemsByMonth.get(month)?.push({ id: `purchase-${index + 1}`, label: `${purchase.label} ${index + 1}/${purchase.installmentCount}`, kind: "purchase", date, amountCents: purchase.advertisedInstallmentCents.value, amountState: purchase.advertisedInstallmentCents.state, dateState: purchase.firstPaymentDate.state, amountAssumption: purchase.advertisedInstallmentCents.assumption });
    }
  }

  for (const obligation of input.obligations) {
    if (!obligation.anchorDate.value) {
      unscheduledItems.push(unscheduled(obligation.id, obligation.label, obligation.amountCents, obligation.remainingCount, "No hay una fecha ancla defendible."));
      continue;
    }
    const dates = obligationDates(obligation);
    for (const [index, date] of dates.entries()) {
      const month = monthOf(date);
      if (month > lastMonth) extendsBeyondHorizon = true;
      if (month < firstMonth || month > lastMonth) continue;
      itemsByMonth.get(month)?.push({ id: `${obligation.id}-${index + 1}`, label: obligation.label, kind: "obligation", date, amountCents: obligation.amountCents.value, amountState: obligation.amountCents.state, dateState: obligation.anchorDate.state, amountAssumption: obligation.amountCents.assumption, dateAssumption: obligation.anchorDate.assumption });
    }
  }

  const unresolvedTiming = unscheduledItems.length > 0;
  const monthly = months.map((month) => {
    const items = itemsByMonth.get(month) ?? [];
    const knownSubtotalCents = items.reduce((sum, item) => sum + (item.amountCents !== null && item.amountState === "known" && item.dateState === "known" ? item.amountCents : 0), 0);
    const hasUncertainPayment = items.some((item) => item.amountCents === null || item.amountState !== "known" || item.dateState !== "known");
    const hasSupportedAmount = items.some((item) => item.amountCents !== null && item.amountState !== "unknown");
    const state = hasUncertainPayment || unresolvedTiming ? (hasSupportedAmount || items.length === 0 ? "partial" : "undeterminable") : "complete";
    return { month, items, knownSubtotalCents, state, overlap: items.length >= 2, unresolvedCouldAffectMonth: unresolvedTiming } as const;
  });

  const hasUsefulKnown = monthly.some((month) => month.items.some((item) => item.amountCents !== null && item.amountState !== "unknown"));
  const hasUncertainty = extendsBeyondHorizon || monthly.some((month) => month.state !== "complete");
  const knownHorizonTotalCents = monthly.reduce((sum, month) => sum + month.knownSubtotalCents, 0);
  const discrepancy = purchase.advertisedInstallmentCents.value === null ? null : purchase.advertisedInstallmentCents.value * purchase.installmentCount - purchase.priceCents;
  const warnings: string[] = [];
  if (discrepancy !== null && discrepancy !== 0) warnings.push(`El total anunciado difiere del precio por ${Math.abs(discrepancy)} centavos. No se atribuye a una comisión sin evidencia.`);
  if (extendsBeyondHorizon) warnings.push(`Existen pagos después de ${addMonthsToMonth(input.reviewStartMonth, 11)}. Esta vista no es el total de vida de la obligación.`);
  if (unscheduledItems.length) warnings.push("Hay pagos sin fecha asignable; no se colocaron en meses inventados.");
  return {
    months: monthly,
    knownHorizonTotalCents,
    unscheduled: unscheduledItems,
    overallState: hasUncertainty ? (hasUsefulKnown || extendsBeyondHorizon ? "partial" : "undeterminable") : "complete",
    warnings,
    extendsBeyondHorizon,
    horizonLabel: `${firstMonth} a ${lastMonth} (12 meses inclusive)`,
    calculationVersion: CALCULATION_VERSION,
  };
}
