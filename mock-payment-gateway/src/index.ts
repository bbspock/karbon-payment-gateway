import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/mock-gateway/process-payment', async (req, res) => {
  const {
    amount,
    currency,
    karbon_transaction_id,
    payment_method_details
  } = req.body;

  // Simulate 1–3s delay
  const delay = Math.floor(Math.random() * 2000) + 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  res.status(200).json({ message: 'Processed by mock gateway' });

  // Random 80% SUCCESS
  const isSuccess = Math.random() < 0.8;

  const webhookUrl = 'http://payment-orchestration:3001/payments/webhook/gateway-status-update';

  let payload: {
    karbon_transaction_id: string;
    status: 'SUCCESS' | 'FAILED';
    third_party_provider_transaction_id?: string;
    error_code?: string;
    error_message?: string;
  };
  if (isSuccess) {
    payload = {
      karbon_transaction_id,
      status: 'SUCCESS',
      third_party_provider_transaction_id: 'mock_txn_' + Date.now()
    };
  } else {
    payload = {
      karbon_transaction_id,
      status: 'FAILED',
      error_code: 'DECLINED',
      error_message: 'Mock failure'
    };
  }

  setTimeout(() => {
    axios.post(webhookUrl, payload)
      .then(() => console.log(`Webhook sent for ${karbon_transaction_id}`))
      .catch(err => console.error(`Webhook failed`, err.message));
  }, 0);

});

app.get('/health', (_, res) => {
  res.send({ status: 'ok' });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Mock gateway running on port ${PORT}`);
});

