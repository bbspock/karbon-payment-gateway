import { Request, Response } from 'express';
import { initiatePaymentService } from '../services/paymentService';

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

