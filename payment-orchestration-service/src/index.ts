import express from 'express';
import { json } from 'body-parser';
import { sequelize } from './utils/sequelize';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});
app.use(paymentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Payment Orchestration Service running on port ${PORT}`);
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected & synced');
});

