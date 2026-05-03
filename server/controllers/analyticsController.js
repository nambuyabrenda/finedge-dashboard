const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');

// @desc    Get dashboard metrics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardMetrics = async (req, res) => {
  try {
    const userId = req.userId;
    const { timeframe = 'month' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;
    switch(timeframe) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'quarter':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    // Get transactions for the period
    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate }
    });

    // Calculate summary metrics
    const totalIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalInvestments = transactions
      .filter(t => t.type === 'investment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100) : 0;

    // Monthly trends (last 6 months)
    const monthlyTrends = await Transaction.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) }
        } 
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          income: {
            $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
          },
          expenses: {
            $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
          },
          investments: {
            $sum: { $cond: [{ $eq: ['$type', 'investment'] }, '$amount', 0] }
          }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Category breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startDate }
        } 
      },
      {
        $group: {
          _id: { category: '$category', type: '$type' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Recent transactions
    const recentTransactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(10);

    // Portfolio summary
    const portfolio = await Portfolio.findOne({ userId });

    // Daily transaction volume (last 30 days)
    const dailyVolume = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: new Date(now.setDate(now.getDate() - 30)) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          volume: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      summary: {
        totalIncome,
        totalExpenses,
        totalInvestments,
        netProfit,
        profitMargin,
        transactionCount: transactions.length,
        averageTransactionValue: transactions.length > 0 ? 
          (totalIncome + totalExpenses) / transactions.length : 0
      },
      monthlyTrends,
      categoryBreakdown,
      recentTransactions,
      portfolio: portfolio || null,
      dailyVolume
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ 
      message: 'Error fetching dashboard metrics',
      error: error.message 
    });
  }
};

// @desc    Get advanced analytics
// @route   GET /api/analytics/advanced
// @access  Private
exports.getAdvancedAnalytics = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, period = 'monthly' } = req.query;

    // Date filtering
    const query = { userId: new mongoose.Types.ObjectId(userId) };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Spending patterns
    const spendingPatterns = await Transaction.aggregate([
      { $match: { ...query, type: 'expense' } },
      {
        $group: {
          _id: {
            category: '$category',
            dayOfWeek: { $dayOfWeek: '$date' },
            hour: { $hour: '$date' }
          },
          total: { $sum: '$amount' },
          avgAmount: { $avg: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Income vs Expense trends
    const trends = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: period === 'monthly' ? 
            { $dateToString: { format: '%Y-%m', date: '$date' } } :
            { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          income: {
            $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
          },
          expenses: {
            $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
          },
          netAmount: {
            $sum: {
              $cond: [
                { $eq: ['$type', 'income'] }, '$amount',
                { $cond: [{ $eq: ['$type', 'expense'] }, { $multiply: ['$amount', -1] }, 0] }
              ]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ROI and portfolio analysis
    const portfolio = await Portfolio.findOne({ userId: req.userId });
    
    let portfolioAnalytics = null;
    if (portfolio) {
      const assetAllocation = portfolio.assets.reduce((acc, asset) => {
        const value = (asset.currentPrice || asset.purchasePrice) * asset.quantity;
        acc[asset.type] = (acc[asset.type] || 0) + value;
        return acc;
      }, {});

      const totalValue = Object.values(assetAllocation).reduce((a, b) => a + b, 0);
      
      portfolioAnalytics = {
        totalValue,
        totalInvested: portfolio.totalInvested,
        roi: portfolio.dayChangePercent,
        assetAllocation: Object.entries(assetAllocation).map(([type, value]) => ({
          type,
          value,
          percentage: (value / totalValue) * 100
        })),
        bestPerforming: portfolio.assets
          .map(a => ({
            symbol: a.symbol,
            name: a.name,
            return: ((a.currentPrice - a.purchasePrice) / a.purchasePrice) * 100
          }))
          .sort((a, b) => b.return - a.return)
          .slice(0, 5),
        worstPerforming: portfolio.assets
          .map(a => ({
            symbol: a.symbol,
            name: a.name,
            return: ((a.currentPrice - a.purchasePrice) / a.purchasePrice) * 100
          }))
          .sort((a, b) => a.return - b.return)
          .slice(0, 5)
      };
    }

    // Predictive analytics (simple forecasting)
    const forecastBasis = trends.slice(-6);
    const averageIncome = forecastBasis.reduce((sum, t) => sum + t.income, 0) / forecastBasis.length;
    const averageExpenses = forecastBasis.reduce((sum, t) => sum + t.expenses, 0) / forecastBasis.length;
    
    const predictions = Array.from({ length: 3 }, (_, i) => ({
      period: `Forecast ${i + 1}`,
      predictedIncome: averageIncome * (1 + Math.random() * 0.1),
      predictedExpenses: averageExpenses * (1 + Math.random() * 0.05),
      confidence: 85 - (i * 10)
    }));

    res.json({
      spendingPatterns,
      trends,
      portfolioAnalytics,
      predictions,
      insights: generateInsights(trends, portfolioAnalytics)
    });
  } catch (error) {
    console.error('Advanced analytics error:', error);
    res.status(500).json({ 
      message: 'Error fetching advanced analytics',
      error: error.message 
    });
  }
};

// Generate AI-like insights
function generateInsights(trends, portfolio) {
  const insights = [];
  
  if (trends.length >= 2) {
    const lastMonth = trends[trends.length - 1];
    const previousMonth = trends[trends.length - 2];
    
    if (lastMonth.expenses > previousMonth.expenses * 1.1) {
      insights.push({
        type: 'warning',
        message: 'Expenses increased significantly compared to last period',
        action: 'Review spending patterns'
      });
    }
    
    if (lastMonth.income > previousMonth.income * 1.05) {
      insights.push({
        type: 'success',
        message: 'Income growth detected! Keep up the good work',
        action: 'Consider increasing investments'
      });
    }
  }
  
  if (portfolio) {
    if (portfolio.roi > 10) {
      insights.push({
        type: 'success',
        message: `Portfolio performing strongly with ${portfolio.roi.toFixed(2)}% ROI`,
        action: 'Review asset allocation'
      });
    }
  }
  
  return insights;
}
