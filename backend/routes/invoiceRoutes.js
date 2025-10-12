const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Invoice routes
router.get('/:orderId', invoiceController.generateInvoice);
router.get('/:orderId/data', invoiceController.getInvoiceData);

module.exports = router;

