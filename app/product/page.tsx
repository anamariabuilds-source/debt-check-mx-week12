import { ComparisonTool } from "@/components/comparison-tool";
import { getAuthenticatedContext } from "@/lib/auth/server";

export default async function Product() {
  const auth = await getAuthenticatedContext();
  const userLabel = auth.status === "authenticated" ? (auth.user.email ?? "Cuenta autenticada") : undefined;
  return <main className="product-page"><div className="page-intro"><p className="eyebrow">COMPARACIÓN PREVIA A LA COMPRA</p><h1>Construye un panorama de 12 meses.</h1><p>Usa datos sintéticos durante la prueba local. Ningún cruce es una recomendación de compra.</p></div><ComparisonTool authState={auth.status} userLabel={userLabel} /></main>;
}
