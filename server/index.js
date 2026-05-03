const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Simple middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'FinEdge API is running',
    timestamp: new Date().toISOString()
  });
});

// Mock data routes (works without database)
app.get('/api/analytics/dashboard', (req, res) => {
  res.json({
    summary: {
      totalIncome: 45000,
      totalExpenses: 32000,
      netProfit: 13000,
      totalInvestments: 25000,
      transactionCount: 156
    },
    recentTransactions: [
      { id: 1, type: 'income', amount: 5000, description: 'Salary', category: 'Salary', date: new Date().toISOString(), status: 'completed' },
      { id: 2, type: 'expense', amount: 2000, description: 'Rent', category: 'Rent', date: new Date().toISOString(), status: 'completed' },
      { id: 3, type: 'expense', amount: 299, description: 'Internet Bill', category: 'Utilities', date: new Date().toISOString(), status: 'pending' }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Test the API: http://localhost:${PORT}/api/health`);
});
