const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FinEdge API v2 is running', timestamp: new Date().toISOString() });
});

app.use('/api/payment', require('./routes/payment'));

app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, desc: 'Salary Deposit', amount: 5000, type: 'income', date: '2024-01-15' },
    { id: 2, desc: 'Office Rent', amount: 2000, type: 'expense', date: '2024-01-14' },
    { id: 3, desc: 'Internet Bill', amount: 299, type: 'expense', date: '2024-01-13' },
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💳 Payment API: http://localhost:${PORT}/api/payment/plans`);
});
