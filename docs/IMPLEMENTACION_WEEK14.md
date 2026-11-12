# Implementación · Debt Check MX · Week 14

Usa docs/PACKET.md y la versión publicada de Week 13 como base. Conserva el flujo de /product y revisa las rutas existentes antes de editar. Divide el trabajo en cinco cambios verificables.

1. Versiona el Packet con mockup y registra el punto de partida en DECISIONS.md.
2. Implementa /pricing con chequeo completo gratis y oferta experimental de $39 MXN por 12 meses. Identifica quién paga y enlaza al chequeo y al memo.
3. Implementa el simulador con persistencia local de entradas numéricas. Valida enteros para volumen, conversión entre 0 y 100 y precio no negativo. Distingue ingreso bruto anual de equivalente mensual.
4. Publica el memo en /about con el escenario de la lavadora, el comparador Notas/Numbers, el umbral de $390, los 20 minutos autorreportados y el registro de evidencia real cuando exista. Despliega y prueba sin sesión.
5. Documenta y corrige un fallo observado en la prueba mecánica y la principal confusión de la persona. Redespliega, verifica el dominio y registra los resultados y el siguiente paso.

Aceptación: las páginas son públicas, los supuestos son consistentes, el simulador recupera los valores al recargar y el calendario mantiene desconocida la fecha de la lavadora hasta confirmación. Documenta los dos despliegues y conserva el historial real de construcción.
