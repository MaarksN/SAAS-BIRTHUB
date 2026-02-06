# Architecture Overview

## 1. High-Level Design

SalesOS Ultimate follows a **Modular Monolith** architecture. While the code lives in a single repository (Monorepo), the domains are strictly separated into libraries (`libs/`) to allow for future microservice extraction if needed.

### Diagram
```mermaid
graph TD
    Client[Web Client (Next.js)]

    subgraph "Application Layer"
        Gateway[AI Gateway (libs/ai)]
        SDR[SDR Service (libs/hub)]
        LDR[LDR Service (libs/prospector)]
        Ent[Enterprise Service (libs/enterprise)]
    end

    subgraph "Data Layer"
        Repo[Repositories (libs/database)]
        Prisma[Prisma ORM]
        DB[(PostgreSQL)]
    end

    subgraph "External Services"
        OpenAI[OpenAI API]
        PythonAgent[AI Agents (FastAPI)]
    end

    Client --> SDR
    Client --> LDR
    Client --> Ent
    SDR --> Gateway
    SDR --> Repo
    LDR --> Repo
    LDR --> PythonAgent
    Repo --> Prisma --> DB
    Gateway --> OpenAI
```

## 2. Core Libraries

- **`libs/core`**: The backbone. Contains `AppError`, `Logger` (Winston), and `Env` validation. All other libs depend on this.
- **`libs/database`**: The only library allowed to touch the database directly. Exposes `Repositories` (e.g., `LeadRepository`) to other services.
- **`libs/ui`**: The Design System. Contains atomic components (`Button`, `Card`) and composites (`OnboardingTour`). Strictly presentational.

## 3. AI Strategy

We use a **Hybrid AI Approach**:
1.  **Node.js Gateway (`libs/ai`)**: Handles simple text generation, prompt management, and cost control (`CostGuard`). Connects to OpenAI directly for low-latency tasks (e.g., Email Roasting).
2.  **Python Microservice (`apps/ai-agents`)**: Handles complex data processing, scraping, and heavy logic (e.g., Data Enrichment, Pattern Recognition). Built with FastAPI.

## 4. Security & Compliance

- **Authentication**: Managed via Clerk (or custom Auth provider in `libs/auth`).
- **Authorization**: RBAC implemented in `libs/core/rbac`.
- **Cost Control**: `CostGuard` intercepts all AI calls to enforce daily limits per user.
- **Audit**: `EnterpriseService` logs critical actions to `EnrichmentHistory`.

## 5. Deployment

The system is containerized via Docker.
- `web`: Builds the Next.js app standalone.
- `ai-agents`: Builds the Python environment.
- Orchestration via `docker-compose.prod.yml`.
