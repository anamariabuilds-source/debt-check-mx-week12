"use client";

import { useState } from "react";

const categories = {
  evidence: "Etiqueta de evidencia",
  date: "Fecha",
  subtotal: "Subtotal",
  save: "Guardado",
  other: "Otro",
} as const;

type Category = keyof typeof categories;
type FeedbackEvent = { event: "confusion"; category: Category; time: string };

export function recordConfusion(events: FeedbackEvent[], category: string, time: string): FeedbackEvent[] {
  if (!Object.hasOwn(categories, category)) return events;
  return [...events.slice(-99), { event: "confusion", category: category as Category, time }];
}

export function ConfusionFeedback() {
  const [category, setCategory] = useState<Category>("evidence");
  const [events, setEvents] = useState<FeedbackEvent[]>([]);

  function exportFeedback() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(events)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "debt-check-feedback.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section aria-label="Reportar confusión">
    <h3>Reportar confusión</h3>
    <p>Los reportes se guardan en memoria y se pierden al recargar. La descarga es local.</p>
    <label>Categoría
      <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
        {Object.entries(categories).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select>
    </label>
    <button type="button" onClick={() => {
      const time = new Date().toISOString();
      setEvents((current) => recordConfusion(current, category, time));
    }}>Registrar confusión</button>
    <button type="button" disabled={!events.length} onClick={exportFeedback}>Descargar reportes</button>
    <p role="status">{events.length} reportes en memoria</p>
  </section>;
}
