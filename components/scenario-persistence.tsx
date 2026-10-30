"use client";

import { useCallback, useEffect, useState } from "react";
import type { ScenarioInput } from "@/lib/domain/types";

export type PersistenceAuthState = "configuration_pending" | "logged_out" | "authenticated";
type ScenarioSummary = { id: string; title: string; state: string; calculationVersion: string; updatedAt: string };
type ApiError = { error?: string; code?: string };

async function responseBody(response: Response): Promise<Record<string, unknown> & ApiError> {
  try {
    const body = await response.json() as unknown;
    return body && typeof body === "object" ? body as Record<string, unknown> & ApiError : {};
  } catch {
    return {};
  }
}

export function ScenarioPersistence({ authState, userLabel, input, onOpen }: { authState: PersistenceAuthState; userLabel?: string; input: ScenarioInput | null; onOpen: (input: ScenarioInput) => void }) {
  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(authState === "authenticated");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFailure = useCallback((body: ApiError, fallback: string) => {
    if (body.code === "session_expired") setError("Tu sesión expiró. Vuelve a iniciar sesión antes de guardar.");
    else setError(body.error || fallback);
  }, []);

  const loadList = useCallback(async () => {
    if (authState !== "authenticated") return;
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/scenarios", { cache: "no-store", credentials: "same-origin" });
      const body = await responseBody(response);
      if (!response.ok) return handleFailure(body, "No se pudieron cargar los escenarios.");
      setScenarios(Array.isArray(body.scenarios) ? body.scenarios as ScenarioSummary[] : []);
    } catch {
      setError("No se pudo conectar con el servicio de escenarios.");
    } finally {
      setLoading(false);
    }
  }, [authState, handleFailure]);

  useEffect(() => {
    if (authState !== "authenticated") return;
    let active = true;
    fetch("/api/scenarios", { cache: "no-store", credentials: "same-origin" })
      .then(async (response) => ({ response, body: await responseBody(response) }))
      .then(({ response, body }) => {
        if (!active) return;
        if (!response.ok) handleFailure(body, "No se pudieron cargar los escenarios.");
        else setScenarios(Array.isArray(body.scenarios) ? body.scenarios as ScenarioSummary[] : []);
      })
      .catch(() => { if (active) setError("No se pudo conectar con el servicio de escenarios."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [authState, handleFailure]);

  if (authState === "configuration_pending") return <div className="save-panel"><div><strong>Guardado privado pendiente</strong><p>El cálculo local funciona, pero Supabase y Google todavía no están configurados. No se guarda información como sustituto silencioso.</p></div></div>;
  if (authState === "logged_out") return <div className="save-panel"><div><strong>Inicia sesión para guardar</strong><p>El cálculo no se guarda hasta que exista una sesión autenticada y las políticas RLS estén verificadas.</p></div><a className="button primary" href="/auth/sign-in?next=/product">Continuar con Google</a></div>;

  const save = async () => {
    if (!input) { setError("Corrige los campos inválidos antes de guardar."); return; }
    setLoading(true); setError(""); setMessage("");
    try {
      const endpoint = selectedId ? `/api/scenarios/${selectedId}` : "/api/scenarios";
      const response = await fetch(endpoint, { method: selectedId ? "PUT" : "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const body = await responseBody(response);
      if (!response.ok) return handleFailure(body, "No se pudo guardar el escenario.");
      const scenario = body.scenario as { id?: string } | undefined;
      if (scenario?.id) setSelectedId(scenario.id);
      setMessage(selectedId ? "Escenario actualizado." : "Escenario guardado de forma privada.");
      await loadList();
    } catch {
      setError("No se pudo conectar con el servicio de guardado.");
    } finally {
      setLoading(false);
    }
  };

  const open = async (id: string) => {
    setLoading(true); setError(""); setMessage("");
    try {
      const response = await fetch(`/api/scenarios/${id}`, { cache: "no-store", credentials: "same-origin" });
      const body = await responseBody(response);
      if (!response.ok) return handleFailure(body, "No se pudo abrir el escenario.");
      const scenario = body.scenario as { input?: ScenarioInput } | undefined;
      if (!scenario?.input) return setError("El escenario no contiene una entrada válida.");
      onOpen(scenario.input); setSelectedId(id); setMessage("Escenario reabierto con sus estados de evidencia originales.");
    } catch {
      setError("No se pudo conectar con el servicio de escenarios.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (pendingDelete !== id) { setPendingDelete(id); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/scenarios/${id}`, { method: "DELETE", credentials: "same-origin" });
      const body = await responseBody(response);
      if (!response.ok) return handleFailure(body, "No se pudo eliminar el escenario.");
      if (selectedId === id) setSelectedId(null);
      setPendingDelete(null); setMessage("Escenario eliminado."); await loadList();
    } catch {
      setError("No se pudo conectar con el servicio de escenarios.");
    } finally {
      setLoading(false);
    }
  };

  return <section className="persistence" aria-busy={loading}>
    <div className="persistence-header"><div><strong>Guardado privado</strong><p>Sesión: {userLabel ?? "cuenta autenticada"}. Los resultados se recalculan en el servidor antes de guardarse.</p></div><form action="/auth/sign-out" method="post"><button className="button secondary" type="submit">Cerrar sesión</button></form></div>
    <div className="persistence-actions"><button className="button primary" type="button" disabled={loading} onClick={() => void save()}>{loading ? "Procesando…" : selectedId ? "Actualizar escenario" : "Guardar escenario"}</button>{selectedId && <button className="button secondary" type="button" disabled={loading} onClick={() => setSelectedId(null)}>Guardar como nuevo</button>}<button className="button secondary" type="button" disabled={loading} onClick={() => void loadList()}>Actualizar lista</button></div>
    {message && <p className="success-message" role="status">{message}</p>}{error && <p className="error-message" role="alert">{error}</p>}
    <div className="saved-list"><h3>Escenarios guardados</h3>{loading && scenarios.length === 0 ? <p role="status">Cargando escenarios…</p> : scenarios.length === 0 ? <p>No hay escenarios guardados para esta cuenta.</p> : <ul>{scenarios.map((scenario) => <li key={scenario.id}><div><strong>{scenario.title}</strong><small>Estado: {scenario.state} · cálculo {scenario.calculationVersion} · actualizado {new Date(scenario.updatedAt).toLocaleString("es-MX")}</small></div><div><button type="button" disabled={loading} onClick={() => void open(scenario.id)}>Abrir</button><button className="delete-button" type="button" disabled={loading} onClick={() => void remove(scenario.id)}>{pendingDelete === scenario.id ? "Confirmar eliminación" : "Eliminar"}</button>{pendingDelete === scenario.id && <button type="button" onClick={() => setPendingDelete(null)}>Cancelar</button>}</div></li>)}</ul>}</div>
  </section>;
}
