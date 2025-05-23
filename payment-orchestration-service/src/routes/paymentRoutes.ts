import express from 'express';
import { initiatePayment } from '../controllers/paymentController';
import { gatewayWebhook } from '../controllers/paymentController';

const router = express.Router();

router.post('/payments/initiate', initiatePayment);
router.post('/payments/webhook/gateway-status-update', gatewayWebhook);

export default router;
