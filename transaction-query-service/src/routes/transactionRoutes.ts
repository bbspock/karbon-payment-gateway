import express from 'express';
import { getTransaction } from '../controllers/transactionController';

const router = express.Router();
router.get('/transactions/:id', getTransaction);

export default router;

