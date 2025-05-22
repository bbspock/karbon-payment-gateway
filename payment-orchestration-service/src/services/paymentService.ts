import { Transaction, TransactionStatus } from '../models/transaction';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// Simulate in-memory idempotency cache (in production: use Redis or DB)
const idempotencyStore: Record<string, { hash: string, response: object }> = {};

export const initiatePaymentService = async (
  body: any,
  idempotencyKey: string
) => {
  const hash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');

  const cached = idempotencyStore[idempotencyKey];
  if (cached && cached.hash === hash) {
    return cached.response;
  }

  // Validate required fields
  const { amount, currency, merchant_id, customer_id, payment_method_details } = body;
  if (!amount || !currency || !merchant_id || !customer_id || !payment_method_details) {
    throw new Error('Invalid payload');
  }

  const karbon_transaction_id = uuidv4();

  const transaction = await Transaction.create({
    id: karbon_transaction_id,
    merchant_id,
    customer_id,
    amount,
    currency,
    status: TransactionStatus.PENDING,
  });

  // Simulate async call to external gateway (will do real dispatch later)
  setTimeout(() => {
    console.log(`Simulating gateway call for txn ${karbon_transaction_id}`);
  }, 500); // stub

  const response = {
    karbon_transaction_id,
    status: transaction.status,
  };

  idempotencyStore[idempotencyKey] = { hash, response };

  return response;
};
