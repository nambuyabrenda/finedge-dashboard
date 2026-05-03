const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');

// All analytics routes are protected
router.use(auth);

// Dashboard metrics
router.get('/dashboard', analyticsController.getDashboardMetrics);

// Advanced analytics
router.get('/advanced', analyticsController.getAdvancedAnalytics);

module.exports = router;
