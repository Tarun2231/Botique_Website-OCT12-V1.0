const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

// Mock analytics route for development (no auth required)
router.get('/dashboard/mock', (req, res) => {
  const mockAnalytics = {
    summary: {
      totalOrders: 3,
      totalRevenue: 8800,
      pendingOrders: 1,
      completedOrders: 1,
      inProgressOrders: 1
    },
    monthlyData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      orders: [4, 6, 3, 7, 5, 8],
      revenue: [15000, 28000, 22000, 32000, 25000, 38000]
    }
  };

  res.json({
    success: true,
    data: mockAnalytics
  });
});

// All routes are protected
router.use(protect);

// Analytics routes
router.get('/dashboard', analyticsController.getDashboardAnalytics);
router.get('/revenue', analyticsController.getRevenueAnalytics);
router.get('/clients', analyticsController.getClientAnalytics);
router.get('/orders', analyticsController.getOrderAnalytics);

module.exports = router;

