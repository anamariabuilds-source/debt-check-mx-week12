# Debt Check MX — Personas

**Founder:** Ana María Matas  
**Venture:** Debt Check MX — Week 10, rebuilt in Week 12  
**Method:** Prevent the Loss  
**Version:** 1.0 — Finalized after Phase 4 clarifications  
**Related document:** `docs/CHARTER.md`

## Persona 1 — Participant R

**Status: REAL OCTOBER 2026 CASE — ANONYMIZED.** The participant's name is withheld because permission for publication was not established. There is no invented age, income, credit limit, monthly budget, family biography, interview quotation, or exact purchase date.

### Evidence-supported situation
- In October 2026, she purchased a replacement washing machine after the previous machine broke.
- Purchase: **MXN 12,000**, **12 interest-free installments**, advertised payment **MXN 1,000 per month**.
- She reported approximately **five months of phone installments remaining**, a **semiannual car insurance obligation due in January**, an **optional protection-plan charge with uncertain timing**, and an **unknown first credit-card installment date**.
- She postponed a possible bicycle purchase.
- The phone-payment amount, insurance amount, protection-plan amount, and exact payment dates are **not established**.

### Current approach (reported, not independently measured)
She used mental arithmetic and phone Notes to compare upcoming obligations, reporting approximately **20 minutes of active planning** and **three days to reach the purchase decision**. These are not measurements of Debt Check MX performance.

### Need and motivation
**Observed need:** She had difficulty comparing several upcoming obligations when considering a purchase. **Proposed design interpretation, not her quotation:** A month-by-month comparison may make known payments, overlaps, and unknowns easier to review before deciding. An overlap alone is not evidence of harm or unaffordability.

### One core feature: proposed test journey, NOT an activity she already completed
1. Enter the washing-machine proposal and the documented installment terms.
2. Add phone installments and semiannual insurance with only known details; leave unreported amounts and dates unknown.
3. Represent the optional protection plan as uncertain, and do **not** invent the first credit-card installment date.
4. Review supported month-by-month amounts even though some inputs are missing.
5. Identify overlaps and understand whether each calculation is **complete**, **partial**, or **undeterminable**.
6. Review the trade-offs without an automatic purchase recommendation.
7. **Save and reopen the same scenario**, checking that purchase and terms, monthly/semiannual obligations, known dates and amounts, estimated dates with assumptions, unknown amounts/dates, all result states, and the comparison are retained without upgrading uncertainty into certainty or replacing unknowns with zero.

### What might make her quit (untested design risks)
Long or confusing data entry; compulsory bank connections or Gemini keys; a fabricated payment date; missing charges silently counted as zero; an overlap presented as financial danger; an incomplete monthly total displayed as complete; a saved scenario that loses uncertainty; or no additional value compared with Notes.

### Value and payment evidence
Potential value must be established through complete-task comparisons against Notes/Excel, including entry, review, interpretation, timing, and accuracy. The 3–6-minute estimate and 3.3–6.7× potential are untested; 10× is not demonstrated. **Willingness to pay and price: unknown**; no amount is attributed to this participant.

### Evidence boundary
One real reported case supports a need, not wider market demand or improved outcomes. No new interview, direct quote, task timing, adoption, or payment evidence has been generated.

---

## Persona 2 — Irregular-Income Installment Buyer

**Status: HYPOTHETICAL TEST PERSONA — NOT A REAL INTERVIEW.** No name, age, job, family information, income amount, financial balance, payment values, observed behavior, measured outcome, or quotation is invented.

### Hypothetical context
An adult in Mexico is considering an installment purchase while receiving **irregular income**. There are existing monthly commitments and a semiannual obligation; the proposed purchase's **first payment timing is uncertain**. Some amounts and dates are known, some might be estimated under explicit valid assumptions, and some cannot be determined. These are scenario assumptions for test design, not facts about a person.

### Different challenge to the same product
This persona tests whether Debt Check MX can present **known obligations and timing uncertainty without assuming a regular monthly income or declaring affordability**. Income may be left unspecified; a lack of predictable monthly income is not grounds to invent a monthly amount, score, or purchasing recommendation.

### Current alternative (hypothesis, not observation)
A hypothetical user might compare commitments in Notes or a spreadsheet. No actual task time, frustration, user quote, or willingness to pay has been observed.

### One core feature: synthetic test journey
1. Enter one hypothetical installment purchase (synthetic amounts will be specified only in future test fixtures).
2. Enter existing monthly and semiannual commitments.
3. Identify the first-payment date as unknown unless adequate card closing, due-date, transaction/posting and applicable rules are provided for an explicitly qualified estimate.
4. Leave irregular income unconverted into a fictitious monthly salary; do not evaluate affordability.
5. Show any mathematically supported known monthly totals even when an unrelated charge or date remains unknown.
6. Mark the overall result **partial** when something relevant is unresolved; keep a particular computation **undeterminable** when there is insufficient information for it.
7. Describe overlaps as information to review, not automatic financial danger.
8. **Save and reopen** the proposed purchase/terms, monthly and semiannual obligations, known data, estimated dates with their assumptions, unknown fields, complete/partial/undeterminable result states, and the resulting comparison exactly and transparently.

### What might make the hypothetical user quit (design hypotheses)
The system asks for or assumes monthly salary; it invents billing-cycle dates; unknown amounts become zero; one unknown prevents all known totals from appearing; an overlap is labeled unsafe; or reloaded results omit uncertainty assumptions.

### Testable outcomes and evidence limits
With **clearly labeled synthetic** test data, check month recurrence, credit-card timing prerequisites, partial-result behavior, exact preservation after save/reopen, transparent assumptions, and the absence of an affordability verdict. Then test real users separately. **Willingness to pay: unknown.** These are proposed acceptance tests, not measurements or an interview.

---

## Shared acceptance expectations (for the Packet)

- **One core journey:** proposed purchase → existing/upcoming obligations → month-by-month comparison → overlaps/uncertainties → human review → save/reopen.
- **Evidence state** (known / estimated / unknown) is distinct from **calculation state** (complete / partial / undeterminable).
- Known components remain available when other components are unknown; the overall result clearly marks incompleteness. Only computations unsupported by available information are undeterminable.
- Saving and reopening preserves inputs, terms, frequencies, known amounts and dates, estimates **and their assumptions**, unknown values, calculation states, and comparative results without silent coercion.
- Credit-card first-payment estimates require sufficient stated information and applicable rules; otherwise mark undeterminable, not fabricated.
- Irregular income must never be silently regularized. No automatic affordability grade, purchase verdict, or claimed 10×.
- Synthetic fixtures must never be represented as real experience.

## Exact Method-to-engine connection (approved)

“Step 3 of my Method becomes the function that compares a proposed installment purchase with the user's existing and upcoming financial obligations, identifies overlapping payments, unclear charges, and missing timing information, and presents the financial trade-offs before the user decides whether to buy.”

**Provenance:** Based on the approved Week 12 Charter, Verdict, Method and Team Blueprint. Persona 1 is based only on the documented October experience; Persona 2 is entirely hypothetical. No implementation or new interview is claimed.


## Week 15 fresh-chat protocol — not executed

Use a new original conversation and attach Charter, Week 15 Brain/Blueprint and public /guia and /product links. Ground the persona in the documented single shopper need and Mexican payment mechanics; mark added traits as assumptions. Do not claim actual customer evidence. The persona is an adult in Mexico planning an appliance offer, manually comparing selected obligations; do not invent income, bank access or research findings.

Before calculator use: ask the persona to interpret purpose, user, expected answer, required data, next action and limits from the two content pieces without founder explanation. Then ask it to attempt a clearly fictional scenario: purchase 9,600 MXN, 12 payments of 800 from 2027-01-15; review from 2027-01; phone 600 monthly for 4 payments from 2027-01-15; insurance 2,400 every six months for 2 payments from 2027-03-15. Ask it to explain the result in its own words, not repeat a supplied reference answer. Add a 300 MXN payment with unknown date and ask how its interpretation changes. Remove the proposed purchase's first date and ask what can and cannot be concluded.

Record actual inspected screens/actions separately from modeled reactions. If the chat cannot browse or operate the release, supply real screenshots; it must not invent navigation. Ask for observed issue, modeled user interpretation, severity, suggested response and retest. A plausible concern is not a reproduced bug. Retest only after an actual revision where justified. Preserve the entire original exchange, including passes and limitations. No Week 15 persona outcome has occurred yet.

Real audience questions are separate: ask about a genuine pending purchase and current workaround before showing the guide; ask what each piece communicates and what action they choose; ask for task interpretation, missing data, confusion and whether the tool added anything beyond their usual approach. No leading affordability explanation before measuring comprehension; clarify after recording misunderstandings. Log exposure and actions honestly without private identifiers.

### Week 15 initial walkthrough received — retest pending

Source: founder-supplied original text preserved in output/week15/evidence/PERSONA_WALKTHROUGH_ORIGINAL.txt. The report describes live inspection; its persona reactions are explicitly simulated. Known example total: 16,800 MXN; unknown 300 stays outside known subtotals; removing purchase date leaves 7,200 MXN in entered known existing payments. No mechanical failure reported.

Modeled hesitation: global 'Completo' could sound like approval or all finances accounted for. Preventive change: global label 'Completo para los datos ingresados' and matching adjacent explanation. This is not a reproduced user failure, and comprehension improvement remains untested. Production build and lint passed. Retest must revisit the deployed product in the same original persona chat and report what actually appears. Ask what the new label means, whether omitted expenses are covered, and what changes after an unknown-date entry. Do not prescribe a favorable reaction or claim the concern resolved.
