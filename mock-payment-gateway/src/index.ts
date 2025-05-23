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

  // Random 80% SUCCESS
  const isSuccess = Math.random() < 0.8;

  const webhookUrl = 'http://payment-orchestration:3001/payments/webhook/gateway-status-update';

  if (isSuccess) {
    await axios.post(webhookUrl, {
      karbon_transaction_id,
      status: 'SUCCESS',
      third_party_provider_transaction_id: 'mock_txn_' + Date.now()
    });
  } else {
    await axios.post(webhookUrl, {
      karbon_transaction_id,
      status: 'FAILED',
      error_code: 'DECLINED',
      error_message: 'Mock failure'
    });
  }

  res.status(200).json({ message: 'Processed by mock gateway' });
});

app.get('/health', (_, res) => {
  res.send({ status: 'ok' });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Mock gateway running on port ${PORT}`);
});

