# AquaAI - Intelligent Water Management Ecosystem

AquaAI is a React-based smart water operations dashboard that simulates telemetry-driven monitoring for residential societies, commercial buildings, and municipal ecosystems.  
It combines a digital twin style visualization, AI-inspired recommendations, maintenance workflows, and economic gamification in one unified interface.

> Current state: this repository is a frontend-first simulation platform with in-memory data and production-backend planning artifacts.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Capabilities](#key-capabilities)
- [Architecture and Data Flow](#architecture-and-data-flow)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Module Deep Dive](#module-deep-dive)
- [Database Schema](#database-schema)
- [Testing and Quality](#testing-and-quality)
- [CI Pipeline](#ci-pipeline)
- [SEO and Public Assets](#seo-and-public-assets)
- [Security and Backend Roadmap](#security-and-backend-roadmap)
- [Setup and Local Development](#setup-and-local-development)
- [Scripts Reference](#scripts-reference)
- [Current Limitations](#current-limitations)
- [Suggested Next Steps](#suggested-next-steps)

---

## Project Overview

The platform models a command center for water intelligence:

- Real-time-like telemetry updates for flow, pressure, storage, and consumption.
- Route-based operational views for monitoring, analysis, simulation, and administration.
- Lightweight notification and incident-style UX patterns.
- Expandable architecture for future secure backend integration.

The application is designed to be a demonstrable product shell for:

- IoT observability workflows.
- AI-assisted decision support.
- Resource economy concepts (Aqua credits).
- Community engagement and sustainability scoring.

---

## Key Capabilities

### Operational Monitoring
- Smart dashboard with KPIs, trend charts, and distribution insights.
- Live telemetry simulation for municipal flow, pressure, and tank levels.
- Database explorer for viewing simulated live and historical entries.

### Simulation and Response
- Flow schematic with scenario toggles (normal, leak, pump failure).
- Dynamic system integrity/status behavior based on selected scenario.
- Emergency protocol interface for drought mode and usage restrictions.

### Decision Support and Automation UX
- AI insights view with action-style controls (notify, restrict, schedule).
- Predictive maintenance queue and technician workflow simulation.
- Notification center with auto-dismiss toast alerts.

### Engagement and Economy
- Water credit marketplace simulation (buy/sell and transaction feed).
- Community leaderboard and achievement-oriented impact views.
- In-app assistant (`AquaGPT`) for quick keyword-based guidance.

---

## Architecture and Data Flow

At runtime, the app is composed in this order:

`BrowserRouter` -> `ErrorBoundary` -> `NotificationProvider` -> `IoTProvider` -> `AppContent`

### Primary flows

1. `IoTProvider` generates and updates simulated telemetry every 2 seconds when simulation is active.
2. Telemetry and history are exposed via context hooks:
   - `useTelemetryData()`
   - `useTelemetryHistory()`
   - `useSimulationState()`
   - `useIoT()`
3. Route-aware shell in `App.jsx` renders each operational module by `location.pathname`.
4. Any feature can raise user-facing notifications via `NotificationProvider`.
5. Feature modules consume shared context and render local interactive states.

### State characteristics

- Telemetry is in-memory and ephemeral.
- History is capped to recent entries and not persisted.
- Most domain records are intentionally mocked for demonstration purposes.

---

## Technology Stack

### Frontend
- React 19
- React DOM
- React Router DOM
- Vite

### UI / Visualization
- Recharts (charts)
- Lucide React (icons)
- Vanilla CSS (`src/index.css`)

### Testing
- Vitest
- Testing Library (`@testing-library/react`, `@testing-library/jest-dom`)
- Playwright (E2E smoke testing)
- jsdom (test DOM environment)

### Tooling and Quality
- ESLint with React hooks and React refresh plugins
- GitHub Actions CI

---

## Project Structure

```text
.
|- .github/workflows/ci.yml
|- docs/
|  \- security-backend-roadmap.md
|- public/
|  |- icons.svg
|  |- robots.txt
|  \- sitemap.xml
|- src/
|  |- components/
|  |- context/
|  |- test/
|  |- App.jsx
|  |- App.test.jsx
|  |- index.css
|  \- main.jsx
|- tests/e2e/smoke.spec.js
|- database_schema.sql
|- eslint.config.js
|- index.html
|- package.json
|- playwright.config.js
|- vite.config.js
```

---

## Module Deep Dive

### App Shell
- `src/main.jsx`  
  Creates root app with routing and global error boundary.
- `src/App.jsx`  
  Provides sidebar navigation, route mapping, header diagnostics, and floating assistant integration.
- `src/components/ErrorBoundary.jsx`  
  Prevents full-app crashes by rendering fallback UI for uncaught render errors.

### Context Layer
- `src/context/IoTContext.jsx`
  - Holds telemetry snapshot (`municipalFlow`, levels, pressure, consumption, integrity, status).
  - Runs simulated updates on interval.
  - Maintains short-term telemetry history.
  - Exposes simulation controls (`simActive`, `setSimActive`, `setData`).
- `src/context/NotificationContext.jsx`
  - Centralized toast stack with `showNotification()` and `removeNotification()`.
  - Time-to-live auto-dismiss behavior for alerts.

### Feature Views
- `src/components/DashboardView.jsx`  
  Main operational analytics dashboard with charts and high-level controls.
- `src/components/FlowVisualization.jsx`  
  Digital twin flow scene with scenario simulation and anomaly visualization.
- `src/components/AIInsights.jsx`  
  AI recommendation/decision panel with mock asynchronous operational actions.
- `src/components/DatabaseExplorer.jsx`  
  Simulated DB/telemetry interface showing connection stats and historical feed.
- `src/components/EconomyView.jsx`  
  Aqua credit economy simulation with wallet interactions and market context.
- `src/components/MaintenanceView.jsx`  
  Maintenance queue planning and technician management simulation.
- `src/components/SecurityView.jsx`  
  Emergency protocol and drought-mode control simulation.
- `src/components/CommunityView.jsx`  
  Impact/ranking leaderboard for sustainability engagement.
- `src/components/Architecture.jsx`  
  Conceptual architecture explanation of sensing, intelligence, and actuation layers.
- `src/components/AquaGPT.jsx`  
  Keyword-driven chat helper for quick in-app guidance.

---

## Database Schema

`database_schema.sql` includes a production-oriented PostgreSQL design:

- `users`: user identity, portal type, preferences, aqua credits.
- `devices`: IoT registry (flow meters, pressure sensors, level sensors, smart valves).
- `sensor_telemetry`: high-volume telemetry stream with indexing on device/time.
- `usage_history`: aggregated daily consumption and leak metrics.
- `system_alerts`: severity-based incident/alert logging.
- `credit_ledger`: Aqua credit transfer/purchase/sale records.
- Trigger function to auto-update `users.updated_at`.

This schema is currently a design artifact and not actively wired to the frontend runtime.

---

## Testing and Quality

### Unit / Integration (Vitest)
- Configured in `vite.config.js` (`jsdom`, setup file, globals).
- Setup in `src/test/setup.js` with `jest-dom` matchers.
- Existing tests in `src/App.test.jsx` verify:
  - App shell and dashboard route rendering.
  - Economy route rendering.

### End-to-End (Playwright)
- Configured in `playwright.config.js`.
- Uses `vite preview` at `http://127.0.0.1:4173`.
- Smoke test in `tests/e2e/smoke.spec.js` checks dashboard load and sidebar availability.

---

## CI Pipeline

GitHub Actions workflow: `.github/workflows/ci.yml`

On push and pull request:
1. Checkout repository
2. Setup Node.js 20 with npm cache
3. `npm ci`
4. `npm run lint`
5. `npm run test`
6. `npm run build`

Note: Playwright E2E tests are configured in the project but not currently part of CI.

---

## SEO and Public Assets

- `index.html` contains canonical/social metadata for AquaAI branding.
- `public/robots.txt` defines crawl policy and sitemap location.
- `public/sitemap.xml` lists key route URLs.
- `public/icons.svg` provides static SVG symbol assets.

---

## Security and Backend Roadmap

Detailed plan: `docs/security-backend-roadmap.md`

The roadmap defines a phased migration path from demo frontend to production system:

- Phase 1: OIDC/OAuth2 authentication + RBAC scopes.
- Phase 2: API security baseline (validation, logging, idempotency, strict CORS).
- Phase 3: Database auth model + audit log + sensitive data protection.
- Phase 4: Deployment hardening (security headers, WAF, secret management, scans).
- Phase 5: Operational readiness (SLOs, anomaly alerting, runbooks).

---

## Setup and Local Development

### Prerequisites
- Node.js 20+ recommended
- npm 10+ recommended

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build and preview production

```bash
npm run build
npm run preview
```

### Run quality checks

```bash
npm run lint
npm run test
npm run test:e2e
```

---

## Scripts Reference

- `npm run dev` - starts Vite dev server
- `npm run build` - creates production build
- `npm run preview` - serves built app locally
- `npm run lint` - runs ESLint checks
- `npm run test` - runs Vitest once
- `npm run test:watch` - runs Vitest in watch mode
- `npm run test:e2e` - runs Playwright tests

---

## Current Limitations

- No backend API integration in active app runtime.
- No authentication/authorization flow implemented in frontend routing yet.
- Most operational/business data is static or simulated.
- Telemetry history is in-memory and resets on reload.
- CI does not yet execute E2E Playwright tests.
- AquaGPT is rule/keyword driven (not an actual LLM integration).

---

## Suggested Next Steps

1. Introduce typed API client and replace in-memory feeds with backend endpoints.
2. Implement auth (OIDC/OAuth2) and route-level role guards.
3. Connect telemetry storage to PostgreSQL schema and ingest pipeline.
4. Expand unit/E2E coverage for scenario flows and critical interactions.
5. Add Playwright execution and artifacts to CI for full regression confidence.

---

Built for sustainable water intelligence and future-ready operational control.
