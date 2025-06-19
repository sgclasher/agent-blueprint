# Agent Blueprint

_Agentic AI advisory MVP — Next.js 15 • React 19 • Supabase • OpenAI GPT-4_

---

## ✨ Purpose

Agent Blueprint lets business stakeholders **see exactly how autonomous (“agentic”) AI can deliver quick, high-ROI wins**.  
A 60-second survey becomes:

1. A ranked list of three low-hanging-fruit AI workflows (title + ROI teaser).  
2. An interactive React Flow mini-diagram for each workflow.  
3. A living profile they can edit and regenerate in seconds.

---

## 🚀 Key MVP Features

| Tag | Feature | Status |
|-----|---------|--------|
| **F-1** | One-page Survey (6 fields) | ✅ |
| **F-1b** | Profile Page — view / edit same 6 fields, regenerate dashboard | ✅ |
| **F-2** | GPT-4 Function-Calling “Opportunity Generator” | ✅ |
| **F-3** | Supabase Persistence (`profiles`, `blueprints`, `ai_logs`) | ✅ |
| **F-4** | Results Dashboard + mini React Flow diagrams | ✅ |
| **F-5** | Magic-link Auth (Supabase) | ✅ |
| **F-6** | Blueprint List + “New Initiative” button | 🟡 Stretch (Week 5) |

---

## 🏗 Architecture

```

Frontend : Next.js 15 · React 19 · Tailwind · ShadCN · React Flow
API      : Next Server Actions / Edge
AI Core  : OpenAI GPT-4 (function calling)   ← future hooks: Claude, Gemini
DB       : Supabase Postgres + pgvector + RLS
DevFlow  : Cursor AI · .mdc rules · @Docs deep-links

```

---

## 🗂 Folder Structure

```

TBD - needs to be entered here.

````

---

## ⚙️ Quick Start

```bash
pnpm install
cp .env.local.example .env.local   # add Supabase + OPENAI keys
pnpm dev                           # Turbopack on http://localhost:3000
````

*Optional local DB: `supabase start` (Docker).*

---

## 🧠 Cursor Dev Workflow

1. **Open a file** → `Cmd/Ctrl-K` → describe the change.
2. Global rule attaches relevant `@Docs` automatically.
3. Review diff → commit.
4. Promote stable prompts to scoped `.mdc` rules.

---

## 📚 Docs Strategy

| Source                  | Purpose                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| **Deep-link `@Docs`**   | Next 15 upgrade, React 19, Supabase RLS/pgvector, GPT-4 function calling, React Flow Quickstart, … |
| **@Web fallback**       | Only if doc not indexed.                                                                           |
| **MCP server (future)** | Bulk private PDFs & ROI spreadsheets without bloating prompts.                                     |

---

## 🛣 Roadmap (Post-MVP)

* Editable React Flow (drag, save).
* Claude / Gemini model-routing.
* CrewAI orchestration + agent chaining.
* DeepEval CI & Langfuse tracing.
* Automated survey via research crawlers.

---

## 🤝 Contributing

Fork → create feature branch → commit rule-guided code → PR.
All PRs must pass RLS + logging smoke test.

---

## 📄 License

MIT (placeholder).

```