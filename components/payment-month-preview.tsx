import { useState } from "react";
import { formatMxn } from "@/lib/domain/money";
import type { ScenarioResult } from "@/lib/domain/types";

const monthName = new Intl.DateTimeFormat("es-MX", {
  month: "long", year: "numeric", timeZone: "UTC",
});

export function PaymentMonthPreview({ months, amount, count }: {
  months: ScenarioResult["months"];
  amount: number | null;
  count: number;
}) {
  const [starts, setStarts] = useState([1, 2]);
  const name = (month: string) => monthName.format(new Date(month + "-01T00:00:00Z"));

  return (
    <section className="form-card payment-preview">
      <h3>¿Qué pasaría si tu compra empieza en otro mes?</h3>
      <p>Compara dos meses posibles para el primer pago. Esta prueba es provisional y el calendario principal conserva la fecha como desconocida.</p>
      <div className="fields">
        {starts.map((start, column) => (
          <label key={column}>
            Primer pago · Opción {column + 1}
            <select value={start} onChange={(event) => {
              const value = Number(event.target.value);
              setStarts((current) => current.map((previous, index) => index === column ? value : previous));
            }}>
              {months.map(({ month }, index) => <option key={month} value={index}>{name(month)}</option>)}
            </select>
          </label>
        ))}
      </div>
      <p>Cada opción suma la mensualidad de la compra a los pagos con monto y fecha confirmados. Los demás pagos pendientes quedan fuera de estas cifras.</p>
      <div className="payment-preview-table">
        <table>
          <caption>Pagos por mes en dos escenarios provisionales</caption>
          <thead><tr><th scope="col">Mes</th><th scope="col">Pagos confirmados</th>{starts.map((start, column) => (
            <th key={column} scope="col">Si empieza en {name(months[start].month)}</th>
          ))}</tr></thead>
          <tbody>{months.map(({ month, knownSubtotalCents }, index) => (
            <tr key={month}>
              <th scope="row">{name(month)}</th>
              <td>{formatMxn(knownSubtotalCents)}</td>
              {starts.map((start, column) => {
                const includesPurchase = index >= start && index < start + count;
                return <td key={column}>{includesPurchase && amount === null
                  ? "Incluye una mensualidad de monto desconocido"
                  : formatMxn(knownSubtotalCents + (includesPurchase ? amount ?? 0 : 0))}
                  {includesPurchase && amount !== null && <small>Incluye mensualidad {index - start + 1} de {count}</small>}
                </td>;
              })}
            </tr>
          ))}</tbody>
        </table>
      </div>
      {starts.map((start, column) => {
        const outside = Math.max(0, start + count - months.length);
        return outside > 0 && <p key={column}>Opción {column + 1} · {outside} {outside === 1 ? "mensualidad queda" : "mensualidades quedan"} después de esta vista.</p>;
      })}
    </section>
  );
}
