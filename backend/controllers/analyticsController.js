const Order = require('../models/Order');
const Client = require('../models/Client');
const Payment = require('../models/Payment');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Build date filter
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter['dates.orderDate'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Total statistics
    const totalClients = await Client.countDocuments();
    const totalOrders = await Order.countDocuments(dateFilter);
    const totalRevenue = await Payment.aggregate([
      {
        $match: { 
          status: 'completed',
          ...(startDate && endDate && {
            paymentDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          })
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Orders by priority
    const ordersByPriority = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Payment status distribution
    const paymentDistribution = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$paymentStatus',
          count: { $sum: 1 },
          total: { $sum: '$pricing.total' }
        }
      }
    ]);

    // Revenue trend (last 12 months)
    const revenueTrend = await Order.aggregate([
      {
        $match: {
          'dates.orderDate': {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$dates.orderDate' },
            month: { $month: '$dates.orderDate' }
          },
          revenue: { $sum: '$pricing.total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Top clients
    const topClients = await Client.find()
      .sort('-totalSpent')
      .limit(5)
      .select('name email totalSpent totalOrders');

    // Recent activity
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(10)
      .populate('client', 'name email')
      .select('orderNumber status pricing dates.orderDate');

    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          totalClients,
          totalOrders,
          totalRevenue: totalRevenue[0]?.total || 0,
          averageOrderValue: totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0
        },
        ordersByStatus,
        ordersByPriority,
        paymentDistribution,
        revenueTrend,
        topClients,
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get revenue analytics
// @route   GET /api/analytics/revenue
// @access  Private
exports.getRevenueAnalytics = async (req, res, next) => {
  try {
    const { period = 'month' } = req.query;

    let groupBy;
    let matchDate;

    switch (period) {
      case 'week':
        matchDate = new Date(new Date().setDate(new Date().getDate() - 7));
        groupBy = {
          year: { $year: '$paymentDate' },
          month: { $month: '$paymentDate' },
          day: { $dayOfMonth: '$paymentDate' }
        };
        break;
      case 'year':
        matchDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        groupBy = {
          year: { $year: '$paymentDate' },
          month: { $month: '$paymentDate' }
        };
        break;
      default: // month
        matchDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
        groupBy = {
          year: { $year: '$paymentDate' },
          month: { $month: '$paymentDate' },
          day: { $dayOfMonth: '$paymentDate' }
        };
    }

    const revenueData = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          paymentDate: { $gte: matchDate }
        }
      },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: '$amount' },
          transactions: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Revenue by payment method
    const revenueByMethod = await Payment.aggregate([
      {
        $match: {
          status: 'completed',
          paymentDate: { $gte: matchDate }
        }
      },
      {
        $group: {
          _id: '$paymentMethod',
          revenue: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        period,
        revenueData,
        revenueByMethod
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get client analytics
// @route   GET /api/analytics/clients
// @access  Private
exports.getClientAnalytics = async (req, res, next) => {
  try {
    // Client growth over time
    const clientGrowth = await Client.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Clients by status
    const clientsByStatus = await Client.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Client lifetime value distribution
    const lifetimeValueDistribution = await Client.aggregate([
      {
        $bucket: {
          groupBy: '$totalSpent',
          boundaries: [0, 500, 1000, 2000, 5000, 10000],
          default: '10000+',
          output: {
            count: { $sum: 1 },
            clients: { $push: '$name' }
          }
        }
      }
    ]);

    // Average orders per client
    const avgOrdersPerClient = await Client.aggregate([
      {
        $group: {
          _id: null,
          averageOrders: { $avg: '$totalOrders' },
          averageSpent: { $avg: '$totalSpent' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        clientGrowth,
        clientsByStatus,
        lifetimeValueDistribution,
        averages: avgOrdersPerClient[0] || { averageOrders: 0, averageSpent: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order analytics
// @route   GET /api/analytics/orders
// @access  Private
exports.getOrderAnalytics = async (req, res, next) => {
  try {
    // Orders by item type
    const ordersByItemType = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.itemType',
          count: { $sum: 1 },
          revenue: { $sum: '$items.price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Average order completion time
    const completionTimes = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          'dates.completedDate': { $exists: true }
        }
      },
      {
        $project: {
          completionTime: {
            $divide: [
              { $subtract: ['$dates.completedDate', '$dates.orderDate'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          averageDays: { $avg: '$completionTime' },
          minDays: { $min: '$completionTime' },
          maxDays: { $max: '$completionTime' }
        }
      }
    ]);

    // Orders by priority completion rate
    const priorityCompletion = await Order.aggregate([
      {
        $group: {
          _id: '$priority',
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 1,
          total: 1,
          completed: 1,
          completionRate: {
            $multiply: [{ $divide: ['$completed', '$total'] }, 100]
          }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        ordersByItemType,
        completionTimes: completionTimes[0] || { averageDays: 0, minDays: 0, maxDays: 0 },
        priorityCompletion
      }
    });
  } catch (error) {
    next(error);
  }
};

