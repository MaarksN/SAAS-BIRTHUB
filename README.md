# SalesOS Ultimate 🚀

**The World's Best Sales Operating System.**
A unified platform for LDRs, SDRs, and AEs powered by advanced AI Agents.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production_ready-green.svg)

## 🌟 Key Features

- **Prospector (LDR):** Market Intelligence, Tech Stack Detection, Employee Growth Analysis.
- **Hub (SDR):** Cold Call Scripts, Email Roasts, Objection Killers (AI-powered).
- **Closer (AE):** Deal Health, Win Probability, Next Best Action.
- **Automation:** Workflow Engine for custom triggers and actions.
- **Social:** LinkedIn Content Generator & Viral Hooks.
- **Enterprise:** SSO, Audit Logs, Role Management.

## 🏗️ Architecture

This project is a high-performance **Monorepo** managed by [TurboRepo](https://turbo.build/).

### Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Lucide Icons.
- **Backend:** Next.js Server Actions + FastAPI (Python) for AI Agents.
- **Database:** PostgreSQL (Prisma ORM).
- **Cache:** Redis.
- **AI:** OpenAI (GPT-4 Turbo) via `libs/ai` Gateway.

### Workspaces
- `apps/web`: The main dashboard application.
- `apps/ai-agents`: Python microservice for heavy AI tasks.
- `libs/core`: Shared utilities, logger, error handling.
- `libs/ui`: Shared React components (Design System).
- `libs/database`: Prisma client and repositories.
- `libs/prospector`: LDR logic.
- `libs/hub`: SDR/AE logic.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose

### Fast Start (Dev Mode)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Environment:**
   ```bash
   cp .env.example .env
   # Add your OPENAI_API_KEY in .env
   ```

3. **Start Infrastructure (DB + Redis):**
   ```bash
   docker-compose up -d postgres redis
   ```

4. **Seed Database:**
   ```bash
   npm run db:seed
   ```

5. **Run Application:**
   ```bash
   npm run dev
   ```
   Access: `http://localhost:3000`

### Production Deployment

Use the production docker-compose file:
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📚 Documentation

For detailed architectural decisions, see [Architecture Guide](apps/docs/architecture.md).

## 🛡️ Security (Defcon 3)

- **CostGuard:** Rate limiting and budget tracking for AI calls.
- **Audit Logs:** Full traceability of user actions.
- **RBAC:** Role-Based Access Control implemented.

---
*Built with ❤️ by Agent Jules.*
