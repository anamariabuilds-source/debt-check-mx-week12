const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MONTH = /^(\d{4})-(\d{2})$/;

export function isValidDate(value: string): boolean {
  const match = DATE.exec(value);
  if (!match) return false;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function isValidMonth(value: string): boolean {
  const match = MONTH.exec(value);
  return Boolean(match && Number(match[2]) >= 1 && Number(match[2]) <= 12);
}

export function monthOf(date: string): string { return date.slice(0, 7); }

export function addMonthsToMonth(month: string, count: number): string {
  if (!isValidMonth(month)) throw new RangeError("Mes inválido");
  const [year, index] = month.split("-").map(Number);
  const date = new Date(Date.UTC(year, index - 1 + count, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function addCalendarMonths(dateValue: string, count: number): string {
  if (!isValidDate(dateValue)) throw new RangeError("Fecha inválida");
  const [year, month, day] = dateValue.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1 + count, 1));
  const lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return `${first.getUTCFullYear()}-${String(first.getUTCMonth() + 1).padStart(2, "0")}-${String(Math.min(day, lastDay)).padStart(2, "0")}`;
}

export function monthRange(start: string, count = 12): string[] {
  return Array.from({ length: count }, (_, index) => addMonthsToMonth(start, index));
}
