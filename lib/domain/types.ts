export type EvidenceState = "known" | "estimated" | "unknown";
export type CalculationState = "complete" | "partial" | "undeterminable";
export type Frequency = "monthly" | "semiannual" | "one_time";

export interface Evidence<T> {
  value: T | null;
  state: EvidenceState;
  source: "user" | "rule";
  assumption?: string;
}

export interface ProposedPurchase {
  label: string;
  priceCents: number;
  installmentCount: number;
  advertisedInstallmentCents: Evidence<number>;
  firstPaymentDate: Evidence<string>;
}

export interface Obligation {
  id: string;
  label: string;
  amountCents: Evidence<number>;
  anchorDate: Evidence<string>;
  frequency: Frequency;
  remainingCount: number | null;
  endDate: string | null;
  optional: boolean;
}

export interface ScenarioInput {
  title: string;
  reviewStartMonth: string;
  horizonMonths: 12;
  purchase: ProposedPurchase;
  obligations: Obligation[];
  calculationVersion: "1.0.0";
}

export interface ScheduledItem {
  id: string;
  label: string;
  kind: "purchase" | "obligation";
  date: string;
  amountCents: number | null;
  amountState: EvidenceState;
  dateState: EvidenceState;
}

export interface MonthlyResult {
  month: string;
  items: ScheduledItem[];
  knownSubtotalCents: number;
  state: CalculationState;
  overlap: boolean;
  unresolvedCouldAffectMonth: boolean;
}

export interface UnscheduledItem {
  id: string;
  label: string;
  amountCents: number | null;
  remainingCount: number | null;
  reason: string;
  impact: string;
}

export interface ScenarioResult {
  months: MonthlyResult[];
  knownHorizonTotalCents: number;
  unscheduled: UnscheduledItem[];
  overallState: CalculationState;
  warnings: string[];
  extendsBeyondHorizon: boolean;
  horizonLabel: string;
  calculationVersion: "1.0.0";
}
