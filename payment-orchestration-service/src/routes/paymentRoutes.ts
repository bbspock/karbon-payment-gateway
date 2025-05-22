import express from 'express';
import { initiatePayment } from '../controllers/paymentController';

const router = express.Router();

router.post('/payments/initiate', initiatePayment);

export default router;
