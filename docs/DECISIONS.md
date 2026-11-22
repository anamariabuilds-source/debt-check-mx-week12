# Decisions — Debt Check MX Week 12

## 2026-10-30 — Stage B start

- Founder authorized local development/testing only; Gate C remains closed.
- Selected strategy: rebuild the Week 12 domain model while adapting only small verified Week 10 concepts.
- Reused concepts: integer MXN cents, `Intl.NumberFormat('es-MX')`, bounded inputs, discrepancy warnings, conservative human-decision language, and pure-function tests.
- Rejected direct reuse: exact-date overlap map, budget/limit verdicts, optional Gemini/vision workflow, ephemeral one-page architecture.
- Persistence choice: versioned owner-scoped scenario snapshots. Local browser storage is deliberately not presented as private persistence.
- Calendar policy: monthly and six-calendar-month recurrence clamps to the last valid day; tested for leap years.
- Card policy: first payment is manually confirmed or unknown; estimated first card dates are rejected in v1.
- Transcript: native session copied at Stage B start with SHA-256 recorded in `docs/EVIDENCE_MANIFEST.md`.

## 2026-10-30 — Mechanical failures retained

- First npm install failed because the existing user cache was inaccessible; retried with an isolated temporary cache instead of deleting user data.
- First unit run exposed a brittle case-sensitive expectation, corrected without changing engine behavior.
- Next 16 declarations referenced URLPattern types absent from the installed TypeScript lib surface. `skipLibCheck` was enabled for dependency declarations; strict checking remains enabled for project source.
- Do not run standalone `tsc` concurrently with `next build`: both read/write generated `.next/types`. Final verification runs build and then typecheck sequentially.

## 2026-10-30 — Founder-reported date synchronization bug

- Kept recurrence logic unchanged because exact API reproduction proved it already scheduled November 2026 through October 2027 correctly.
- Applied the smallest UI correction at the date event boundary: synchronize on `input` as well as `change`.
- Corrected the independent global-state defect revealed by the symptoms: a scenario with known payments outside the 12-month view is partial, never complete.
- Added the known in-horizon total to make the 12 × MXN 1,000 expectation directly observable.

## 2026-10-30 — Remove native segmented date ambiguity

- The second founder reproduction proved that `onInput` could capture a transient prior month from the native date widget.
- Date parsing and recurrence remain unchanged because engine/API boundary tests with ISO `2026-11-30` were correct.
- Version 1 now requests the confirmed date explicitly as `AAAA-MM-DD`; strict calendar validation continues to reject impossible dates.

## 2026-10-30 — Gate C local preparation only

- Implemented the Supabase recommended SSR client split: browser client, cookie-aware server client, and Next.js 16 `proxy.ts` session refresh. No service-role key is used.
- Authentication uses Google OAuth with PKCE through Supabase. Callback return paths are restricted to local relative paths to prevent open redirects; sign-out and all scenario mutations enforce same-origin requests.
- Save and update accept only scenario inputs, validate them with the shared domain schema, recalculate deterministically on the server, and persist the server-owned result snapshot.
- Owner identity always comes from the verified Supabase user. API queries also filter by owner and the migration enforces authenticated-only RLS as defense in depth.
- Unknown values and dates remain JSON `null`; estimated evidence requires and preserves a written assumption. Schema and calculation versions are stored and checked when reopening.
- When configuration is absent, the product remains usable for calculation and clearly labels authentication/persistence as pending. It does not simulate login or private storage.
- No cloud project, migration application, OAuth configuration, live credential, deployment, or GitHub push was performed.

## Week 14 · Precio y prueba

- El chequeo completo permanece gratis. $39 MXN por 12 meses es una oferta experimental para la compradora recurrente.
- El simulador guarda un conjunto de supuestos numéricos en el navegador. El guardado de calendarios con cuenta se verifica aparte.
- La compilación de producción y lint pasaron. Las 45 pruebas existentes pasaron. En navegador local sin sesión, /pricing mostró $195 anuales y $16.25 equivalentes al mes con 100, 5% y $39. Guardar 200 compradoras, recargar y recuperar devolvió $390 anuales y $32.50 equivalentes al mes. El enlace abrió el memo en /about.
- Pendientes: prueba de persona independiente, replay cronometrado, conversación real, ciclo de despliegue y verificación del dominio.
- Próximo paso: publicar una primera versión en el proyecto de Vercel existente y probar el enlace de entrega sin sesión.

### Week 14 · Segunda pasada

La revisión con una persona sintética en esta conversación identificó dos lecturas plausibles: entender el promedio mensual como un cargo mensual y confundir guardar cifras de ingresos con guardar compromisos de compra. La interfaz ahora distingue el pago único de 12 meses y los datos específicos que guarda el simulador.


## 2026-11-21 — Week 15 distribution preparation

- Founder authorized work here on existing files; founder reports no Week 15 audience sharing yet. No response rate exists.
- Carry forward confirmed Blueprint: selected schedules, no affordability verdict, visible unknowns, independent release review before public claim.
- Reuse brand and existing app. Prepare three editorial formats using labeled fictional inputs, six concepts across three series. No calculation/authentication changes planned initially.
- Preserve Week 14 Packet in docs/PACKET_WEEK14_ARCHIVE.md; update current Packet before producing assets.
- Owner: Ana María for human approval. Independent reviewer unassigned. Distribution, fresh-chat persona, video, and current-link verification remain pending.

### Week 15 prepared assets and checks

- Created carousel A, static card B, printable guide C and eight-page preparation packet. Corrected footer/URL spacing after visual QA. Public copy is Spanish; academic packet is English.
- Reused known schedules from existing fictional fixture; labels explicitly exclude complete-finance or affordability interpretation.
- 45 tests across 10 files passed. Public product returned HTTP 200 and browser replay matched 1,400 / 3,800 / 3,200 and 16,800 MXN horizon total. Unknown-date warnings observed. Native accessibility entry succeeded after locator limitations; no product defect claimed.
- No new product code, commit, deploy, customer exposure, independent human review or fresh-chat persona session occurred. Next: founder review, independent reviewer assignment, fresh persona chat and actual opt-in sharing.

### Week 15 — founder authorized publication

- Publish the prepared content on /guia in the existing Vercel project; expose required inputs and limits before the calculator. Align home and navigation with selected-schedule positioning.
- Preserve existing calculations, private-data protections and pricing experiment. No new analytics or audience claims.
- Fresh-chat synthetic review, real audience distribution, video and original buildchat still required after this deploy.

### Week 15 publication checks before deployment

- Added public /guia with assets A/B/C, text alternatives, selected-payment subtotal table, unknown-date explanation, required inputs and working /product links. Updated home and navigation.
- Production build and lint passed. Browser checked the guide at desktop width and 390px mobile width; anchor and comparison navigation worked. Mobile carousel is horizontally scrollable.
- Existing Vercel project inspected and linked; production branch is main. CLI-created .env.local and .vercel are excluded from Git. No secret values were printed or staged.
- Independent human review and real audience/synthetic persona outcomes are still outstanding.

### Week 15 published release

- Commit 59883a4 pushed to origin/main. Existing Vercel project production deploy dpl_6VAuRm3jLQLkRW4pYxCQ436hMAms reached READY; primary URL remains https://debt-check-mx-week12.vercel.app.
- Guide is live at /guia with three public content assets and links to /product. Browser verified the deployed guide and followed the CTA to the calculator without sign-in. Local desktop/mobile inspection and production build/lint passed.
- Founder authorized publication after assistant-run checks. Independent human review is still unassigned and is not represented as completed. This is an open Blueprint condition, not evidence of approval by another reviewer.
- Next: original fresh-chat synthetic persona walkthrough, real audience distribution and observed response, then packet/persona/buildchat export and founder demo. Do not reconstruct those outcomes.

### Week 15 synthetic walkthrough and preventive clarification

- Preserved founder-supplied walkthrough verbatim. It reports successful calculations, partial unknown-date handling and a modeled risk around 'Completo'; no mechanical defect reported.
- Clarify global complete label to 'Completo para los datos ingresados', with the adjacent exclusion retained. No calculation, persistence or monthly-state change.
- User understanding after revision must be retested; do not claim confusion was observed in a real participant or resolved. Full original chat export/link remains required.

- Published commit 91369ea. Browser verified the new global label in a complete fictional scenario (12 x 1,000 = 12,000 MXN) and the matching explanation in the initial unknown-date state. This is live presentation verification, not a synthetic-persona retest or human comprehension result.

## 2026-11-22 — real WhatsApp test response

- Founder confirms one real participant, link sent via WhatsApp, both A/B reviewed. Sharing date pending. Laptop is an adjacent case; do not generalize to appliance shoppers. Raw records remain in ignored evidence/private/week15, excluded from Git and deployment.
- Reported friction drives UI revisions: empty financial fields on start, explicit example loading, unknown-date guidance, state above subtotal and lowercase month headings. No range/safety calculation added.
- Production build, lint and 45 existing tests passed. Local browser verified empty start, optional fictional example and partial/horizon exclusions above subtotal. Mechanical replay matched the supplied fictional scenario. No post-revision human comprehension result claimed.
- Publication review initially rejected upload of the participant record. Removed it from the unpushed commit and added .vercelignore to exclude all evidence, generated packets, documents and local environments from hosting uploads. Only application source and explicitly fictional public assets are published.
