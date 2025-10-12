const { body, param, validationResult } = require('express-validator');

// Validation error handler
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
exports.userValidation = {
  register: [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('fullName').trim().notEmpty().withMessage('Full name is required')
  ],
  login: [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

// Client validation rules
exports.clientValidation = {
  create: [
    body('name').trim().notEmpty().withMessage('Client name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid client ID'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email')
  ]
};

// Order validation rules
exports.orderValidation = {
  create: [
    body('client').isMongoId().withMessage('Valid client ID is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.itemType').notEmpty().withMessage('Item type is required'),
    body('items.*.description').notEmpty().withMessage('Item description is required'),
    body('items.*.price').isNumeric().withMessage('Valid price is required'),
    body('pricing.total').isNumeric().withMessage('Valid total amount is required')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid order ID')
  ],
  updateStatus: [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status').isIn(['pending', 'in-progress', 'ready-for-fitting', 'completed', 'delivered', 'cancelled'])
      .withMessage('Invalid status value')
  ]
};

// Payment validation rules
exports.paymentValidation = {
  create: [
    body('order').isMongoId().withMessage('Valid order ID is required'),
    body('amount').isNumeric().withMessage('Valid amount is required'),
    body('paymentMethod').isIn(['cash', 'credit_card', 'debit_card', 'bank_transfer', 'check', 'online', 'other'])
      .withMessage('Invalid payment method')
  ]
};

