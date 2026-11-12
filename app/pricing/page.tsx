import Link from "next/link";
import { offerMonths, reusePrice } from "@/lib/pricing/scenario";
import RevenueSimulator from "./revenue-simulator";
import "./pricing.css";

export default function Pricing() {
  return (
    <main className="content pricing">
      <h1>Precios</h1>
      <p className="lead">Revisa gratis cómo encaja una compra a plazos con tus otros pagos.</p>
      <div className="pricing-grid">
        <section className="form-card">
          <p className="plan-label">Para compras ocasionales</p>
          <h2>Chequeo completo</h2>
          <p className="plan-price">Gratis</p>
          <p>Incluye el calendario de 12 meses, los cruces de pagos y los subtotales parciales. Los compromisos sin fecha quedan visibles.</p>
          <Link className="button primary" href="/product">Revisar mi compra</Link>
        </section>
        <section className="form-card">
          <p className="plan-label">Para compras recurrentes · En evaluación</p>
          <h2>Reutilización guardada</h2>
          <p className="plan-price">${reusePrice} MXN <small>por {offerMonths} meses</small></p>
          <p>La compradora pagaría por reabrir su calendario y ajustar lo que cambió para la siguiente compra. Puede seguir haciendo el chequeo completo gratis o reutilizar su propia hoja.</p>
          <p>Oferta en evaluación. Aún no se cobra.</p>
        </section>
      </div>
      <RevenueSimulator />
      <p><Link href="/about#memo-10-a-1">Leer la comparación 10:1 con Notas y Numbers</Link></p>
    </main>
  );
}
