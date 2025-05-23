# Karbon Payment Gateway Microservices

A simplified payment gateway integration system with robust transaction management, idempotency, and simulated third-party processing.

## 🧱 Microservices

### 1. `payment-orchestration-service`
- Initiates payments
- Manages transaction state
- Receives webhook updates from third-party gateway

### 2. `mock-payment-gateway`
- Simulates external payment provider
- Delivers delayed webhook responses asynchronously (80% success rate)

### 3. `transaction-query-service`
- Read-only service to fetch full transaction details

## 🐳 How to Run (Docker Compose)

```bash
docker compose up --build
```

Access:
- Orchestration API: http://localhost:3001
- Mock Gateway API: http://localhost:3002
- Query Service API: http://localhost:3003 (optional, if implemented)
- DB: `postgres:5432` (user: postgres, pass: postgres)

...

