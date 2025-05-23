# Payment Orchestration Service

This service is responsible for initiating payments and managing the lifecycle of transactions. It handles idempotency, persistence, and webhook updates from third-party gateways.

## 🛠️ How to Run (Locally)

```bash
docker build -t payment-orchestration-service .
docker run -p 3001:3001 --env-file .env payment-orchestration-service
```

Or use Docker Compose (root folder):

```bash
docker compose up --build payment-orchestration
```

## 🧪 API Endpoints

- `POST /payments/initiate`
- `POST /payments/webhook/gateway-status-update`
- `GET /health`

## 🛡️ Notes

- Does not store card data.
- Idempotency handled using in-memory cache (can be replaced with Redis).
- All logs are printed to console (can be extended to Pino/Winston).
