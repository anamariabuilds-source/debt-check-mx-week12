import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Debt Check MX", description: "Compara compromisos antes de comprar, sin inventar certezas." };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="es-MX"><body><header className="site-header"><Link className="brand" href="/"><span>DC</span> Debt Check MX</Link><nav aria-label="Principal"><Link href="/">Inicio</Link><Link href="/product">Comparar</Link><Link href="/about">Acerca de</Link></nav></header>{children}<footer><p>Herramienta informativa. Tú conservas la decisión de compra.</p><p>Datos manuales; no son estados de cuenta bancarios.</p></footer></body></html>;
}
