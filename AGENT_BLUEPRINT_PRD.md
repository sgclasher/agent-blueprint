### PRD v1.3 — Agent Blueprint MVP

*Delta: add “Blueprint List / New Initiative” stretch feature*
**Date:** 19 Jun 2025

---

## 2 · Key Adjustments Since v1.2

| Area                         | v1.2                               | **v1.3 Change**                                                                                                               |
| ---------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Multi-initiative support** | Re-run survey manually (implicit). | **Explicit “Blueprint List + New Initiative” page** lets users keep initiative #1 and create initiative #2 with same profile. |
| **Feature count**            | F-1 .. F-5                         | **Adds F-6 (stretch)** — builds only if Week-5 slack time exists; else Phase 2.                                               |

---

## 4 · MVP Feature Set (freeze + stretch)

| #        | Feature                                               | Must-Have | Notes                                                                                                                                                                                  |
| -------- | ----------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **F-1**  | One-page Survey Form                                  | ✅         |                                                                                                                                                                                        |
| **F-1b** | Profile Page (view/edit six fields)                   | ✅         |                                                                                                                                                                                        |
| **F-2**  | GPT-4 Function-Calling Service                        | ✅         |                                                                                                                                                                                        |
| **F-3**  | Supabase Persistence (profiles, blueprints, ai\_logs) | ✅         |                                                                                                                                                                                        |
| **F-4**  | Results Dashboard + React Flow mini-graphs            | ✅         |                                                                                                                                                                                        |
| **F-5**  | Minimal Auth (magic link)                             | ✅         |                                                                                                                                                                                        |
| **F-6**  | **Blueprint List + “New Initiative” CTA**             | *Stretch* | Table of past blueprints; button opens survey pre-filled with contact info. No new schema; just SELECT by `profile_id` ordered by `created_at`. Target: 1 dev-day if schedule permits. |

---

## 6 · Survey & Data Flow (clarified)

*One Survey Run* → creates **one Blueprint** containing:
`initiative`, `challenge`, `systems`, `value`, plus generated `opportunities[3]`.

*Multiple Initiatives* → user clicks **“New Initiative”** (F-6) and repeats survey; each run inserts a new row in **blueprints** (FK → `profiles.id`). No overwrite.

---

## 7 · Implementation Timeline (unchanged weeks; Stretch flagged)

| Week | Core Deliverables                                           | Stretch Slot |
| ---- | ----------------------------------------------------------- | ------------ |
| 1    | Survey UI, Supabase `profiles`                              |              |
| 2    | GPT-4 tool schema & `/api/survey`                           |              |
| 3    | Results dashboard + static React Flow                       |              |
| 4    | Profile Page (edit + regenerate) · ai\_logs                 |              |
| 5    | **UI polish**; *if time ⇒ implement **F-6 Blueprint List*** | ← Stretch    |
| 6    | Stakeholder demo, bug-bash, Vercel deploy                   |              |

If F-6 doesn’t fit, it rolls into Phase 2.

---

## 8 · Success Metrics (unchanged)

Adds **secondary KPI** (if F-6 ships):

| KPI                                   | Target                      |
| ------------------------------------- | --------------------------- |
| Avg. time to launch second initiative | ≤ 3 min (survey pre-filled) |

---

## 9 · Guard-Rails (unchanged)

* Survey still exactly six fields; Blueprint count unlimited.
* “New Initiative” only duplicates contact fields, not previous AI results.
