const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');
const { paymentValidation, validate } = require('../middleware/validator');

// All routes are protected
router.use(protect);

// Statistics route (must be before /:id)
router.get('/stats/overview', paymentController.getPaymentStats);

// CRUD routes
router.route('/')
  .get(paymentController.getAllPayments)
  .post(paymentValidation.create, validate, paymentController.createPayment);

router.route('/:id')
  .get(paymentController.getPayment)
  .put(paymentController.updatePayment);

// Refund route (admin only)
router.post('/:id/refund', authorize('admin'), paymentController.processRefund);

module.exports = router;

