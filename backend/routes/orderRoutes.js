const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { orderValidation, validate } = require('../middleware/validator');

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

