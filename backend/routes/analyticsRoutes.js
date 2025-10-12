const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Analytics routes
router.get('/dashboard', analyticsController.getDashboardAnalytics);
router.get('/revenue', analyticsController.getRevenueAnalytics);
router.get('/clients', analyticsController.getClientAnalytics);
router.get('/orders', analyticsController.getOrderAnalytics);

module.exports = router;

