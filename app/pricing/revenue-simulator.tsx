"use client";

import { useState } from "react";
import {
  defaultScenario, mxn, projectRevenue, revenueScenario, type RevenueScenario,
} from "@/lib/pricing/scenario";

const storageKey = "debt-check-mx.revenue-scenario.v1";
const fields = [
  { key: "users", label: "Compradoras elegibles en 12 meses", max: 10_000_000, step: 1 },
  { key: "conversion", label: "Conversión a pago (%)", max: 100, step: "any" },
  { key: "price", label: "Precio por 12 meses (MXN)", max: 100_000, step: "any" },
] as const;

function toInputs(scenario: RevenueScenario) {
  return { users: String(scenario.users), conversion: String(scenario.conversion), price: String(scenario.price) };
}

export default function RevenueSimulator() {
  const [inputs, setInputs] = useState(toInputs(defaultScenario));
  const [message, setMessage] = useState("");
  const parsed = revenueScenario.safeParse({
    users: inputs.users === "" ? NaN : Number(inputs.users),
    conversion: inputs.conversion === "" ? NaN : Number(inputs.conversion),
    price: inputs.price === "" ? NaN : Number(inputs.price),
  });
  const projection = parsed.success ? projectRevenue(parsed.data) : null;

  function save() {
    if (!parsed.success) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(parsed.data));
      setMessage("Escenario guardado en este navegador.");
    } catch {
      setMessage("El navegador no permitió guardar el escenario.");
    }
  }

  function restore() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        setMessage("Todavía no hay un escenario guardado en este navegador.");
        return;
      }
      const saved = revenueScenario.parse(JSON.parse(stored));
      setInputs(toInputs(saved));
      setMessage("Escenario recuperado.");
    } catch {
      setMessage("No se pudo recuperar el escenario. Puedes guardar uno nuevo.");
    }
  }

  return (
    <section className="form-card revenue">
      <h2>Simulador de ingresos del proyecto</h2>
      <p>Esta sección muestra cuánto podría ingresar a Debt Check MX. Los valores iniciales de volumen y conversión son supuestos. Cambiar el precio aquí solo cambia la proyección.</p>
      <div className="fields">
        {fields.map(({ key, label, max, step }) => (
          <label key={key}>
            {label}
            <input type="number" min={0} max={max} step={step} value={inputs[key]}
              onChange={(event) => {
                setInputs({ ...inputs, [key]: event.target.value });
                setMessage("");
              }} />
          </label>
        ))}
      </div>
      <div className="revenue-results" aria-live="polite">
        {projection ? (
          <>
            <div>Ingreso bruto en 12 meses <strong>{mxn.format(projection.annual)} MXN</strong></div>
            <div>Promedio mensual de ingresos <strong>{mxn.format(projection.monthly)} MXN</strong></div>
          </>
        ) : <p>Ingresa un número entero de compradoras entre 0 y 10 millones, un porcentaje de 0 a 100 y un precio de 0 a 100,000 MXN.</p>}
      </div>
      <p>Ingreso anual = compradoras elegibles × conversión × precio. Cada compradora convertida representa un solo pago por 12 meses. El promedio mensual divide el ingreso anual entre 12. La proyección excluye renovaciones y costos.</p>
      <div className="actions">
        <button type="button" className="button primary" disabled={!parsed.success} onClick={save}>Guardar cifras de ingresos</button>
        <button type="button" className="button secondary" onClick={restore}>Recuperar cifras guardadas</button>
      </div>
      <p>Se guardan el número de compradoras, la conversión y el precio en este navegador.</p>
      <p role="status">{message}</p>
    </section>
  );
}
