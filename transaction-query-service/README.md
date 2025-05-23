# Transaction Query Service

Read-only microservice to fetch full details of any transaction.

## 🛠️ How to Run

```bash
docker build -t transaction-query-service .
docker run -p 3003:3003 --env-file .env transaction-query-service
```

Or with Docker Compose:

```bash
docker compose up --build transaction-query-service
```

## 🧪 API

- `GET /transactions/:karbon_transaction_id`
- `GET /health`
