import { z } from "zod";

export const reusePrice = 39;
export const offerMonths = 12;
export const valueMultiple = 10;

export const revenueScenario = z.object({
  users: z.number().int().min(0).max(10_000_000),
  conversion: z.number().min(0).max(100),
  price: z.number().min(0).max(100_000),
});

export type RevenueScenario = z.infer<typeof revenueScenario>;

export const defaultScenario: RevenueScenario = {
  users: 100,
  conversion: 5,
  price: reusePrice,
};

export const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export function projectRevenue({ users, conversion, price }: RevenueScenario) {
  const annual = users * (conversion / 100) * price;
  return { annual, monthly: annual / offerMonths };
}
