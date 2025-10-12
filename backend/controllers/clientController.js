const Client = require('../models/Client');
const Order = require('../models/Order');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
exports.getAllClients = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, status, sortBy = '-createdAt' } = req.query;

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.status = status;
    }

    // Execute query with pagination
    const clients = await Client.find(query)
      .sort(sortBy)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'fullName username');

    const total = await Client.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        clients,
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

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('createdBy', 'fullName username');

    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    // Get client's orders
    const orders = await Order.find({ client: client._id })
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      status: 'success',
      data: { client, orders }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
exports.createClient = async (req, res, next) => {
  try {
    const clientData = {
      ...req.body,
      createdBy: req.user.id
    };

    const client = await Client.create(clientData);

    res.status(201).json({
      status: 'success',
      message: 'Client created successfully',
      data: { client }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
exports.updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Client updated successfully',
      data: { client }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
exports.deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    // Check if client has orders
    const ordersCount = await Order.countDocuments({ client: client._id });
    if (ordersCount > 0) {
      return next(new AppError('Cannot delete client with existing orders. Consider deactivating instead.', 400));
    }

    await client.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update client measurements
// @route   PUT /api/clients/:id/measurements
// @access  Private
exports.updateMeasurements = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        measurements: {
          ...req.body,
          lastUpdated: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Measurements updated successfully',
      data: { client }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add client photo
// @route   POST /api/clients/:id/photos
// @access  Private
exports.addPhoto = async (req, res, next) => {
  try {
    const { url, description } = req.body;

    const client = await Client.findById(req.params.id);

    if (!client) {
      return next(new AppError('Client not found', 404));
    }

    client.photos.push({
      url,
      description,
      uploadedAt: new Date()
    });

    await client.save();

    res.status(200).json({
      status: 'success',
      message: 'Photo added successfully',
      data: { client }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get client statistics
// @route   GET /api/clients/stats
// @access  Private
exports.getClientStats = async (req, res, next) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: 'active' });
    const vipClients = await Client.countDocuments({ status: 'vip' });

    const topClients = await Client.find()
      .sort('-totalSpent')
      .limit(10)
      .select('name email totalSpent totalOrders');

    res.status(200).json({
      status: 'success',
      data: {
        totalClients,
        activeClients,
        vipClients,
        topClients
      }
    });
  } catch (error) {
    next(error);
  }
};

