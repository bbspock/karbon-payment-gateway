import { Request, Response } from 'express';
import { initiatePaymentService } from '../services/paymentService';
import { Transaction } from '../models/transaction';

export const initiatePayment = async (req: Request, res: Response): Promise<void> => {
  const idempotencyKey = req.header('idempotency_key');
  const body = req.body;

  if (!idempotencyKey) {
    res.status(400).json({ error: 'idempotency_key header is required' });
    return;
  }

  try {
    const result = await initiatePaymentService(body, idempotencyKey);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error initiating payment', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const gatewayWebhook = async (req: Request, res: Response): Promise<void> => {
  const { karbon_transaction_id, status, third_party_provider_transaction_id, error_code, error_message } = req.body;

  try {
    const txn = await Transaction.findByPk(karbon_transaction_id);
    if (!txn) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    txn.status = status;
    txn.third_party_provider_transaction_id = third_party_provider_transaction_id || null;
    txn.error_code = error_code || null;
    txn.error_message = error_message || null;
    await txn.save();

    res.status(200).json({ message: 'Transaction updated' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
};


