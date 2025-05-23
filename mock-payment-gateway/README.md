# Mock Payment Gateway

A lightweight simulation of an external payment processor. It introduces random delays, success/failure responses, and sends webhook callbacks to the orchestration service.

## 🛠️ How to Run

```bash
docker build -t mock-payment-gateway .
docker run -p 3002:3002 mock-payment-gateway
```

Or via Docker Compose:

```bash
docker compose up --build mock-gateway
```

## 🧪 API Endpoints

- `POST /mock-gateway/process-payment`
- `GET /health`
