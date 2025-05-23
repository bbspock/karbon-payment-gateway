import express from 'express';
import { sequelize } from './utils/sequelize';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});
app.use(transactionRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Transaction Query Service running on port ${PORT}`);
});
