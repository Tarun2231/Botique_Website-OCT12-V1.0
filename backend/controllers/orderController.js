const Order = require('../models/Order');
const Client = require('../models/Client');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
exports.getAllOrders = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      paymentStatus, 
      priority,
      clientId,
      search,
      sortBy = '-createdAt' 
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (priority) query.priority = priority;
    if (clientId) query.client = clientId;
    
    if (search) {
      query.orderNumber = { $regex: search, $options: 'i' };
    }

    // Execute query with pagination
    const orders = await Order.find(query)
      .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('client', 'name email phone')
      .populate('createdBy', 'fullName username');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        orders,
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

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client')
      .populate('createdBy', 'fullName username')
      .populate('statusHistory.changedBy', 'fullName username');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    // Check if client exists
    const client = await Client.findById(req.body.client);
    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    const orderData = {
      ...req.body,
      createdBy: req.user.id,
      statusHistory: [{
        status: 'pending',
        comment: 'Order created',
        changedBy: req.user.id
      }]
    };

    const order = await Order.create(orderData);

    // Update client statistics
    client.totalOrders += 1;
    client.totalSpent += order.pricing.total;
    client.lastOrderDate = new Date();
    await client.save();

    // Populate order before sending response
    await order.populate('client', 'name email phone');

    res.status(201).json({
      status: 'success',
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('client', 'name email phone');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, comment } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Add to status history
    order.statusHistory.push({
      status,
      comment: comment || `Status changed to ${status}`,
      changedBy: req.user.id
    });

    order.status = status;

    // Update completion date if status is completed
    if (status === 'completed') {
      order.dates.completedDate = new Date();
    }

    // Update delivery date if status is delivered
    if (status === 'delivered') {
      order.dates.deliveredDate = new Date();
    }

    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Update client statistics
    const client = await Client.findById(order.client);
    if (client) {
      client.totalOrders = Math.max(0, client.totalOrders - 1);
      client.totalSpent = Math.max(0, client.totalSpent - order.pricing.total);
      await client.save();
    }

    await order.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats/overview
// @access  Private
exports.getOrderStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const inProgressOrders = await Order.countDocuments({ status: 'in-progress' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    
    // Revenue statistics
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$pricing.total' },
          averageOrderValue: { $avg: '$pricing.total' }
        }
      }
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .sort('-createdAt')
      .limit(5)
      .populate('client', 'name email');

    res.status(200).json({
      status: 'success',
      data: {
        totalOrders,
        pendingOrders,
        inProgressOrders,
        completedOrders,
        revenue: revenueStats[0] || { totalRevenue: 0, averageOrderValue: 0 },
        ordersByStatus,
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

