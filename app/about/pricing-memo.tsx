import Link from "next/link";
import { offerMonths, reusePrice, valueMultiple } from "@/lib/pricing/scenario";

const target = reusePrice * valueMultiple;
const assumedHourlyValue = 120;

export default function PricingMemo() {
  return (
    <section aria-labelledby="memo-10-a-1">
      <h2 id="memo-10-a-1">Memo 10:1 · ¿Cuánto vale reutilizar el calendario?</h2>
      <p>La usuaria y pagadora sería una compradora en México que vuelve a revisar una compra a plazos. La oferta en evaluación es de ${reusePrice} MXN por {offerMonths} meses de reutilización guardada. El chequeo completo sigue gratis.</p>
      <h3>La misma decisión durante 12 meses</h3>
      <p>Una entrevistada reportó unos 20 minutos en Notas y cálculo mental para evaluar una lavadora de $12,000 MXN a 12 meses sin intereses junto con las mensualidades del celular y el seguro semestral. Ante otra compra, la comparación es actualizar esos mismos compromisos en Notas o Numbers frente a reabrir y actualizar el calendario guardado. En ambos casos se verifica la primera fecha con el banco.</p>
      <h3>Dinero, tiempo y riesgo</h3>
      <p>El caso no reportó un desembolso adicional por usar Notas. Los 20 minutos son autorreportados para una compra. Aún faltan tiempos comparables para la reutilización. Una primera fecha equivocada puede dejar un mes con menos dinero del necesario. El calendario muestra ese compromiso sin fecha y marca los subtotales como parciales. El cálculo provisional asigna $0 a pérdidas evitadas mientras no haya evidencia.</p>
      <h3>El umbral en pesos</h3>
      <p>${reusePrice} × {valueMultiple} = <strong>${target} MXN</strong> de beneficio incremental en {offerMonths} meses. Si todo el beneficio fuera tiempo, un valor supuesto de ${assumedHourlyValue} MXN por hora exigiría {target / assumedHourlyValue * 60} minutos ahorrados al año. El 10:1 queda pendiente de demostrar con reutilización observada.</p>
      <h3>Qué decidiría la prueba</h3>
      <p>Se ofrecerá el precio a una compradora recurrente después de observar que puede reutilizar el calendario para una compra pendiente. Falta registrar su respuesta y motivo. Si el chequeo gratis o su hoja resuelven la tarea con esfuerzo parecido, se replanteará la oferta.</p>
      <p>La contribución por pago se estima restando a los ${reusePrice} MXN los costos de adquisición, configuración, soporte y correcciones. Estos costos siguen pendientes de medir.</p>
      <Link href="/pricing">Ver precios y simulador</Link>
    </section>
  );
}
