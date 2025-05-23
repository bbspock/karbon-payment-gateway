import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';

export const getTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const txn = await Transaction.findByPk(id);
    if (!txn) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    res.status(200).json(txn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

