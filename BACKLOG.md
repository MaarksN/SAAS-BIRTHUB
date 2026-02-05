# BACKLOG v1.1 - SALESOS ULTIMATE

## 🎨 UI/UX Overhaul: "BirthHub 360º Sales OS"
**Status:** CONCEPT / ARCHIVED
**Reference:** `apps/web/public/birthhub-os-concept.html`

### Description
Replace the current Next.js dashboard with a new "BirthHub 360º" interface. This involves a significant rewrite of the frontend architecture to match the new design system.

### Key Features Proposed
1. **Modules**: BDR (Intel), SDR (Hunter), Closer (Elite).
2. **AI Integration**:
   - Deep integration with Gemini 2.5 (Flash/Pro) for text and vision.
   - Text-to-Speech (TTS) via Google APIs ("Puck" voice).
   - Generative Image (Imagen 4.0).
3. **Tools**:
   - Vision Intel (Image analysis).
   - Ghostwriter (LinkedIn content).
   - Deal War Room (Multi-agent simulation).
   - Roleplay Simulations (Voice-enabled).
4. **Tech Stack Changes**:
   - Direct Firebase integration (currently using Prisma/Postgres).
   - Tailwind CSS via CDN (needs porting to `libs/ui` design tokens).
   - Vanilla JS logic (needs porting to React Hooks/Context).

### Action Plan (Post-DEFCON 3)
1.  **Porting**: Convert `birthhub-os-concept.html` into React components within `libs/ui`.
2.  **State Management**: Replace global `window` variables with React Context / Zustand.
3.  **Backend Proxy**: Route AI calls (Gemini) through `libs/ai` gateway instead of direct client-side calls (Security Risk: API Keys exposed in frontend).
4.  **Auth**: Migrate Firebase Auth to existing Clerk/NextAuth infrastructure.

---
*Added by Agent Jules during Operation DEFCON 3 Closure.*
