const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { orderValidation, validate } = require('../middleware/validator');

// Mock route for development (no auth required)
router.get('/mock', (req, res) => {
  const mockOrders = [
    {
      _id: '1',
      orderNumber: 'ORD-001',
      client: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210'
      },
      items: [{
        itemType: 'Shirt',
        fabric: 'Cotton',
        description: 'Blue formal shirt with French cuffs'
      }],
      measurements: {
        chest: '40',
        waist: '34',
        hip: '38',
        sleeve: '32',
        length: '30',
        shoulder: '16',
        neck: '15'
      },
      status: 'in-progress',
      paymentStatus: 'paid',
      pricing: { total: 2500 },
      dates: { orderDate: '2025-10-01' }
    },
    {
      _id: '2',
      orderNumber: 'ORD-002',
      client: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 9123456789'
      },
      items: [{
        itemType: 'Pant',
        fabric: 'Linen',
        description: 'Beige casual pants'
      }],
      measurements: {
        waist: '30',
        hip: '36',
        length: '40',
        inseam: '32',
        thigh: '22',
        knee: '16',
        bottom: '14'
      },
      status: 'pending',
      paymentStatus: 'pending',
      pricing: { total: 1800 },
      dates: { orderDate: '2025-10-05' }
    },
    {
      _id: '3',
      orderNumber: 'ORD-003',
      client: {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '+91 9988776655'
      },
      items: [{
        itemType: 'Shirt',
        fabric: 'Silk',
        description: 'Wedding special designer shirt'
      }],
      measurements: {
        chest: '42',
        waist: '36',
        hip: '40',
        sleeve: '33',
        length: '31',
        shoulder: '17',
        neck: '16'
      },
      status: 'completed',
      paymentStatus: 'paid',
      pricing: { total: 4500 },
      dates: { orderDate: '2025-09-28' }
    }
  ];

  res.json({
    success: true,
    data: {
      orders: mockOrders,
      total: mockOrders.length
    }
  });
});

// All routes are protected
router.use(protect);

// Statistics route (must be before /:id)
router.get('/stats/overview', orderController.getOrderStats);

// CRUD routes
router.route('/')
  .get(orderController.getAllOrders)
  .post(orderValidation.create, validate, orderController.createOrder);

router.route('/:id')
  .get(orderController.getOrder)
  .put(orderValidation.update, validate, orderController.updateOrder)
  .delete(authorize('admin'), orderController.deleteOrder);

// Status update route
router.put('/:id/status', orderValidation.updateStatus, validate, orderController.updateOrderStatus);

module.exports = router;

