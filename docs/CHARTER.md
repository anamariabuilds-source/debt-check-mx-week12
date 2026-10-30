# Debt Check MX — Product Charter

**Founder:** Ana María Matas  
**Week:** 12 — The Extraction and Core Build  
**Original Venture:** Week 10 — Isle of Happiness  
**Method:** Prevent the Loss  
**Version:** 1.0 — Approved direction with founder's Phase 3 clarifications incorporated

## 1. VISION

In three years, Debt Check MX aims to become a trusted pre-purchase financial comparison tool for people in Mexico who use installment payments. Before making a purchase, users will be able to understand how a new payment commitment fits with their existing and upcoming obligations, including monthly payments, semiannual expenses, and uncertain charges. The product will make financial trade-offs easier to understand, show missing information clearly, and help people make their own purchasing decisions. Its goal is to reduce avoidable financial surprises through transparent calculations, not to replace human judgment or become a banking platform.

## 2. USERS

**Primary user:** An adult in Mexico who is considering an installment purchase and already has financial obligations that may overlap with the new payments.

The user may manage these obligations using mental calculations, phone Notes, or Excel. They need to compare future commitments before deciding whether to buy.

**Documented need:** In October 2026, a real participant purchased a MXN 12,000 washing machine through 12 interest-free installments of MXN 1,000. She had approximately five months of phone installments remaining, semiannual car insurance due in January, an uncertain optional protection-plan charge, and an unclear first credit-card payment date. She reported approximately 20 minutes of active planning using mental calculations and Notes.

This experience supports a real individual need, not general market demand.

**Decision the user faces:** Whether to accept a proposed installment purchase after reviewing how its payments may overlap with other financial commitments.

**Initial target:** People comfortable entering their financial obligations manually who want to compare the complete payment schedule before purchasing.

**Potential payer:** The individual user, if testing demonstrates enough value to justify payment. Willingness to pay has not been established.

## 3. PRINCIPLES

**1. Prevent the loss before the decision.**

Debt Check MX must focus on the moment before a purchase, when the user can still avoid or reconsider a financial commitment. Every core function must help reveal a relevant payment overlap, uncertainty, or trade-off before that decision. An overlap is information to review, not automatic proof of financial danger.

**2. Never invent financial certainty.**

Known, estimated, and unknown information must remain clearly separated. Estimated dates must show their assumptions. Missing payment dates, charges, or amounts must never silently become confirmed facts or zero-value obligations. Each result must communicate whether it is complete, partial, or cannot be determined reliably with the information available.

**3. Make calculations transparent and deterministic.**

The core comparison must use understandable rules, validated inputs, and reproducible calculations. Monthly and semiannual obligations must be represented consistently. The core must work without Gemini, external AI credentials, or generative financial advice.

**4. Keep the purchase decision human.**

The application can identify overlapping payments, their combined amounts and timing, months requiring attention, and missing information. It must not automatically approve a purchase, treat every overlap as harmful, or claim that a purchase is affordable or safe. When important information is missing, the system must explain the limitation and ask the user to review or correct it.

**5. Prove additional value instead of assuming it.**

Debt Check MX must be compared against existing alternatives such as Notes or Excel using equivalent complete tasks, including data entry, review, interpretation, and accuracy. Simulated results, estimates, and reported experiences must never be presented as verified real-world improvements.

## 4. NON-GOALS

Debt Check MX will not:

- Become a general expense tracker, household accounting system, or banking platform.
- Connect directly to bank accounts or automatically import personal transactions.
- Approve credit, offer loans, generate credit scores, or automate purchases.
- Provide investment recommendations or act as an AI financial adviser.
- Generate automatic affordability scores or tell users whether they must buy.
- Require Gemini, an external AI API key, or a generative model for its core calculations.
- Invent missing fees, payment dates, insurance amounts, or billing-cycle rules.
- Add social features, unrelated dashboards, or financial tools outside the pre-purchase comparison.
- Promise financial savings, avoided fees, faster decisions, or 10× performance without real supporting evidence.
- Present an estimated payment schedule as a verified bank statement or confirmed future outcome.

The Week 12 build will focus on **one complete feature:** entering a proposed purchase and relevant obligations, comparing them month by month, explaining uncertainties and trade-offs, and saving the scenario.

## 5. NORTH STAR

**Percentage of completed pre-purchase comparison tasks in which the user correctly identifies the known payment overlaps and unresolved limitations in a predefined test scenario before making a purchase decision.**

This metric measures whether the product helps users understand what the available information does—and does not—support. An overlap is not automatically an affordability problem. The user must correctly understand combined amounts and timing where they can be determined, and distinguish results that are complete, partial, or undeterminable because information is missing.

For each evaluation, a predefined scenario will have a verified reference answer, including which calculations can be completed, which are partial, and which cannot reliably be determined. A task counts as successful only when the user correctly identifies all required overlaps, their relevant combined amounts and timing where supported, and all required unresolved limitations. No purchase decision is scored as automatically right or wrong.

**Measurement:**

Successful complete comparison tasks ÷ Total evaluated complete comparison tasks × 100.

**Evidence status:** No baseline or success rate has been established. The original 20-minute Notes workflow is self-reported. The proposed 3–6-minute workflow and possible 3.3–6.7× improvement remain untested estimates. Timing and accuracy comparisons against Notes or Excel will be evaluated separately as supporting evidence.

## 6. CORE CONCEPTS

**1. Scenario:** A saved pre-purchase comparison containing a proposed purchase, relevant obligations, information states, and the generated results.

**2. Proposed Purchase:** The installment purchase the user is considering, including its amount, installment terms, and known or uncertain payment timing.

**3. Obligation:** An existing or upcoming financial commitment, including monthly installments, semiannual charges, or other relevant payment obligations within the comparison.

**4. Payment Schedule:** The month-by-month arrangement of known payments and clearly labeled estimates, based on the entered terms, dates, frequencies, and applicable rules. The presentation distinguishes complete, partial, and undeterminable calculations.

**5. Evidence State:** The classification of financial information as known, estimated, or unknown, including the assumptions behind any estimate.

**6. Payment Overlap:** A month or other relevant period in which the proposed purchase and existing or upcoming obligations require payments. The overlap is information worth reviewing, **not automatic evidence of harm or unaffordability**. Debt Check MX shows the combined known amounts, timing, and uncertainties without judging whether the user should buy.

**7. Decision Review:** The understandable result showing monthly commitments, overlaps, unresolved information, and relevant trade-offs before the user makes and retains control of the purchasing decision. It indicates which conclusions are complete, partial, or undeterminable.

---

### Method-to-Engine Connection

**Approved Step 3 — Find the Intervention Point**

“Step 3 of my Method becomes the function that compares a proposed installment purchase with the user's existing and upcoming financial obligations, identifies overlapping payments, unclear charges, and missing timing information, and presents the financial trade-offs before the user decides whether to buy.”

This is the conceptual engine for the complete core feature. It is a proposed Week 12 implementation requirement, not a claim that Week 10 already implemented the full function.

**Approval boundary:** Product Charter finalized with the founder's two clarifications. Personas and Packet remain subject to separate approval. No coding or external-service setup is authorized by this document.
