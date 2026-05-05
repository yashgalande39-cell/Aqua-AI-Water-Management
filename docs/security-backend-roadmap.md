# Backend and Security Hardening Roadmap

## Goal
Move from demo-grade frontend telemetry simulation to a production-ready system with authenticated APIs, policy-based authorization, and auditable controls.

## Target Architecture
- `frontend` (this app): renders operational data and invokes APIs via a typed client.
- `api-gateway`: terminates TLS, applies rate limiting, CORS, and request-size protections.
- `app-service`: validates requests, enforces RBAC, performs business logic.
- `postgres`: stores users, role mappings, telemetry aggregates, and immutable audit logs.
- `event-worker`: handles async notifications, anomaly pipelines, and retry logic.

## Phase 1 - Auth and Access Controls
1. Add OIDC or OAuth2 login flow.
2. Issue short-lived access tokens + refresh tokens.
3. Enforce RBAC with explicit scopes:
   - `telemetry:read`
   - `alerts:manage`
   - `valves:control`
   - `admin:users`
4. Add route guards in frontend for privileged pages.

## Phase 2 - API Security Baseline
1. Validate all inputs server-side (Zod/Joi).
2. Return standardized error objects with trace IDs.
3. Add middleware for:
   - request logging
   - authn/authz
   - input validation
   - idempotency for control endpoints
4. Add strict CORS allowlist and remove wildcard origins.

## Phase 3 - Database and Auditability
1. Add normalized auth schema:
   - `users`
   - `roles`
   - `user_roles`
   - `sessions`
2. Store only password hashes (Argon2id/bcrypt) if local auth is used.
3. Add append-only `audit_log` table for every control action.
4. Protect sensitive columns with encryption at rest.

## Phase 4 - Deployment Hardening
1. Enforce headers at edge:
   - `Content-Security-Policy`
   - `Strict-Transport-Security`
   - `X-Content-Type-Options`
   - `X-Frame-Options`
   - `Referrer-Policy`
2. Add WAF/rate limits for public endpoints.
3. Configure secrets via vault/secret manager only.
4. Add vulnerability scanning and dependency update automation.

## Phase 5 - Operational Readiness
1. Centralized logs with correlation IDs.
2. Alerting for auth anomalies and privileged actions.
3. SLOs for API latency and availability.
4. Incident runbooks for leak/valve emergency workflows.
