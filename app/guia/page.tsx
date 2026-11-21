import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./guide.css";

export const metadata: Metadata = {
  title: "Antes de comprar a plazos | Debt Check MX",
  description: "Un ejemplo de pagos que coinciden, qué datos necesitas y qué queda pendiente cuando falta una fecha.",
};
const panels = [
  { src: "A_carrusel_01.png", alt: "Ejemplo ficticio: lavadora de 9,600 MXN en 12 pagos de 800, desde el 15 de enero de 2027. ¿En qué meses coincide con celular y seguro?" },
  { src: "A_carrusel_02.png", alt: "Tres pagos seleccionados: enero 1,400 MXN; marzo 3,800; septiembre 3,200. No incluyen otros gastos ni indican capacidad de pago." },
  { src: "A_carrusel_03.png", alt: "Reúne importe, primera fecha de pago y pagos restantes. Tú eliges y verificas los datos. No se descubren obligaciones omitidas." },
];
export default function GuidePage() {
  return <main className="guide-page">
    <header className="guide-intro">
      <p className="eyebrow">ANTES DE COMPROMETERTE</p>
      <h1>Ve la comparación.<br /><em>También sus límites.</em></h1>
      <p className="lead">¿Estás planeando comprar un electrodoméstico a plazos? Revisa cómo sus pagos podrían coincidir con los que ya tienes, antes de ingresar tus datos.</p>
      <p className="guide-demo-label">Todos los ejemplos de esta guía son ficticios. No son testimonios ni una revisión de tus finanzas.</p>
      <div className="actions"><a className="button secondary" href="#ejemplo">Explorar el ejemplo</a><Link className="button primary" href="/product">Crear comparación gratuita</Link></div>
    </header>
    <section className="guide-section" id="ejemplo" aria-labelledby="example-title">
      <p className="eyebrow">ANTES DE COMPROMETERTE</p>
      <h2 id="example-title">La mensualidad no cuenta toda la historia</h2>
      <p>La compra del ejemplo tiene el mismo pago cada mes; las otras obligaciones terminan o se repiten en meses distintos.</p>
      <div className="guide-carousel" aria-label="Tres láminas del ejemplo; desliza horizontalmente en el celular">
        {panels.map((panel, index) => <figure key={panel.src}><Image src={`/week15/${panel.src}`} alt={panel.alt} width={1080} height={1350} sizes="(max-width: 700px) 85vw, 32vw" priority={index === 0} /><figcaption>Lámina {index + 1} de 3</figcaption></figure>)}
      </div>
      <div className="guide-text-example">
        <h3>El ejemplo en texto</h3>
        <p>Lavadora: 12 pagos de $800 MXN, de enero a diciembre de 2027, con primer pago el 15 de enero. Celular: cuatro pagos de $600, de enero a abril. Seguro: dos pagos de $2,400, en marzo y septiembre.</p>
        <table><caption>Subtotales conocidos de estos tres pagos seleccionados</caption><thead><tr><th scope="col">Mes de 2027</th><th scope="col">Pagos que coinciden</th><th scope="col">Subtotal MXN</th></tr></thead><tbody><tr><th scope="row">Enero</th><td>Compra y celular</td><td>$1,400</td></tr><tr><th scope="row">Marzo</th><td>Compra, celular y seguro</td><td>$3,800</td></tr><tr><th scope="row">Septiembre</th><td>Compra y seguro</td><td>$3,200</td></tr></tbody></table>
        <p className="guide-limit">Estos subtotales no incluyen otros gastos. No indican si la compra es asequible.</p>
      </div>
      <a className="guide-download" href="/week15/A_antes_de_comprometerte.pdf" download>Descargar el carrusel en PDF</a>
    </section>
    <section className="guide-section guide-unknown" id="sin-fecha" aria-labelledby="unknown-title">
      <div>
        <p className="eyebrow">LO QUE TODAVÍA NO SABES</p>
        <h2 id="unknown-title">Sin fecha no significa sin pago</h2>
        <p>Si ingresas un pago de $300 MXN pero no sabes cuándo vence, no se puede ubicar en un mes. Su ausencia del calendario no lo convierte en cero.</p>
        <p>El subtotal conocido no incluye ese cargo. La obligación sigue pendiente; confirma su fecha para ubicarla.</p>
        <p className="guide-limit">Un mes sin pagos mostrados no demuestra que no tengas obligaciones ni que puedas comprar.</p>
        <a className="guide-download" href="/week15/B_tarjeta_01.png" download>Descargar la tarjeta</a>
      </div>
      <Image src="/week15/B_tarjeta_01.png" alt="Ejemplo ficticio: pago de 300 MXN con fecha desconocida. Permanece pendiente y no equivale a cero. El subtotal es parcial." width={1080} height={1350} sizes="(max-width: 700px) 90vw, 40vw" />
    </section>
    <section className="guide-section" id="datos" aria-labelledby="ready-title">
      <p className="eyebrow">DEL DATO AL CALENDARIO</p>
      <h2 id="ready-title">Antes de empezar, ten esto a la mano</h2>
      <div className="guide-readiness">
        <article><h3>Tu compra propuesta</h3><ul><li>Precio y número de mensualidades.</li><li>Importe de la mensualidad anunciada, si lo conoces.</li><li>Primera fecha de pago confirmada para ubicarla en el calendario.</li></ul></article>
        <article><h3>Los pagos que quieras comparar</h3><ul><li>Importe y fecha del próximo pago.</li><li>Frecuencia: mensual, semestral o una sola vez.</li><li>Cuántos pagos faltan, incluido el próximo.</li></ul></article>
      </div>
      <p>Tú eliges los pagos y verificas los datos. No necesitas conectar tu banco. No ingreses contraseñas, números de cuenta ni estados de cuenta.</p>
      <p className="guide-limit">Si no conoces la primera fecha de tu compra, el calendario principal no puede mostrar su coincidencia real. Las opciones de inicio que ofrece la herramienta son escenarios provisionales, no fechas confirmadas.</p>
      <p>Puedes consultar primero la <a href="/week15/C_del_dato_al_calendario.pdf">guía práctica de una página</a>, con el ejemplo, las entradas y los límites.</p>
      <div className="actions"><Link className="button primary" href="/product">Crear comparación gratuita</Link><a className="button secondary" href="/week15/C_del_dato_al_calendario.pdf" download>Descargar la guía</a></div>
      <p className="guide-limit">La comparación no decide por ti, no confirma fechas con el banco y no incluye obligaciones que no ingreses. Si tus Notas ya responden la pregunta con menos esfuerzo, no necesitas cambiar de herramienta.</p>
    </section>
  </main>;
}
