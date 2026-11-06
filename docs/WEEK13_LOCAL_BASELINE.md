# Week 13 local baseline

Packet D2 is the approved scope. All fixtures are fictional. The original Week 12 Packet is archived byte for byte in this directory. D1, D2 and their source manifests are preserved separately in the private evidence records.

## Reproduction and decision

The new estimate regression failed against Week 12. The first month's known subtotal included MXN 600 from two payments with an estimated amount or date, returning MXN 1,600 instead of MXN 1,000. The new calculation version, 1.1.0, requires both amount and date to be known. Estimated entries and their existing assumptions remain visible. Missing dates leave payments unplaced. A confirmed zero remains distinct from no confirmed amounts.

New saves use calculation version 1.1.0 with storage schema 1.0.0. The reader validates saved version metadata and derives the current display from the original saved evidence. It does not rewrite old rows during open. The next explicit save uses the current calculation. Assumptions live in the input snapshot so recurring payments do not duplicate the text in stored results.

Feedback uses a bounded list in browser memory, with a category, event name and capture time. An explicit download exports only those fields. There is no feedback endpoint or new storage.

## Before participant sessions

Start the local app, use the January–December 2027 fictional fixtures in Packet D2 and reset inputs between attempts. The automated fixture expectations are January/March/horizon known subtotals of MXN 1,400/3,800/16,800 for A and 2,100/5,700/25,200 for B. Check the independently prepared spreadsheet against the same values before participants arrive.

Capture actual screen sequences for the fresh synthetic Persona chat. Record task attempts, hesitations and the highest-priority fix. Then run the counterbalanced protocol with five real target users, including at least three strangers. Preserve exact quotes, rank the pain, fix and retest the top finding, and obtain genuine return evidence. These are pending activities.

## Release gate

Local checks cover the calculation, version compatibility, feedback shape and request-security tests. Still required are a visual and keyboard walkthrough, browser network inspection, and authorized account A/account B plus anonymous checks for runtime RLS, OAuth and scenario operations. Establish the weekly project record and the real domain. Push, deploy and production operations require separate authorization.
