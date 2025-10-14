const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
exports.getAllPayments = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      paymentMethod,
      orderId,
      clientId,
      sortBy = '-paymentDate' 
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (orderId) query.order = orderId;
    if (clientId) query.client = clientId;

    // Execute query with pagination
    const payments = await Payment.find(query)
      .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('order', 'orderNumber pricing')
      .populate('client', 'name email')
      .populate('processedBy', 'fullName username');

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        payments,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('client')
      .populate('processedBy', 'fullName username');

    if (!payment) {
      return next(new AppError('Payment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res, next) => {
  try {
    // Check if order exists
    const order = await Order.findById(req.body.order);
    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    const paymentData = {
      ...req.body,
      client: order.client,
      processedBy: req.user.id
    };

    const payment = await Payment.create(paymentData);

    // Update order payment status
    const totalPaid = await Payment.aggregate([
      {
        $match: {
          order: order._id,
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const amountPaid = totalPaid.length > 0 ? totalPaid[0].total : 0;
    const orderTotal = order.pricing.total;

    if (amountPaid >= orderTotal) {
      order.paymentStatus = 'paid';
    } else if (amountPaid > 0) {
      order.paymentStatus = 'partial';
    } else {
      order.paymentStatus = 'pending';
    }

    await order.save();

    // Populate payment before sending response
    await payment.populate('order', 'orderNumber pricing');
    await payment.populate('client', 'name email');

    res.status(201).json({
      status: 'success',
      message: 'Payment recorded successfully',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private
exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('order', 'orderNumber pricing')
     .populate('client', 'name email');

    if (!payment) {
      return next(new AppError('Payment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Payment updated successfully',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Process refund
// @route   POST /api/payments/:id/refund
// @access  Private/Admin
exports.processRefund = async (req, res, next) => {
  try {
    const { amount, reason } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return next(new AppError('Payment not found', 404));
    }

    if (payment.status !== 'completed') {
      return next(new AppError('Can only refund completed payments', 400));
    }

    if (amount > payment.amount) {
      return next(new AppError('Refund amount cannot exceed payment amount', 400));
    }

    payment.refund = {
      amount,
      reason,
      refundedAt: new Date(),
      refundedBy: req.user.id
    };

    payment.status = 'refunded';

    await payment.save();

    // Update order payment status
    const order = await Order.findById(payment.order);
    if (order) {
      const totalPaid = await Payment.aggregate([
        {
          $match: {
            order: order._id,
            status: 'completed'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]);

      const amountPaid = totalPaid.length > 0 ? totalPaid[0].total : 0;
      const orderTotal = order.pricing.total;

      if (amountPaid >= orderTotal) {
        order.paymentStatus = 'paid';
      } else if (amountPaid > 0) {
        order.paymentStatus = 'partial';
      } else {
        order.paymentStatus = 'pending';
      }

      await order.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Refund processed successfully',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment statistics
// @route   GET /api/payments/stats/overview
// @access  Private
exports.getPaymentStats = async (req, res, next) => {
  try {
    const totalPayments = await Payment.countDocuments({ status: 'completed' });
    
    // Revenue statistics
    const revenueStats = await Payment.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          averagePayment: { $avg: '$amount' }
        }
      }
    ]);

    // Payments by method
    const paymentsByMethod = await Payment.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Recent payments
    const recentPayments = await Payment.find({ status: 'completed' })
      .sort('-paymentDate')
      .limit(5)
      .populate('client', 'name')
      .populate('order', 'orderNumber');

    res.status(200).json({
      status: 'success',
      data: {
        totalPayments,
        revenue: revenueStats[0] || { totalRevenue: 0, averagePayment: 0 },
        paymentsByMethod,
        recentPayments
      }
    });
  } catch (error) {
    next(error);
  }
};

